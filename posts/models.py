from django.db import models

class Users(models.Model):
    nombre = models.CharField(max_length=150)
    apellido = models.CharField(max_length=150)
    usuario = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=150)  # Considera hashing si se usa para autenticar

    def toDict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "usuario": self.usuario
        }

class Levels(models.Model):
    nombre = models.CharField(max_length=100)

class Words(models.Model):
    word = models.CharField(max_length=100)
    id_level = models.ForeignKey(Levels, on_delete=models.CASCADE, related_name="words")

class ScoreBoard(models.Model):
    id_user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="scoreboards")
    id_word = models.ForeignKey(Words, on_delete=models.CASCADE, related_name="scoreboards")
    points = models.IntegerField()
    attempts = models.IntegerField()
    attempts_err = models.IntegerField()
    date_register = models.DateTimeField(auto_now_add=True)