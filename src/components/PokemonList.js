// src/components/PokemonList.js

import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ onPokemonSelect, selectedPokemons, pokemonList }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {pokemonList.map(pokemon => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          image={pokemon.image}
          isSelected={selectedPokemons.includes(pokemon.name)}
          hp={pokemon.hp}
          onSelect={() => onPokemonSelect(pokemon.name)}
        />
      ))}
    </div>
  );
}

export default PokemonList;
