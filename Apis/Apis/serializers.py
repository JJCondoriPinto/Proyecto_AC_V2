from rest_framework import serializers
from .models import Quizz, Curso, Topico, PalabraClave

class QuizzSerializer(serializers.ModelSerializer):
    cuestionario = serializers.JSONField()
    class Meta:
        model = Quizz
        fields = "__all__"

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = "__all__"

class TopicoSerializer(serializers.ModelSerializer):
    """
    class Meta:
        model = Topico
        fields = "__all__"
    """
    class Meta:
        model = Topico
        fields = ['curso', 'nombre', 'informacion']  # Actualizado para usar los nuevos campos
        
        
class PalabraClaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = PalabraClave
        fields = "__all__"