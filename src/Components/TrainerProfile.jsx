import React, { useEffect, useState } from "react";
import "./Styles/TrainerProfile.css";

function TrainerProfile({ isOpen, onClose, favorites, vistos , temaVisual, logros }) {
  const [name, setName] = useState("");
  const [mostrarBloqueados, setMostrarBloqueados] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("trainerName");
    if (storedName) setName(storedName);
  }, []);

  useEffect(() => {
    localStorage.setItem("trainerName", name);
  }, [name]);

  const handleChange = (e) => setName(e.target.value);

  const TODOS_LOS_LOGROS = [
    { id: "primer-paso", texto: "🥇 Primer paso", descripcion: "Ver tu primer Pokémon" },
    { id: "novato", texto: "🔟 Novato", descripcion: "Ver 10 Pokémon" },
    { id: "cazador-experto", texto: "🔥 Cazador experto", descripcion: "Ver 100 Pokémon" },
    { id: "corazon", texto: "💖 Corazón de entrenador", descripcion: "10 Pokémon favoritos" },
  ];

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

        {vistos && (
          <div className="progreso-entrenador">
            <p><strong>Progreso:</strong> {vistos.length} / 898</p>
            <div className="barra-progreso">
              <div
                className="barra-progreso-interna"
                style={{ width: `${(vistos.length / 898) * 100}%` }}
              />
            </div>
          </div>
          )}

        <div className="logros-section">
          <p><strong>Logros desbloqueados:</strong></p>

          <div className="logros-grid">
            {TODOS_LOS_LOGROS.map((logro) => {
              const desbloqueado = logros.includes(logro.id);
              if (!desbloqueado && !mostrarBloqueados) return null;
              
            return (
              <div
                key={logro.id}
                className={`logro ${desbloqueado ? "desbloqueado" : "bloqueado"}`}
                title={logro.descripcion}
              >
                {desbloqueado ? logro.texto : "🔒 " + logro.descripcion}
              </div>
            );
          })}
        </div>

        <button
            onClick={() => setMostrarBloqueados(!mostrarBloqueados)}
            className="toggle-logros"
          >
            {mostrarBloqueados ? "🔓 Ocultar bloqueados" : "🔒 Ver todos los logros"}
          </button>
        </div>
        <p><strong>Tema activo:</strong> {temaVisual}</p>
      </div>
    </div>
  );
}

export default TrainerProfile;
