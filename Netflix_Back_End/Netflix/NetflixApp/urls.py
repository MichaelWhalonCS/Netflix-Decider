from django.urls import path
from . import views


# /movies/ is the precursor for these urlpatterns
urlpatterns = [
#     path('', views.movies_list, name='movies_list'),
    path('current_user/', views.current_user, name='current_user'),


    path('current_user/<int:rec_id>', views.single_recommendation_details, name='single_recommendation'),

    path('current_user/<int:rec_id>/delete', views.single_recommendation_delete, name='single_recommendation'),

    path('current_user/ratings/<int:rec_id>', views.single_recommendation_ratings, name='single_recommendation_ratings'),

    path('current_user/ratings/<int:rec_id>/new', views.new_rating,  name='new_rating'),

    path('current_user/all_recommendations', views.recommendation_list, name='all_recommendations'),

    path('users/', views.UserList.as_view()),
#     path('build/<int:netflix_id>', views.build_movie, name='build_a_movie'),
    path('new/<genre_id>', views.new_movie, name="new_movie")

]