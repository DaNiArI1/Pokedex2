import React, { useEffect, useState } from "react";

function PokemonList({ onSelectPokemon, limit }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
        const data = await response.json();

        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );

        const results = await Promise.all(promises);
        setPokemonDetails(results);
      } catch (error) {
        console.error("Error al cargar la lista de Pokémon:", error);
      }
    };

    setPokemonDetails([]); // limpiar antes de volver a llenar
    fetchList();
  }, [limit]);

  return (
    <div className="pokemon-list">
      <h3 style={{ textAlign: "center" }}>📋 Lista</h3>
      {pokemonDetails.length === 0 && <p>Cargando Pokémon...</p>}
      {pokemonDetails.map((pokemon) => {
        const tipo = pokemon.types?.[0]?.type?.name || "normal";

        return (
          <div
            key={pokemon.id}
            className={`pokemon-list-item ${tipo}`}
            onClick={() => onSelectPokemon(pokemon.id)}
          >
            {pokemon.sprites?.front_default ? (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width="40"
              />
            ) : (
              <div
                style={{ width: "40px", height: "40px", background: "#ccc" }}
              />
            )}
            <span style={{ marginLeft: "10px" }}>{pokemon.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;