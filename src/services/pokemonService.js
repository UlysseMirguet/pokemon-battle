// src/services/pokemonService.js

export const getAllPokemonDetails = async (limit = 151) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await response.json();
      const pokemonDetailsPromises = data.results.map(pokemon =>
        fetch(pokemon.url).then(response => response.json())
      );
      const allPokemonDetails = await Promise.all(pokemonDetailsPromises);
  
      return allPokemonDetails.map(details => ({
        name: details.name,
        id: details.id,
        image: details.sprites.front_default,
        hp: details.stats.find(stat => stat.stat.name === 'hp').base_stat,
      }));
    } catch (error) {
      console.error('Error fetching all Pokémon details:', error);
      throw error;
    }
  };
  