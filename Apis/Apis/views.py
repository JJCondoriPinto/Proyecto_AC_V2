from rest_framework import viewsets
from .models import Quizz, Curso, PalabraClave, Topico
from .serializers import QuizzSerializer, CursoSerializer, PalabraClaveSerializer, TopicoSerializer
from bson import ObjectId

# Create your views here.
class ObjectIdMixin:
    def get_object_id(self, queryset=None):
        """Obtiene el valor del parámetro 'pk' de la URL y lo convierte a ObjectId."""
        return ObjectId(self.kwargs['pk'])

class QuizzAPI(ObjectIdMixin, viewsets.ModelViewSet):
    serializer_class = QuizzSerializer
    queryset = Quizz.objects.all()
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.get_object_id())
        self.check_object_permissions(self.request, obj)
        return obj
    
class CursoAPI(ObjectIdMixin, viewsets.ModelViewSet):
    serializer_class = CursoSerializer
    queryset = Curso.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.get_object_id())
        self.check_object_permissions(self.request, obj)
        return obj
    
class PalabraClaveAPI(ObjectIdMixin, viewsets.ModelViewSet):
    serializer_class = PalabraClaveSerializer
    queryset = PalabraClave.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.get_object_id())
        self.check_object_permissions(self.request, obj)
        return obj
    
class TopicoAPI(ObjectIdMixin, viewsets.ModelViewSet):
    serializer_class = TopicoSerializer
    queryset = Topico.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.get_object_id())
        self.check_object_permissions(self.request, obj)
        return obj