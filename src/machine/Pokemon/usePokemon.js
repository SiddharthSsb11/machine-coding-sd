import React, { useState, useEffect } from "react";

// Custom hook to manage Pokemon data, selection, and navigation
const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        ); // Adjust limit as needed
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemonList(detailedData);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, []);

  const selectPokemonByName = (name) => {
    const index = pokemonList.findIndex((pokemon) => pokemon.name === name);
    if (index !== -1) setSelectedIndex(index);
  };

  const goToNextPokemon = () => {
    if (selectedIndex < pokemonList.length - 1)
      setSelectedIndex((prev) => prev + 1);
  };

  const goToPreviousPokemon = () => {
    if (selectedIndex > 0) setSelectedIndex((prev) => prev - 1);
  };

  return {
    pokemonList,
    selectedPokemon: pokemonList[selectedIndex],
    selectedIndex,
    selectPokemonByName,
    goToNextPokemon,
    goToPreviousPokemon,
    hasNext: selectedIndex < pokemonList.length - 1,
    hasPrevious: selectedIndex > 0,
  };
};

export default usePokemon;
