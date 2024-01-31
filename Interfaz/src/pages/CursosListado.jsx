import Card from '../components/Card'
import { useCursos } from '../hooks/useCursos'

export default function CursosListado() {
    const cursos = useCursos()
    return (
        <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-3'>
            {cursos?.map(curso => (
                <Card
                    key={curso.id}
                    to={`${curso.id}`}
                    imgSrc={curso.imagen}
                >
                    {curso.nombre}
                </Card>
            ))}
        </div>
    )
}
