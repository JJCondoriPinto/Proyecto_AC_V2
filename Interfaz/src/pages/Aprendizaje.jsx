import { useEffect, useState } from 'react';
import Card from '../components/Card';
import computadorFondo from '../assets/aprendizaje/fondo_ac.webp';
import algoritmos from '../assets/aprendizaje/algoritmos.webp';
import { useVoice } from '../hooks/useVoice';

export default function Aprendizaje() {
    const [cursos, setCursos] = useState([]);
    const [speak, speaking] = useVoice();
    const [initialAnnouncementDone, setInitialAnnouncementDone] = useState(false);

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


    return (
        <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-3'>
            <Card
                to={"Arquitectura de computadoras"}
                imgSrc={computadorFondo}
            >
                Arquitectura de computadoras (AC)
            </Card>
            <Card
                to={"ada"}
                imgSrc={algoritmos}
            >
                Análisis de datos y algoritmos (ADA)
            </Card>
        </div>
    )
}
