from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import QuizzAPI, CursoAPI, PalabraClaveAPI, TopicoAPI, get_quizz_curso, get_palabra_curso, get_test_curso_relacion

router = DefaultRouter()
router.register(r'quizz', QuizzAPI, basename='user')
router.register(r'curso', CursoAPI, basename='curso')
router.register(r'palabra_clave', PalabraClaveAPI, basename='palabra_clave')
router.register(r'topico', TopicoAPI, basename='topico')

urlpatterns = [
    path("curso/<int:id>/quizz/", view=get_quizz_curso, name="curso_quizz"),
    path("curso/<int:id>/palabra/", view=get_palabra_curso, name="curso_palabra"),
    path("curso/<int:id>/topicos/", view=get_test_curso_relacion, name="curso_topicos")
]

urlpatterns += router.urls