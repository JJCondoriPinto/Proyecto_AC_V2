from djongo import models

# Create your models here.
class Aprendizaje(models.Model):
    nombre=models.CharField(max_length=255)
    contenido=models.JSONField()

class Quizz(models.Model):
    nombre=models.CharField(max_length=255)
    cuestionario=models.JSONField() 