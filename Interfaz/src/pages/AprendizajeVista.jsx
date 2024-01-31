import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useMicro } from "../hooks/useMicro";
import { EnviarIcon, MicDisabledIcon, MicEnabledIcon } from "../components/Icons";
import { useVoice } from "../hooks/useVoice";

export default function AprendizajeVista() {
    const [input, setInput] = useState("");
    const [subtopicos, setSubtopicos] = useState([]); 
    const [infoTopico, setInfoTopico] = useState(""); 
    const [hasSpoken, setHasSpoken] = useState(false); // Estado para controlar si ya se ha hablado
    const [speak] = useVoice();
    const { curso } = useParams(); 
    const [activar, desactivar, result, isActive] = useMicro();
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasSpoken) { // Si aún no se ha hablado
            speak(""); // Inicializa la síntesis de voz
            fetchSubtopicos();
        }
    }, [curso, speak, hasSpoken]); // Agregar hasSpoken como dependencia

    useEffect(() => {
        setInput(result); 
    }, [result]);

    // Solicita los subtópicos del curso
    const fetchSubtopicos = async () => {
        try {
            const cursoNombre = encodeURIComponent(curso); 
            const response = await fetch(`http://localhost:8000/api/v1/topico/?curso=${cursoNombre}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setSubtopicos(data); 
            // Leer en voz alta los nombres de los subtópicos sólo si aún no se ha hablado
            if (!hasSpoken) {
                const nombresTopicos = data.map(t => t.nombre).join(", ");
                speak(`Tópicos de ${curso}: ${nombresTopicos}`);
                setHasSpoken(true); // Marcar que ya se ha hablado para no repetirlo
            }
        } catch (error) {
            console.error('Hubo un problema con la petición fetch:', error);
        }
    };

    useEffect(() => {
        if (result) {
            const subtopicoEncontrado = subtopicos.find(subtopico => result.toLowerCase() === subtopico.nombre.toLowerCase());
            if (subtopicoEncontrado) {
                fetchInfoTopico(subtopicoEncontrado.nombre);
            } else if (result.toLowerCase().includes('juegos')) {
                navigate('/juegos');
            } else if (result.toLowerCase().includes('aprendizaje')) {
                navigate('/aprendizaje');
            }
        }
    }, [result, subtopicos, navigate]);





    // Solicita la información de un subtópico específico
    const fetchInfoTopico = async (topicoNombre) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/topico/?search=${encodeURIComponent(topicoNombre)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            if (data && data.length > 0) {
                setInfoTopico(data[0].informacion); 
                speak(data[0].informacion); 
            }
        } catch (error) {
            console.error('Hubo un problema con la petición fetch:', error);
        }
    };

    const enviar = () => {
        fetchInfoTopico(input); 
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <h2 className="font-semibold text-sm">Tópicos de {curso}</h2>
            <div className="overflow-auto flex flex-col h-full">
                <div>
                    {subtopicos.map((subtopico, index) => (
                        <div key={index} onClick={() => fetchInfoTopico(subtopico.nombre)}>
                            {subtopico.nombre}
                        </div>
                    ))}
                </div>
                <div className="chat-output mt-auto">
                    {infoTopico && <p>{infoTopico}</p>}
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
    );
}
