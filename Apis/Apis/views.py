from rest_framework import viewsets
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