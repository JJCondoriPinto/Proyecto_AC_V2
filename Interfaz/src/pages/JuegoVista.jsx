import { useParams } from "react-router-dom"
import Card from "../components/Card"
import computadorFondo from '../assets/aprendizaje/fondo_ac.webp'
import algoritmos from '../assets/aprendizaje/algoritmos.webp'

export default function JuegoVista() {
  const { juego } = useParams()
  return (
    <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-3'>
      {juego}
    </div>
  )
}
