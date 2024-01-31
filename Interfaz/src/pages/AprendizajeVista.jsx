import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useMicro } from "../hooks/useMicro";
import { EnviarIcon, MicDisabledIcon, MicEnabledIcon } from "../components/Icons";
import { useVoice } from "../hooks/useVoice";
import { obtener_info, obtener_topicos } from "../services/topicos";

export default function AprendizajeVista() {
    const [input, setInput] = useState("");
    const [subtopicos, setSubtopicos] = useState([]); 
    const [infoTopico, setInfoTopico] = useState(""); 
    const [speak] = useVoice();
    const { curso } = useParams(); 
    const [activar, desactivar, result, isActive] = useMicro();
    const navigate = useNavigate();

    useEffect(() => {
        obtener_topicos(curso)
            .then(res => {
                setSubtopicos(res.data)
                const nombresTopicos = res.data.map(t => t.nombre).join(", ");
                speak(`Tópicos de ${curso}: ${nombresTopicos}`);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

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
    }, [result]);

    // Solicita la información de un subtópico específico
    const fetchInfoTopico = async (topicoNombre) => {
        obtener_info(topicoNombre)
            .then(res => {
                setInfoTopico(res.data[0].informacion)
            })
            .catch(err => {
                console.error(err);
            })
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
