import { useParams } from "react-router-dom"

export default function JuegoVista() {
  const { juego } = useParams()
  return (
    <div>{juego}</div>
  )
}
