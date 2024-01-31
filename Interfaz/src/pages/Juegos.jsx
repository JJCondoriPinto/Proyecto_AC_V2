import React from 'react'
import Card from '../components/Card'
import fondo_quizz from '../assets/juegos/fondo_quizz.webp'
import ahorcadoFondo from '../assets/juegos/juego_ahorcado.webp'
import memorama from '../assets/juegos/memorama.webp'
import TestImage from '../assets/juegos/TestImage.webp'
import TestRelacionar from '../assets/juegos/TestRelacionar.webp'

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
        imgSrc={fondo_quizz}
      >
        Test
      </Card>
      <Card
        to={"testImage"}
        imgSrc={TestImage}
      >
        TestImage
      </Card>
      <Card
        to={"memorama"}
        imgSrc={memorama}
      >
        Memorama
      </Card>
      <Card
        to={"testRelacionar"}
        imgSrc={TestRelacionar}
      >
        TestRelacionar
      </Card>
    </div>
  )
}
