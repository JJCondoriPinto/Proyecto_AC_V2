from djongo import models

# Create your models here.
class Curso(models.Model):
    nombre = models.CharField(max_length=50, null=False)

class Topico(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    contenido = models.JSONField()

class PalabraClave(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    palabra = models.CharField(max_length=25, null=False)

class Quizz(models.Model):
    # curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50, null=False)
    cuestionario = models.JSONField()