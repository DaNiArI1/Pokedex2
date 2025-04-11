import React from "react";

function PokemonModal({ pokemon, onClose, temaVisual, isClosing }) {
  const tipo = pokemon?.types?.[0]?.type?.name || "normal";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`pokemon-modal ${tipo} tema-${temaVisual} ${isClosing ? "modal-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
        >
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>
        <p>Habilidades: {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>

        <div className="stats-container">
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="stat-bar">
              <span>{stat.stat.name.toUpperCase()}</span>
              <div className="stat-fill" style={{ width: `${stat.base_stat}%` }}>
                {stat.base_stat}
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="close-btn">Cerrar</button>
      </div>
    </div>
  );
}

export default PokemonModal;