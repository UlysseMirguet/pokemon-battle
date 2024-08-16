// src/components/PokemonList.js

import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ onPokemonSelect, selectedPokemons, pokemonList = [] }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pokemonList.map(pokemon => (
                <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    image={pokemon.image}
                    hp={pokemon.hp}
                    attack={pokemon.attack} // Passer la valeur d'attaque
                    isSelected={selectedPokemons.includes(pokemon)}
                    onSelect={() => onPokemonSelect(pokemon)}
                />
            ))}
        </div>
    );
}

export default PokemonList;
