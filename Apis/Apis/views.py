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
    """
    serializer_class = TopicoSerializer
    queryset = Topico.objects.all()
    #prueba
    filter_backends = [filters.SearchFilter]
    search_fields = ['contenido']
    def get_queryset(self):
        queryset = Topico.objects.all()
        search_param = self.request.query_params.get('search', None)
        if search_param:
            queryset = queryset.filter(
                Q(contenido__nombre__icontains=search_param) | 
                Q(contenido__informacion__icontains=search_param)
            )
        return queryset
    """
    serializer_class = TopicoSerializer
    queryset = Topico.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'informacion']  # Actualizado para buscar en los nuevos campos