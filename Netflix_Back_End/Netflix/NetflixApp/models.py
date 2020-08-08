from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class RecommendedMovie(models.Model):
        #blank=True for optional fields in attributes
        user = models.ManyToManyField(User)
        title = models.TextField(max_length=500)
        synopsis = models.TextField(max_length=500)
        avg_rating = models.FloatField(default=5.0)
        runtime = models.CharField(max_length=50)
        image_url = models.TextField(max_length=400, blank=True)

        def __str__(self):
                return f" {self.title} "

class Rating(models.Model):

        Choices = ( 
            ("1", "1"), 
            ("2", "2"), 
            ("3", "3"), 
            ("4", "4"), 
            ("5", "5")
       )


        stars = models.CharField( 
        max_length = 20, 
        choices = Choices, 
        default = "5"
        ) 


        User = models.ForeignKey(User, on_delete=models.CASCADE)

        description = models.CharField(max_length=500)

        recommendation = models.ForeignKey(RecommendedMovie, on_delete=models.CASCADE)


        

        def __str__(self):
                return f" {self.description} "