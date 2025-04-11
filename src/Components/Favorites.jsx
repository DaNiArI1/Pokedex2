import React, { useState, useEffect } from "react";

function Favorites({ favorites, onSelectPokemon }) {
    const [favoriteData, setFavoriteData] = useState([]);
  
    useEffect(() => {
      const fetchFavorites = async () => {
        const promises = favorites.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        );
        const data = await Promise.all(promises);
        setFavoriteData(data);
      };
  
      if (favorites.length > 0) {
        fetchFavorites();
      } else {
        setFavoriteData([]);
      }
    }, [favorites]);
  
    return (
      <div className="pokemon-list">
        <h3 style={{ textAlign: "center" }}>⭐ Favoritos</h3>
        {favoriteData.map(pokemon => (
          <div
            key={pokemon.id}
            className="pokemon-list-item"
            onClick={() => onSelectPokemon(pokemon.id)}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} width="50" />
            <span style={{ marginLeft: "10px" }}>{pokemon.name}</span>
          </div>
        ))}
        {favoriteData.length === 0 && <p>No hay Pokémon favoritos aún.</p>}
      </div>
    );
  }

  export default Favorites;