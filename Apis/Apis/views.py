from rest_framework import viewsets, filters
from .models import Quizz, Curso, PalabraClave, Topico
from .serializers import QuizzSerializer, CursoSerializer, PalabraClaveSerializer, TopicoSerializer
from django.db.models import Q
# Create your views here.
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
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'informacion']  # Esto es para la funcionalidad de búsqueda

    def get_queryset(self):
        queryset = super().get_queryset()  # Obtiene la consulta base, que es Topico.objects.all()
        curso_nombre = self.request.query_params.get('curso', None)
        if curso_nombre:
            queryset = queryset.filter(curso__nombre__icontains=curso_nombre)  # Filtra por nombre de curso
        return queryset