import { useEffect, useState } from "react";
import { listar_cursos } from "../services/cursos";

export function useCursos() {
    const [cursos, setCursos] = useState([])
    useEffect(() => {
        listar_cursos()
            .then(res => {
                setCursos(res.data)
            })
    }, [])
    return cursos
}