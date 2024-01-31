import api from "./api";

// Obtiene la lista de topicos en relación a un curso
export function obtener_topicos(id) {
    return api.get(`/topico/?curso=${id}`)
}

export function obtener_info(nombre) {
    return api.get(`/topico/?search=${encodeURIComponent(nombre)}`)
}