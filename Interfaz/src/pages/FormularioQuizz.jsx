import { useEffect, useState } from "react"
import { useQuizz } from "../hooks/useQuizz"
import { useNavigate } from "react-router-dom"
import { useVoice } from "../hooks/useVoice"
import PreguntaQuizz from "../components/PreguntaQuizz"

export default function FormularioQuizz() {
    const navigate = useNavigate()
    const [speak] = useVoice()
    const quizz = useQuizz()
    const [puntaje, setPuntaje] = useState(0)
    const [pregunta, setPregunta] = useState(0)
    const [opcion, setOpcion] = useState()

    const handleNext = () => {
        if (opcion === undefined) {
            speak("Debe seleccionar una opcion")
            alert("Debe seleccionar una opcion")
            return;
        }
        if (opcion.valor) {
            setPuntaje(prev => prev + 1)
            speak("Respuesta correcta :)")
            alert("Respuesta correcta :)")
        } else {
            speak("Respuesta incorrecta :(")
            alert("Respuesta incorrecta :(")
        }

        setPregunta(prev => prev + 1)
    }

    return (
        <>
            {quizz ? (
                <div className="w-full flex flex-col">
                    <div className="flex justify-between mb-4">
                        <h2 className="font-semibold">{quizz.nombre}</h2>
                        <p>Puntaje: {puntaje} / {quizz.cuestionario.length}</p>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        {pregunta === quizz.cuestionario.length ? (
                            <div className="w-full h-full flex flex-col">
                                <p className="flex-1 flex items-center justify-center">
                                    {(() => {
                                        let texto = puntaje > 3 ?
                                            `Bien hecho, su puntaje es de ${puntaje}` :
                                            `Su puntaje fue de ${puntaje} siga practicando!!`
                                        speak(texto)
                                        return texto
                                    })()}
                                </p>
                                <button className="mt-auto ms-auto bg-primary text-white rounded-md px-2 py-1" onClick={() => navigate("..")}>
                                    Finalizar
                                </button>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col">
                                <div className="flex items-center justify-center">
                                    {quizz.cuestionario.map((seccion, index) => pregunta === index ? (
                                        <PreguntaQuizz key={index} pregunta={seccion} onChange={(respuesta) => setOpcion(respuesta)} />
                                    ) : null)}
                                </div>
                                <button className="mt-auto ms-auto bg-primary text-white rounded-md px-2 py-1" onClick={handleNext}>
                                    {pregunta === quizz.cuestionario.length - 1 ? "Enviar" : "Siguiente"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    )
}
