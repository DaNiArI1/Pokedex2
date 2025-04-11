import React, { useState, useEffect } from 'react';
import PokemonModal from './PokemonModal';

function Pokemon({ pokemonId, setPokemonId, favorites, toggleFavorite, setPokemonType, temaVisual }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
        setPokemonType(data.types?.[0]?.type?.name || "normal");
        setMostrarDetalles(false); // ocultar detalles al cambiar de Pokémon
        setTimeout(() => setLoading(false), 300);
      })
      .catch(error => console.error("Error al cargar el Pokémon:", error));
  }, [pokemonId, setPokemonType]);

  const isFavorite = favorites.includes(pokemonId);

  const getPokemonType = () => {
    return pokemon?.types?.[0]?.type?.name || 'normal';
  };

  const handleAnterior = () => {
    if (pokemonId > 1) setPokemonId(pokemonId - 1);
  };

  const handleSiguiente = () => {
    if (pokemonId < 898) setPokemonId(pokemonId + 1);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowModal(false);
    }, 300);
  };

  return (
    <div className={`pokedex ${getPokemonType()}`}>
      {pokemon && (
        <div
          className='pokemon-card-container'
          onClick={() => setMostrarDetalles(!mostrarDetalles)}
          style={{ cursor: "pointer", transition: "0.3s" }}
        >
          <h2 className='pokedex-header'>{pokemon.name}</h2>
          <img
            className={`pokemon-image ${loading ? "loading" : ""}`}
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
          />

          {showModal && (
            <PokemonModal
              pokemon={pokemon}
              onClose={handleCloseModal}
              temaVisual={temaVisual}
              isClosing={isClosing}
            />
          )}

          <button className="favorite-btn" onClick={(e) => {
            e.stopPropagation(); // para que no active el toggle
            toggleFavorite(pokemonId);
          }}>
            {isFavorite ? "⭐ Favorito" : "☆ Agregar a Favoritos"}
          </button>

          <div className='pokedex-buttons'>
            <button onClick={(e) => { e.stopPropagation(); handleAnterior(); }} disabled={pokemonId <= 1}>Anterior</button>
            <button onClick={(e) => { e.stopPropagation(); handleSiguiente(); }}>Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon;