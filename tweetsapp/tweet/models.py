from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Other'),
)

# Custom User Model
class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, blank=False)

    # Optional profile fields
    profile_pic = models.ImageField(upload_to='profiles/', null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    bio = models.TextField(blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.email


class Tweet(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField(max_length=240)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    uploaded_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.user.username} - {self.text[:10]}'
    
