import api from "./api";

// Obtiene la lista de quizziz en relación a un curso
export function obtener_quizziz(id) {
    return api.get(`/curso/${id}/quizz`)
}