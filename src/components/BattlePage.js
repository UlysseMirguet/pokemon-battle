// src/components/BattlePage.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { getAllPokemonDetails } from '../services/pokemonService';

function BattlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [playerPokemons, setPlayerPokemons] = useState(location.state.selectedPokemons || []);
  const [computerPokemons, setComputerPokemons] = useState(location.state.computerPokemons || []);
  const [pokemonList, setPokemonList] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [computerPokemon, setComputerPokemon] = useState(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [computerHP, setComputerHP] = useState(100);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonList = await getAllPokemonDetails();
        setPokemonList(pokemonList);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (playerHP <= 0 && playerPokemon) {
      alert(`${playerPokemon.name} is K.O.!`);
      setPlayerPokemon(null);
      if (playerPokemons.length === 0) {
        alert('You lost the battle!');
        navigate('/');
      }
      setPlayerHP(100); // Reset player HP for next battle
    }
  
    if (computerHP <= 0 && computerPokemon) {
      alert(`${computerPokemon.name} is K.O.!`);
      setComputerPokemon(null);
    }
  
    if (!computerPokemon) {
      if (computerPokemons.length > 0) {
        const nextComputerPokemon = computerPokemons[0];
        setComputerPokemon(pokemonList.find(pokemon => pokemon.name === nextComputerPokemon));
        console.log('Before update, computerPokemons length:', computerPokemons.length);

        setComputerPokemons(prev => prev.filter(p => p !== nextComputerPokemon));
        console.log('After update, computerPokemons length:', computerPokemons.length);

        setComputerHP(100); // Reset computer HP for next battle
      } else {
        alert('You won the battle!');
        navigate('/');
      }
    }
  }, [playerHP, computerHP, playerPokemon, computerPokemon]);
  






  const handlePlayerAttack = () => {
    const damage = Math.floor(Math.random() * 20);
    setComputerHP(prevHP => Math.max(prevHP - damage, 0));
    setTimeout(handleComputerAttack, 1000);
  };

  const handleComputerAttack = () => {
    const damage = Math.floor(Math.random() * 20);
    setPlayerHP(prevHP => Math.max(prevHP - damage, 0));
  };




  return (
    <div>
      <h1>Battle</h1>
      <div>
          <h2>Select your next Pokémon</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {playerPokemons.map(pokemonName => {
              const pokemon = pokemonList.find(p => p.name === pokemonName);
              if (pokemon) {
                return (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    image={pokemon.image}
                    hp={pokemon.hp}
                    onSelect={() => {
                      if (!playerPokemon){
                        setPlayerPokemon(pokemon); // Met à jour l'état avec le Pokémon sélectionné
                        setPlayerPokemons(prev => prev.filter(p => p !== pokemon.name)); // Retire le Pokémon sélectionné de la liste
                      }
                    }}
                  />
                );
              } else {
                return null;
              }
            })}

          </div>
          <h2>Computer Pokémos</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {computerPokemons.map(pokemonName => {
              const pokemon = pokemonList.find(p => p.name === pokemonName);
              if (pokemon) {
                return (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    image={pokemon.image}
                    hp={pokemon.hp}
                  />
                );
              } else {
                return null;
              }
            })}

          </div>
        </div>
        {playerPokemon && computerPokemon && (
          <div>
            <h3>Battle: {playerPokemon.name} vs {computerPokemon.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <PokemonCard
                name={playerPokemon.name}
                image={playerPokemon.image}
                hp={playerHP}
                isSelected={true}
                onSelect={() => {}}
              />
              <div>
                <button onClick={handlePlayerAttack} disabled={playerHP <= 0 || computerHP <= 0}>Attack</button>
              </div>
              <PokemonCard
                name={computerPokemon.name}
                image={computerPokemon.image}
                hp={computerHP}
                isSelected={true}
                onSelect={() => {}}
              />
            </div>
          </div>
        )}
    </div>
  );
}

export default BattlePage;
