import { useEffect, useState } from "react";
import { obtener_quizziz } from "../services/quizz";
import { useParams } from "react-router-dom";

export function useQuizz() {
    const { curso, quizz } = useParams()
    const [quizziz, setQuizziz] = useState([])

    useEffect(() => {
        obtener_quizziz(curso)
            .then(res => {
                setQuizziz(res.data)
            })
    }, [])

    return quizz !== undefined ? quizziz.find(q => q.id == quizz) : quizziz
}