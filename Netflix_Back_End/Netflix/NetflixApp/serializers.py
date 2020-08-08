from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from builtins import object


class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = User
        fields = ('username',)
    



class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')
       



class RecommendationSerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_recs(self):
        output = {'recs': []}

        for rec in self.body:
            rec_detail = {
                'id': rec.id,
                'title': rec.title,
                'synopsis': rec.synopsis,
                'avg_rating': rec.avg_rating,
                'runtime': rec.runtime,
                'image_url': rec.image_url,
            }
            output['recs'].append(rec_detail)

        return output

    @property
    def rec_detail(self):
        output = {'recs': []}

        for rec in self.body:
            rec_detail = {
                'id': rec.id,
                'title': rec.title,
                'synopsis': rec.synopsis,
                'avg_rating': rec.avg_rating,
                'runtime': rec.runtime,
                'image_url': rec.image_url,
            }
            output['recs'].append(rec_detail)

        return output


class RatingSerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_ratings(self):
        output = {'ratings': []}

        for rating in self.body:
            rating_detail = {
                'stars': rating.stars,
                'User': rating.User.username,
                'description': rating.description,
                # 'Movie': rating.recommendation,
            }
            output['ratings'].append(rating_detail)

        return output

    @property
    def rating_detail(self):
        output = {'rating': []}

        for rating in self.body:
            rating_detail = {
                'stars': rating.stars,
                'User': rating.User.username,
                'description': rating.description,
                'Movie': rating.recommendation,
            }
            output['rating'].append(rating_detail)

        return output