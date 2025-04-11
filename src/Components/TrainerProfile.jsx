import React, { useEffect, useState } from "react";
import "./Styles/TrainerProfile.css";

function TrainerProfile({ isOpen, onClose, favorites, lastViewed, temaVisual }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("trainerName");
    if (storedName) setName(storedName);
  }, []);

  useEffect(() => {
    localStorage.setItem("trainerName", name);
  }, [name]);

  const handleChange = (e) => setName(e.target.value);

  return (
    <div className={`trainer-profile ${isOpen ? "open" : ""} tema-${temaVisual}`}>
      <div className="profile-header">
        <h2>🎮 Perfil del Entrenador</h2>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="profile-content">
        <label>Nombre:</label>
        <input value={name} onChange={handleChange} placeholder="Tu nombre..." />
        <p><strong>Favoritos:</strong> {favorites.length}</p>

        {lastViewed && (
          <div className="last-viewed">
            <p><strong>Último explorado:</strong></p>
            <img src={lastViewed.sprites.front_default} alt={lastViewed.name} width="48" />
            <p>{lastViewed.name}</p>
          </div>
        )}

        <p><strong>Tema activo:</strong> {temaVisual}</p>
      </div>
    </div>
  );
}

export default TrainerProfile;
