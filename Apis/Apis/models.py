from djongo import models

# Cursos de los cuales se puede consultar
class Curso(models.Model):
    nombre = models.CharField(max_length=50, null=False)
    imagen = models.ImageField(upload_to="cursos/", default="cursos/default.png")
    
    def __str__(self):
        return self.nombre

# Topicos de cada curso (para aprendizaje)
class Topico(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    contenido = models.JSONField()

# Modelo para juego de ahorcado (en referencia a un curso)
class PalabraClave(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    palabra = models.CharField(max_length=25, null=False)

# Quizz para juego de text en referencia a un curso
class Quizz(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50, null=False)
    cuestionario = models.JSONField()