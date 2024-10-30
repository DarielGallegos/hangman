from django.urls import path
from . import views
from django.shortcuts import render

urlpatterns = [
    #path('', lambda request: render(request, 'auth/login.html'), name='home'),
    path('', views.home),
]
