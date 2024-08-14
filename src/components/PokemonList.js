// src/components/PokemonList.js

import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ onPokemonSelect, selectedPokemons, pokemonList = [] }) { // Default to an empty array
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {pokemonList.map(pokemon => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          image={pokemon.image}
          isSelected={selectedPokemons.includes(pokemon)}
          hp={pokemon.hp}
          onSelect={() => onPokemonSelect(pokemon)}
        />
      ))}
    </div>
  );
}

export default PokemonList;
