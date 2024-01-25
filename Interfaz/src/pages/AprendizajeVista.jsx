import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useMicro } from "../hooks/useMicro"
import { EnviarIcon, MicDisabledIcon, MicEnabledIcon } from "../components/Icons"
import { useVoice } from "../hooks/useVoice"

export default function AprendizajeVista() {
    const [input, setInput] = useState("")
    const [speak] = useVoice()
    const { curso } = useParams()
    const [activar, desactivar, result, isActive] = useMicro()
    useEffect(() => {
        speak("")
    }, [])
    useEffect(() => {
        setInput(result)        
    }, [result])
    const enviar = () => {
        console.log(input);
    }
    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <h2 className="font-semibold text-sm">Tópicos de {curso}</h2>

                {/* Chat con asistente */}
                <div className="overflow-auto flex flex-col h-full">
                    <div>

                    </div>
                    <div className="mt-auto flex flex-col">
                        <label htmlFor="id_busqueda" className="text-sm">Escriba su consulta:</label>
                        <div className="flex items-center gap-2">
                            <input
                                id="id_busqueda"
                                type="text"
                                name="busqueda"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="border border-gray-700 rounded-md font-base p-1.5 text-sm w-full"
                            />
                            {/* Microfono */}
                            <div className="flex gap-2">
                                <button onClick={isActive ? desactivar : activar} className="bg-slate-200 p-2 rounded-full hover:bg-gray-600 hover:fill-white">
                                    {isActive ? <MicEnabledIcon width={24} height={24} /> : <MicDisabledIcon width={24} height={24} />}
                                </button>
                                <button onClick={enviar} className="bg-slate-200 p-2 rounded-full hover:bg-gray-600 hover:fill-white">
                                    <EnviarIcon width={18} height={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
