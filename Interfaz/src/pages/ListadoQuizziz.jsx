import fondo_quizz from "../assets/juegos/fondo_quizz.webp"
import { useQuizz } from "../hooks/useQuizz"
import Card from "../components/Card"

export default function ListadoQuizziz() {
    const quizziz = useQuizz()    
    return (
        <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-3'>
            {quizziz.map(quizziz => (
                <Card
                    key={quizziz.id}
                    to={`${quizziz.id}`}
                    imgSrc={fondo_quizz}
                >
                    {quizziz.nombre}
                </Card>
            ))}
        </div>
    )
}
