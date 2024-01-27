import { useEffect } from "react"
import { useVoice } from "../hooks/useVoice"

export default function PreguntaQuizz({ pregunta, onChange }) {
    const [speak] = useVoice()

    useEffect(() => {
        if (pregunta) speak(pregunta.pregunta)
    }, [])

    return (
        <div className="flex flex-col gap-4 text-sm">
            <p className="font-medium">{pregunta.pregunta}</p>
            <div className="ps-4 flex flex-col gap-1">
                {pregunta.respuestas.map((respuesta, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            id={`id_opcion_${index}`}
                            type="radio"
                            name="opcion"
                            onChange={() => onChange(respuesta)} />
                        <label htmlFor={`id_opcion_${index}`}>{respuesta.opcion}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}
