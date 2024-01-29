from django.contrib import admin
from .models import Curso, Topico, PalabraClave, Quizz

admin.site.register(Curso)
admin.site.register(Topico)
admin.site.register(PalabraClave)
admin.site.register(Quizz)