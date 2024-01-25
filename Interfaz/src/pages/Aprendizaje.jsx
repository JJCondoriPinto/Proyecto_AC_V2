import Card from '../components/Card'
import computadorFondo from '../assets/aprendizaje/fondo_ac.webp'
import algoritmos from '../assets/aprendizaje/algoritmos.webp'
import { useVoice } from '../hooks/useVoice'
import { useEffect } from 'react'

export default function Aprendizaje() {
    return (
        <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-3'>
            <Card
                to={"arquitectura"}
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
