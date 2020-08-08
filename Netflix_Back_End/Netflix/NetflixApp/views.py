from django.shortcuts import render
from django.http import JsonResponse
from .models import RecommendedMovie, Rating
import requests 
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, RecommendationSerializer, RatingSerializer
import json
from random import randint
from django.views.decorators.csrf import csrf_exempt
from .forms import RatingForm



#Helper Function
def get_current_user(request):
        serializer = UserSerializer(request.user)
        current_user_username=serializer.data['username']
        return User.objects.get(username=current_user_username)

def all_current_user_recommendations(current_user_object):
        return RecommendedMovie.objects.filter(user=current_user_object)




# @api_view(['GET'])
# def current_user_full(request):
#     current_user_object = get_current_user(request)
#     serialized_user = 
#         #Serialize the queryset
#         serialized_rec = RecommendationSerializer(single_rec_details).rec_detail

#         #Return a Json Response
#         return Response(serialized_rec)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    ##How we can identify the current user
    serializer = UserSerializer(request.user)
    print(serializer.data['username'])
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##RETURNS A JSON RESPONSE
@api_view(['GET'])
def recommendation_list(request):
        #Get current user object
        current_user_object = get_current_user(request)

        #create a queryset of all movie recommendations for the current user
        all_movies = all_current_user_recommendations(current_user_object)
        
        #Serialize the queryset all_movies
        serialized_recs = RecommendationSerializer(all_movies).all_recs
        
        # convert Serialized object to json


        return Response(serialized_recs)

        # data = list(all_movies.values())
        
        # json = JsonResponse(data, safe=False)
        # print(json.body)
        # return json

@api_view(['GET'])
def single_recommendation_details(request, rec_id):
        #Get the Current User Object
        current_user_object = get_current_user(request)

        #Create a Queryset of the item we are choosing to display
        single_rec_details = RecommendedMovie.objects.filter(user=current_user_object, id=rec_id)

        #Serialize the queryset
        serialized_rec = RecommendationSerializer(single_rec_details).rec_detail

        #Return a Json Response
        return Response(serialized_rec)

#Check API view argument for delete
@api_view(['GET','DELETE'])
def single_recommendation_delete(request, rec_id):
        #Get the Current User Object
        current_user_object = get_current_user(request)

        #Create a Queryset of the item we are choosing to display
        single_rec_object = RecommendedMovie.objects.get(user=current_user_object, id=rec_id)

        single_rec_object.user.remove(current_user_object)


        #Serialize the queryset


        #Return a Json Response
        
        return HttpResponse("Successfully Deleted")


@api_view(['GET'])
def single_recommendation_ratings(request, rec_id):

        #Create a Queryset of the item we are choosing to display
        single_rec_details = RecommendedMovie.objects.get(id=rec_id)

        single_recommendation_ratings = Rating.objects.filter(recommendation = single_rec_details.id)

        #Serialize the queryset
        serialized_ratings = RatingSerializer(single_recommendation_ratings).all_ratings

        #Return a Json Response
        return Response(serialized_ratings)


@csrf_exempt
@api_view(['GET','POST'])
def new_movie(request, genre_id):
       


        #Honestly, this line of code is to get around the fact that 'downloadable' looks like an f string variable and this gets around that syntactic mess and allows me to put other search terms into the querystring
        downloadable = '{downloadable}'
        url = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi"

        querystring = {"q":f"-!1900,2018-!0,5-!0,10-!{genre_id},2125-!Any-!Any-!Any-!gt100-!{downloadable}",
        "t":"ns","cl":"78","st":"adv","ob":"Relevance","p":"1","sa":"and"}

        headers = {
        'x-rapidapi-host': "unogs-unogs-v1.p.rapidapi.com",
        'x-rapidapi-key': "b021ba0b5fmsh6c37d87f8d1d133p1dbb43jsne06630292cd6"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)
        movies = (json.loads(response.content))
        items = (movies["ITEMS"])

        items_returned = len(items) - 1

        value = randint(1,items_returned)
        print(value)

        




        random_item = (items[value])


        #Find Current User ---Turn Into helper function
        serializer = UserSerializer(request.user)
        current_user_username=serializer.data['username']
        current_user_object = User.objects.get(username=current_user_username)
        this_user = User.objects.get(id=current_user_object.id)



        random_item_title=(random_item["title"].replace("&#39;","'"))
        random_item_synopsis=(random_item["synopsis"].replace("&#39;","'"))
        random_item_runtime=(random_item["runtime"])
        random_item_img=(random_item["image"])
        new_movie = RecommendedMovie.objects.create(
                title=random_item_title,synopsis=random_item_synopsis,runtime=random_item_runtime,image_url=random_item_img)

        
        new_movie.user.add(this_user)


        new_movie_query = RecommendedMovie.objects.filter(id=new_movie.id)
        
        #Serialize the queryset
        serialized_rec = RecommendationSerializer(new_movie_query).rec_detail

        #Return a Json Response
        return Response(serialized_rec)


@csrf_exempt
@api_view(['GET','POST'])
def new_rating(request, rec_id):
        if request.method == "POST":
                current_user = get_current_user(request)
                single_rec_object = RecommendedMovie.objects.get(id=rec_id)
                stars = request.data["stars"]
                # user = request.data["User"]
                description = request.data["description"]

                new_rating = Rating.objects.create(stars=stars, User=current_user, description=description,recommendation=single_rec_object)
                return HttpResponse(new_rating)

        #         form = RatingForm(data)
        #         if form.is_valid():
        #            rating = form.save(commit=True)
        #            serializedRating = RatingSerializer(rating).rating_detail
        #            return JsonResponse(data=serializedRating, status=200)
        #         else:  
                
        #                 serializedRating = RatingSerializer(request)
        #                 return HttpResponse()
        # else:
        #         print('not a post method')
        #         return HttpResponse('request.method is not post')
        



