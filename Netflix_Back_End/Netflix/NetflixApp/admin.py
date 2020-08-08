from django.contrib import admin

from .models import RecommendedMovie, Rating
# # Register your models here.

admin.site.register(RecommendedMovie)
admin.site.register(Rating)
