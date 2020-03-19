import React, { useEffect, useState } from 'react';
import http from './services/http';
import Card from './Card';
import './Deck.css';

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  console.log(drawn);

  const getDeck = async () => {
    const { data } = await http.get('/new/shuffle');
    setDeck(data);
  };

  useEffect(() => {
    getDeck();
    return () => {};
  }, []);

  const getRandomTransform = () => {
    const angle = Math.random() * 90 - 45;
    const xPos = Math.random() * 40 - 20;
    const yPos = Math.random() * 40 - 20;
    return `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  };

  const getCard = async () => {
    try {
      const { data } = await http.get(`/${deck.deck_id}/draw`);

      if (!data.success) throw new Error('Failed to draw card');
      const card = data.cards[0];
      setDrawn([
        ...drawn,
        {
          id: card.code,
          image: card.image,
          name: `${card.value} of ${card.suit}`,
          transform: getRandomTransform()
        }
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class='Deck'>
      <h1 className='Deck-title'>♦ Card Dealer ♦</h1>
      <h2 className='Deck-title subtitle'>♦ A little demo made with React ♦</h2>

      <button
        onClick={getCard}
        style={{ marginBottom: 50 }}
        className='Deck-btn'
      >
        Get Card
      </button>
      <div className='Deck-cardarea'>
        {drawn.map(card => (
          <Card {...card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
