# TweetApp

# Project setup
- py -m venv tweetapp
- tweetapp\Scripts\activate
- pip install django
- python.exe -m pip install --upgrade pip
- pip freeze > requirements.txt
- django-admin startproject tweetsapp => project name

- cd tweetsapp
- python manage.py runserver

- python manage.py makemigrations
- python manage.py migrate

- python manage.py createsuperuser(admin)
username: prathicashettym

- in settings.py 
import os

MEDIA_URL='/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,'media')

STATIC_URL='static/'
STATICFILE_DIRS=[os.path.join(BASE_DIR,'static')]


- in urls.py add these
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

- python manage.py startapp tweet => app
- make urls.py and add this
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    # path("admin/", admin.site.urls),
] 

- update settings.py tht we have made a new app tweet
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "tweet",
]

- add this also
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, 'templates')],
        "APP_DIRS": True,
     ..
    }
]











# Use it other times
- tweetapp\Scripts\activate
- cd tweetsapp
- python manage.py runserver



## assignments
- search functionality - form, create new view, get search results, based on key words in tweet

## my additionals
- - profile section
  - followers
  - 