from django.shortcuts import get_object_or_404
from rest_framework import viewsets, filters
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
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'informacion']  # Esto es para la funcionalidad de búsqueda

    def get_queryset(self):
        queryset = super().get_queryset()  # Obtiene la consulta base, que es Topico.objects.all()
        curso_id = self.request.query_params.get('curso', None)
        if curso_id:
            queryset = queryset.filter(curso=curso_id)  # Filtra por nombre de curso
        return queryset

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
    

@api_view(["GET"])
def get_test_curso_relacion(request, id, *args, **kwargs):
    curso = get_object_or_404(Curso, pk=id)
    topicos = Topico.objects.filter(curso=curso)
    serializer_curso = CursoSerializer(instance=curso)
    serializer_topicos = TopicoSerializer(instance=topicos, many=True)
    return Response({
        "curso": serializer_curso.data,
        "topicos": serializer_topicos.data,
    })
    
