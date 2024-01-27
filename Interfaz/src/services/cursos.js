import api from "./api";

export function listar_cursos() {
    return api.get("/curso")
}

export function obtener_cursos(id) {
    return api.get(`/curso/${id}`)
}