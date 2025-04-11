import React, { useState, useEffect } from "react";

function Settings({ darkMode, setDarkMode, limit, setLimit, onClearFavorites, temaVisual, setTemaVisual }) {
  const [tempLimit, setTempLimit] = useState(limit);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setTempLimit(limit);
  }, [limit]);

  const handleLimitChange = () => {
    const num = parseInt(tempLimit);
    if (num >= 1 && num <= 150) {
      setLimit(num);
      localStorage.setItem("pokemonLimit", num);
    }
  };

  const handleClearFavorites = () => {
    onClearFavorites();
    setShowConfirm(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const activarPantallaCompleta = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };
  
  const salirPantallaCompleta = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };
  
  // Detectar cambio externo
  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
  
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <div className="settings-panel">
      <h3>⚙️ Configuración</h3>
      <div className="setting-item">
        <label>🌙 Modo oscuro:</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
        {isFullscreen ? (
            <button className="clear-favs-btn" onClick={salirPantallaCompleta}>⛶ Salir de pantalla completa</button>
          ) : (
            <button className="clear-favs-btn" onClick={activarPantallaCompleta}>⛶ Pantalla completa</button>
          )}
      </div>

      <div className="settings-group">
        <label htmlFor="tema-visual">Tema visual:</label>
        <select
          id="tema-visual"
          value={temaVisual}
          onChange={(e) => setTemaVisual(e.target.value)}
        >
          <option value="tipo">Por tipo del Pokémon</option>
          <option value="lava">Lava</option>
          <option value="hielo">Hielo</option>
          <option value="bosque">Bosque</option>
          <option value="teamrocket">Team Rocket</option>
        </select>
      </div>

      <div className="setting-item">
        <label>📦 Cantidad de Pokémon:</label>
        <input
          type="number"
          min="1"
          max="150"
          value={tempLimit}
          onChange={(e) => setTempLimit(e.target.value)}
        />
        <button className="clear-favs-btn" onClick={handleLimitChange}>Aplicar</button>
      </div>

      <div className="setting-item">
        {!showConfirm ? (
          <button
            className="clear-favs-btn"
            onClick={() => setShowConfirm(true)}
          >
            🗑️ Eliminar todos los favoritos
          </button>
        ) : (
          <div className="confirm-clear">
            <span>¿Eliminar todos los favoritos?</span>
            <button className="confirm-btn" onClick={handleClearFavorites}>Sí</button>
            <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancelar</button>
          </div>
        )}
      </div>
        {showToast && (
          <div className="toast-message">
            ✅ Favoritos eliminados correctamente
          </div>
        )}
    </div>
  );
}

export default Settings;