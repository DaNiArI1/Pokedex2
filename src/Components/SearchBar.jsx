import React, { useState } from "react";

function SearchBar({ onSearch, elegirAleatorio }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (!searchInput) return;
    
    if (!isNaN(searchInput)) {
      onSearch(Number(searchInput)); // Buscar por ID
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`)
        .then(response => response.json())
        .then(data => onSearch(data.id))
        .catch(() => alert("Pokémon no encontrado"));
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={elegirAleatorio}>🔀 Aleatorio</button>
    </div>
  );
}

export default SearchBar;