from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login

from .models import CustomUser, Tweet
from .forms import TweetForm, UserRegistrationForm

# DRF Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

# Custom user model
User = get_user_model()

# Profile serializers
from .serializers import UserSerializer, UpdateProfileSerializer


# ========================================
# JWT Token Generator for DRF Auth
# ========================================
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# ========================================
# JWT Registration API
# ========================================
class RegisterView(APIView):
    def post(self, request):
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        full_name = data.get('full_name')

        if not all([username, email, password, full_name]):
            return Response({'error': 'All fields are required'}, status=400)

        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=full_name.split()[0],
            last_name=' '.join(full_name.split()[1:]) if len(full_name.split()) > 1 else ''
        )

        return Response({'message': 'User created successfully'})


# ========================================
# JWT Login API
# ========================================
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            tokens = get_tokens_for_user(user)
            return Response({'msg': 'Login successful', 'tokens': tokens}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


# ========================================
# JWT Authenticated User Profile View
# ========================================
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        """Return the currently logged-in user's profile data"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=200)

    def put(self, request):
        """Update profile - image, location, gender, etc."""
        serializer = UpdateProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Profile updated successfully'}, status=200)
        return Response(serializer.errors, status=400)


# ========================================
# REGULAR DJANGO VIEWS
# ========================================

def index(request):
    return render(request, 'index.html')


def tweet_list(request):
    tweets = Tweet.objects.all().order_by('-created_at')
    return render(request, 'tweet_list.html', {'tweets': tweets})


@login_required
def tweet_create(request):
    """Standard session-based tweet create view"""
    if request.method == "POST":
        form = TweetForm(request.POST, request.FILES)
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            return redirect('tweet_list')
    else:
        form = TweetForm()
    return render(request, 'tweet_form.html', {'form': form})


@login_required
def tweet_edit(request, tweet_id):
    """Edit your own tweet"""
    tweet = get_object_or_404(Tweet, pk=tweet_id, user=request.user)
    if request.method == 'POST':
        form = TweetForm(request.POST, request.FILES, instance=tweet)
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            return redirect('tweet_list')
    else:
        form = TweetForm(instance=tweet)
    return render(request, 'tweet_form.html', {'form': form})


@login_required
def tweet_delete(request, tweet_id):
    """Delete your own tweet"""
    tweet = get_object_or_404(Tweet, pk=tweet_id, user=request.user)
    if request.method == 'POST':
        tweet.delete()
        return redirect('tweet_list')
    return render(request, 'tweet_confirm_delete.html', {'tweet': tweet})


def register(request):
    """Session-based registration (not used in API)"""
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password1'])
            user.save()
            login(request, user)
            return redirect('tweet_list')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})
