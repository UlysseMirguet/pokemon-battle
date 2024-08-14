// src/services/pokemonService.js

import Pokemon from '../models/Pokemon';

export const getAllPokemonDetails = async (limit = 151) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    const pokemonDetailsPromises = data.results.map(pokemon =>
      fetch(pokemon.url).then(response => response.json())
    );
    const allPokemonDetails = await Promise.all(pokemonDetailsPromises);

    return allPokemonDetails.map(details => new Pokemon(
      details.name,
      details.id,
      details.sprites.front_default,
      details.stats.find(stat => stat.stat.name === 'hp').base_stat,
    ));
  } catch (error) {
    console.error('Error fetching all Pokémon details:', error);
    throw error;
  }
};
