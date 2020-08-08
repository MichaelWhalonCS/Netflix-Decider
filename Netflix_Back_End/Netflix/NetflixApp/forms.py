from django import forms
from .models import Rating


#This actually doesn't end up being used, since I just created Rating objects using Psycopg2 
class RatingForm(forms.ModelForm):
    class Meta:
        model = Rating
        fields = ['stars', 'User', 'description','recommendation' ]