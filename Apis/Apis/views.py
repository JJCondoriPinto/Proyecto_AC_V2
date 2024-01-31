from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Quizz, Curso, PalabraClave, Topico
from .serializers import QuizzSerializer, CursoSerializer, PalabraClaveSerializer, TopicoSerializer

class QuizzAPI(viewsets.ModelViewSet):
    serializer_class = QuizzSerializer
    queryset = Quizz.objects.all()
    
class CursoAPI(viewsets.ModelViewSet):
    serializer_class = CursoSerializer
    queryset = Curso.objects.all()
    
class PalabraClaveAPI(viewsets.ModelViewSet):
    serializer_class = PalabraClaveSerializer
    queryset = PalabraClave.objects.all()
    
class TopicoAPI(viewsets.ModelViewSet):
    serializer_class = TopicoSerializer
    queryset = Topico.objects.all()

@api_view(["GET"])
def get_quizz_curso(request, id, *args, **kwargs):
    curso = get_object_or_404(Curso, pk=id)
    quizzis = Quizz.objects.filter(curso=curso)
    serializer = QuizzSerializer(instance=quizzis, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_palabra_curso(request, id, *args, **kwargs):
    curso = get_object_or_404(Curso, pk=id)
    palabras = PalabraClave.objects.filter(curso=curso)
    serializer = PalabraClaveSerializer(instance=palabras, many=True)
    return Response(serializer.data)
    