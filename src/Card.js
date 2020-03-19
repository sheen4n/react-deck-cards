import React from 'react';
import './Card.css';

const Card = ({ image, name, transform }) => {
  return (
    <div className='Card'>
      <img src={image} alt={name} style={{ transform }} />
    </div>
  );
};

export default Card;
