import React from 'react'
import Card from '../components/Card'
import computadorFondo from '../assets/juegos/computador_fondo.webp'
import ahorcadoFondo from '../assets/juegos/juego_ahorcado.webp'
import memorama from '../assets/juegos/memorama.webp'

export default function Juegos() {
  return (
    <div className='w-full grid gap-2 grid-cols-1 md:grid-cols-3'>
      <Card
        to={"ahorcado"}
        imgSrc={ahorcadoFondo}
      >
        Ahorcado
      </Card>
      <Card
        to={"test"}
        imgSrc={computadorFondo}
      >
        Test
      </Card>
      <Card
        to={"memorama"}
        imgSrc={memorama}
      >
        Memorama
      </Card>
    </div>
  )
}
