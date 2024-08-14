// src/components/LandingPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonList from './PokemonList';
import { getAllPokemonDetails } from '../services/pokemonService';

function LandingPage() {
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [computerPokemons, setComputerPokemons] = useState([]);
  const [pokemonList, setPokemonList] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonList = await getAllPokemonDetails();
        setPokemonList(pokemonList);

        const randomPokemons = pokemonList
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        setComputerPokemons(randomPokemons);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handlePokemonSelect = (selectedPokemon) => {
    if (selectedPokemons.includes(selectedPokemon)) {
      setSelectedPokemons(selectedPokemons.filter(p => p !== selectedPokemon));
    } else if (selectedPokemons.length < 6) {
      setSelectedPokemons([...selectedPokemons, selectedPokemon]);
    }
  };

  const startBattle = () => {
    if (selectedPokemons.length === 6 && computerPokemons.length === 6) {
      navigate('/battle', { state: { selectedPokemons, computerPokemons } });
    }
  };

  return (
    <div>
      <h1>Select your 6 Pokémon</h1>
      <button onClick={startBattle} disabled={selectedPokemons.length !== 6}>
        Start Battle
      </button>
      <PokemonList 
        onPokemonSelect={handlePokemonSelect} 
        selectedPokemons={selectedPokemons} 
        pokemonList={pokemonList} 
      />
    </div>
  );
}

export default LandingPage;
