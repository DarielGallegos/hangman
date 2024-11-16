import json
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from posts.models import Users, Words
from django.db import connection
# Create your views here.

def home(request):
    return render(request, 'auth/login.html')


def game(request):
    if 'id_user' in request.session:
        ctx = {'user': request.session['user']}
        return render(request, 'posts/index.html', ctx)
    return render(request, 'auth/login.html')

def logout(request):
    request.session.flush()
    return HttpResponse(json.dumps({"status":True, "msg": "Sesión cerrada", "redirect_url":"/"}), content_type='application/json')


@csrf_exempt
def register(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        usuario = request.POST.get('user')
        passwd = request.POST.get('password')
        
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"CALL insertUser('{nombre}', '{apellido}', '{usuario}', '{passwd}');")
            return HttpResponse(json.dumps({"status": True, "msg": "Registro exitoso", "redirect_url":"register/"}), content_type='application/json')
        except Exception as e:
            return HttpResponse(json.dumps({"status": False, "msg": f"Error en el registro: {str(e)}"}), content_type='application/json')

@csrf_exempt
def login(request):
    if request.method == 'POST':
        username = request.POST['user']
        password = request.POST['password']
        user = Users.objects.raw(f"CALL getAccess('{username}', '{password}');")
        if user:
            request.session['id_user'] = user[0].id
            request.session['user'] = user[0].usuario
            request.session['nombre'] = user[0].nombre
            request.session['apellido'] = user[0].apellido
            return HttpResponse(json.dumps({"status" : True, "msg" : "Acceso Correcto", "redirect_url":"game/"}), content_type='application/json')
        else:
            return HttpResponse(json.dumps({"status" : False, "msg" : "Acceso Denegado", "redirect_url":"/"}), content_type='application/json')
        
@csrf_exempt
def game_dificulty(request, game_id):
    if 'id_user' in request.session:
        word = Words.objects.raw(f"CALL selectWord({game_id});")
        if word:
            return HttpResponse(json.dumps({"status" : True, "msg" : "Palabra encontrada", "word": word[0].word}), content_type='application/json')
    return HttpResponse(json.dumps({"status" : False, "msg" : "Palabra no encontrada"}), content_type='application/json')