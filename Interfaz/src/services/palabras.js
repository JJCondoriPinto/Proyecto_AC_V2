import api from "./api";

// Obtiene la lista de palabras clave en relación a un curso
export function obtener_palabras(id) {
    return api.get(`/curso/${id}/palabra`)
}