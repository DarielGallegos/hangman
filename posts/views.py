from django.shortcuts import render

# Create your views here.

#def login_view(request):
#    return render(request, 'auth/login.html')


def home(request):
    return render(request, 'posts/index.html')