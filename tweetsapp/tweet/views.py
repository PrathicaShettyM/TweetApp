from django.shortcuts import render
from .models import Tweet
from .forms import TweetForm
from django.shortcuts import get_objects_or_404, redirect
# Create your views here.

def index(request):
    return render(request, 'index.html')

def tweet_list(request):
    tweets = Tweet.objects.all().order_by('-created_at')
    return render(request, 'tweet_list.html', {'tweets': tweets})

def tweet_create(request):
    if request.method == "POST": # check if the user has alrady filled the tweet
        form = TweetForm(request.POST, request.FILES) # extract data and file(if present)
        
        if form.is_valid(): # handles csrf security
            tweet = form.save(commit=False) # save the formdata but not in db
            tweet.user = request.user # get the user
            tweet.save() # now save in the db
            return redirect('tweet_list')
        
    else: # else give him an empty tweet form to fill his tweet
        form = TweetForm()
    
    return render(request, 'tweet_form.html', {'form': form})

def tweet_edit(request, tweet_id):
    tweet = get_objects_or_404(Tweet, pk=tweet_id, user=request.user) #modelname,pk of which tweet, make sure he's able to edit only his tweet
    if request.method == 'POST': 
        form = TweetForm(request.POST, request.FILES, instance=tweet) # extract data and file(if present)
        
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            return redirect('tweet_list')
    else:
        form = TweetForm(instance=tweet) # coz there will be data which is already stored
    return render(request, 'tweet_form.html', {'form': form})

def tweet_delete(request, tweet_id):
    tweet = get_objects_or_404(Tweet, pk=tweet_id, user=request.user)
    if request.method == 'POST':
        tweet.delete()
        return redirect('tweet_list')
    return render(request, 'tweet_confirm_delete.html', {'tweet': tweet})
