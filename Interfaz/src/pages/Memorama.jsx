import React, { useState, useEffect } from 'react';
import imagen1 from './img/cpu.webp';
import imagen2 from './img/memoria.webp';
import imagen3 from './img/buses.webp';
import imagen4 from './img/entrada.webp';
import imagen5 from './img/salida.webp';

const initialCards = [
  { id: 1, value: 'Unidad central de proceso', flipped: false, matched: false },
  { id: 2, value: 'Periféricos Salida', imgSrc: imagen5, flipped: false, matched: false },
  { id: 3, value: 'Periféricos Entrada', flipped: false, matched: false },
  { id: 4, value: 'Memoria', imgSrc: imagen2, flipped: false, matched: false },
  { id: 5, value: 'Sistemas de interconexión: Buses', flipped: false, matched: false },
  { id: 6, value: 'Periféricos Entrada', imgSrc: imagen4, flipped: false, matched: false },
  { id: 7, value: 'Memoria', flipped: false, matched: false },
  { id: 8, value: 'Unidad central de proceso', imgSrc: imagen1, flipped: false, matched: false },
  { id: 9, value: 'Periféricos Salida', flipped: false, matched: false },
  { id: 10, value: 'Sistemas de interconexión: Buses', imgSrc: imagen3, flipped: false, matched: false },
];

const Memorama = () => {
  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const shuffleCards = (cards) => {
    let shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
  };

  const resetGame = () => {
    setCards(shuffleCards(initialCards));
    setFlippedCards([]);
    setGameOver(false);
  };

  useEffect(() => {
    const handleMatch = () => {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.value === secondCard.value) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, matched: true }
              : card
          )
        );
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.flipped ? { ...card, flipped: false } : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    };

    if (flippedCards.length === 2) {
      setTimeout(() => {
        handleMatch();
      }, 1000);
    }
  }, [flippedCards]);

  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
    if (allMatched && cards.length > 0) {
      setGameOver(true);
    }
  }, [cards]);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || card.flipped || card.matched) return;
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);
    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );
  };

  const styles = {
    memoGame: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      padding: '20px',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 100px)',
      gridTemplateRows: 'repeat(2, 100px)',
      gap: '10px',
      justifyContent: 'center',
      marginTop: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      padding: '10px',
    },
    card: {
      width: '100px',
      height: '100px',
      backgroundColor: '#e0e0e0',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
    flipped: {
      transform: 'rotateY(180deg) scale(-1, 1)',
      backgroundColor: '#a0a0a0',
    },
    matched: {
      backgroundColor: '#b0ffb0',
    },
    value: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.memoGame}>
      <div style={styles.cardsGrid}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              ...styles.card,
              ...(card.flipped && styles.flipped),
              ...(card.matched && styles.matched),
            }}
            onClick={() => handleCardClick(card)}
          >
            {card.flipped && card.imgSrc && <img src={card.imgSrc} alt="Card" style={{ width: '100%', height: '100%' }} />}
            {card.flipped && !card.imgSrc && <span style={styles.value}>{card.value}</span>}
          </div>
        ))}
      </div>
      {gameOver && (
        <>
          <h2>¡Felicidades, ganaste!</h2>
          <button onClick={resetGame} className="bg-gray-300 p-2 rounded-full hover:bg-gray-600 hover:text-white">Volver a Jugar</button>
        </>
      )}
    </div>
  );
};

export default Memorama;
