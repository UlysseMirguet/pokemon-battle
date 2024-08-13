// src/components/PokemonCard.js

import React from 'react';

function PokemonCard({ name, image, isSelected, onSelect, hp }) {
  return (
    <div 
      className={`pokemon-card ${isSelected ? 'selected' : ''}`} 
      onClick={onSelect} 
      style={{ border: isSelected ? '2px solid green' : '1px solid grey', cursor: 'pointer', padding: '10px', margin: '10px', textAlign: 'center' }}
    >
      <img src={image} alt={name} style={{ width: '100px', height: '100px' }} />
      <h3>{name ? name.charAt(0).toUpperCase() + name.slice(1) : 'un'}</h3>
      <p>HP: {hp}</p>
    </div>
  );
}

export default PokemonCard;
