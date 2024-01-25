from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import QuizzAPI, CursoAPI, PalabraClaveAPI, TopicoAPI

router = DefaultRouter()
router.register(r'quizz', QuizzAPI, basename='user')
router.register(r'curso', CursoAPI, basename='curso')
router.register(r'palabra_clave', PalabraClaveAPI, basename='palabra_clave')
router.register(r'topico', TopicoAPI, basename='topico')

urlpatterns = router.urls