from django.urls import path
from .views import Aprendizaje1, Aprendizaje2 

urlpatterns = [
    path("/asd1", view=Aprendizaje1.as_view()),
    
    path("/asd2", view=Aprendizaje2.as_view({
        "post": "post",
        "get": "get",
    }))
]