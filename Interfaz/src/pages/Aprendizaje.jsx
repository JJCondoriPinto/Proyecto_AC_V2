import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import computadorFondo from '../assets/aprendizaje/fondo_ac.webp';
import algoritmos from '../assets/aprendizaje/algoritmos.webp';
import { useVoice } from '../hooks/useVoice';
import { useMicro } from '../hooks/useMicro';
import { MicEnabledIcon, MicDisabledIcon } from '../components/Icons';
export default function Aprendizaje() {
    const [cursos, setCursos] = useState([]);
    const [speak, speaking] = useVoice();
    const [initialAnnouncementDone, setInitialAnnouncementDone] = useState(false);
    const navigate = useNavigate();
    const [activar, desactivar, result, isActive] = useMicro(); // Captura el resultado de useMicro


    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/curso/');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCursos(data);
                if (!initialAnnouncementDone) {
                    const nombresCursos = data.map(curso => curso.nombre).join(", ");
                    speak(`Hola, soy tu asistente virtual, puedes elegir la opción de aprendizaje, cursos como ${nombresCursos}, o puedes escoger la opción de juegos.`);
                    setInitialAnnouncementDone(true);
                }
            } catch (error) {
                console.error('Hubo un problema con la petición fetch:', error);
            }
        };

        if (!speaking) {
            fetchCursos();
        }
    }, [speak, speaking, initialAnnouncementDone]);

    useEffect(() => {
        // Cada vez que el resultado del reconocimiento de voz cambie, mostrarlo en la consola
        console.log(result);
        
        // Aquí puedes agregar más lógica basada en el resultado, por ejemplo:
        // Si el resultado coincide con el nombre de un curso, navega a ese curso
        const cursoEncontrado = cursos.find(curso => result.toLowerCase().includes(curso.nombre.toLowerCase()));
        if (cursoEncontrado) {
            navigate(`/aprendizaje/${cursoEncontrado.nombre}`);
            speak(`Abriendo el curso de ${cursoEncontrado.nombre}`);
        }
        // Navegar a Juegos si se dice "juegos"
        if (result.toLowerCase().includes('juegos')) {
            navigate('/juegos');
            speak('Abriendo juegos');
        }
    }, [result, cursos, navigate, speak]);


    return (
        <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-3'>
            <Card
                to={"Arquitectura de computadoras"}
                imgSrc={computadorFondo}
            >
                Arquitectura de computadoras (AC)
            </Card>
            <Card
                to={"Analisis de datos y algortimos"}
                imgSrc={algoritmos}
            >
                Análisis de datos y algoritmos (ADA)
            </Card>

            {/* Botón para activar/desactivar el reconocimiento de voz, posicionado en la esquina inferior derecha */}
            <div className="absolute bottom-4 right-4">
                <button onClick={isActive ? desactivar : activar} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isActive ? <MicDisabledIcon className="w-4 h-4" /> : <MicEnabledIcon className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )
}
