import React, { useState, useEffect } from "react";
import imagen1 from './img/cpu.webp';
import imagen2 from './img/memoria.webp';
import imagen3 from './img/buses.webp';
import imagen4 from './img/entrada.webp';
import imagen5 from './img/salida.webp';

const imagesAndWords = [
  { id: 1, imgSrc: imagen1, word: 'Unidad central de proceso' },
  { id: 2, imgSrc: imagen2, word: 'Memoria' },
  { id: 3, imgSrc: imagen3, word: 'Sistemas de interconexión: Buses' },
  { id: 4, imgSrc: imagen4, word: 'Periféricos Entrada' },
  { id: 5, imgSrc: imagen5, word: 'Periféricos Salida' },
  // Agrega más imágenes y palabras según sea necesario
];

const ShuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomWords = (correctWord, allWords) => {
  const shuffledWords = allWords.filter(word => word !== correctWord);
  const incorrectWords = shuffledWords.slice(0, 2);
  return [correctWord, ...incorrectWords];
};

const Test = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledImagesAndWords, setShuffledImagesAndWords] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShuffledImagesAndWords(ShuffleArray(imagesAndWords));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && currentRound < imagesAndWords.length) {
      const correctWord = shuffledImagesAndWords[currentRound].word;
      const newOptions = getRandomWords(correctWord, imagesAndWords.map(item => item.word));
      setOptions(newOptions);
    }
  }, [currentRound, shuffledImagesAndWords, loading]);

  const handleGuess = (selectedWord) => {
    if (selectedWord === shuffledImagesAndWords[currentRound]?.word) {
      // Respuesta correcta
      setScore(score + 1);
    }

    // Pasar a la siguiente ronda
    setCurrentRound(currentRound + 1);
  };

  const handleRestart = () => {
    // Reiniciar el juego
    setCurrentRound(0);
    setScore(0);
    setShuffledImagesAndWords(ShuffleArray(imagesAndWords));
  };

  return (
    <div className="mt-auto flex flex-col">
    {loading ? (
        <div>Cargando...</div>
      ) : currentRound < shuffledImagesAndWords.length ? (
        <div>
          <h1>¿A qué palabra pertenece esta imagen?</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={shuffledImagesAndWords[currentRound]?.imgSrc}
              alt="Imagen a adivinar"
              style={{ maxWidth: '300px', maxHeight: '300px', marginRight: '20px' }}
            />
            <div >
            {options.map((item) => (
              <button
                key={item}
                onClick={() => handleGuess(item)}
                className="bg-gray-300 p-2 rounded-full hover:bg-gray-400 hover:text-white w-40 h-25 flex items-center justify-center m-2"
              >
                {item}
              </button>
          ))}
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-20 font-semibold text-sm">
          <h2>Juego terminado</h2>
          <h1 className="font-cursive text-4xl text-purple-700 font-bold">Puntuación final: {score}</h1>
          <button onClick={handleRestart} className="bg-gray-300 p-2 rounded-full hover:bg-gray-400 hover:text-white w-40 h-25 flex items-center justify-center m-2">Reiniciar</button>  
        </div>
      )}
    </div>
  );
};

export default Test;