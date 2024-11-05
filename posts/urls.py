from django.urls import path
from . import views
from django.shortcuts import render

urlpatterns = [
    #path('', lambda request: render(request, 'auth/login.html'), name='home'),
    path('', views.home),
    path('game/', views.game),
    path('game/<int:game_id>', views.game_dificulty),
    path('login/', views.login),
    path('logout/', views.logout),
]
