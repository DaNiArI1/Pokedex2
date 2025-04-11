import React, { useState, useEffect } from "react";
import Pokemon from "./Components/Pokemon";
import PokemonList from "./Components/PokemonList";
import SearchBar from "./Components/SearchBar";
import Favorites from "./Components/Favorites";
import Settings from "./Components/Settings";
import TrainerProfile from "./Components/TrainerProfile";
import "./App.css";

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [limit, setLimit] = useState(() => {
    return parseInt(localStorage.getItem("pokemonLimit")) || 30;
  });

  const isFavorite = favorites.includes(selectedPokemonId);
  const [encendida, setEncendida] = useState(true);
  const [pokemonType, setPokemonType] = useState("normal");
  const [temaVisual, setTemaVisual] = useState("tipo");
  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const [logros, setLogros] = useState([]);
  const [logroNuevo, setLogroNuevo] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEncendida(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonId) => {
    setFavorites((prev) =>
      prev.includes(pokemonId)
        ? prev.filter((id) => id !== pokemonId)
        : [...prev, pokemonId]
    );
  };

  useEffect(() => {
    document.body.classList.forEach(c => {
      if (c.startsWith("type-") || c.startsWith("tema-"))
        document.body.classList.remove(c);
    });
    document.body.classList.add(
      temaVisual === "tipo" ? `type-${pokemonType}` : `tema-${temaVisual}`
    );
  }, [pokemonType, temaVisual]);

  const handleSearch = (searchId) => {
    setSelectedPokemonId(searchId);
  };
  
  const elegirPokemonAleatorio = () => {
    const idAleatorio = Math.floor(Math.random() * 898) + 1; // hasta el Pokémon 898
    setSelectedPokemonId(idAleatorio);
  };

  const [vistos, setVistos] = useState(() => {
    const almacenados = localStorage.getItem("pokemonsVistos");
    return almacenados ? JSON.parse(almacenados) : [];
  });
  
  useEffect(() => {
    if (selectedPokemonId && !vistos.includes(selectedPokemonId)) {
      const nuevos = [...vistos, selectedPokemonId];
      setVistos(nuevos);
      localStorage.setItem("pokemonsVistos", JSON.stringify(nuevos));
    }
  },[selectedPokemonId, vistos]);

    //Use para los logros, si no funciona me corcheo
    useEffect(() => {
      const nuevos = [];
    
      if (vistos.length >= 1) nuevos.push("primer-paso");
      if (vistos.length >= 10) nuevos.push("novato");
      if (vistos.length >= 100) nuevos.push("cazador-experto");
      if (favorites.length >= 10) nuevos.push("corazon");
    
      // Detectar nuevos logros desbloqueados
      const previos = JSON.parse(localStorage.getItem("logrosDesbloqueados") || "[]");
      const desbloqueadosRecientes = nuevos.filter((logro) => !previos.includes(logro));
    
      if (desbloqueadosRecientes.length > 0) {
        setLogroNuevo(desbloqueadosRecientes[0]); // Mostramos uno a la vez
        setTimeout(() => setLogroNuevo(null), 3500);
        localStorage.setItem("logrosDesbloqueados", JSON.stringify(nuevos));
      }
    
      setLogros(nuevos);
    }, [vistos, favorites]);

    const DETALLES_LOGROS = {
      "primer-paso": "🥇 Primer paso",
      "novato": "🔟 Novato",
      "cazador-experto": "🔥 Cazador experto",
      "corazon": "💖 Corazón de entrenador",
      "maestro-tipos": "🧠 Maestro de tipos",
    };
    

    return (
      <>
        {encendida ? (
          <div className="pantalla-inicial">
            <div className="texto-inicio">Iniciando Pokédex...</div>
          </div>
        ) : (
          <div className={`app-container ${darkMode ? "dark-mode" : ""} ${
            temaVisual === "tipo" ? `type-${pokemonType}` : `tema-${temaVisual}`
          }`}>
            <h1 className="pokedex-title">
              <img
                src={isFavorite ? "/ultraball.svg" : "/pokeball.svg"}
                alt="Pokébola"
                className={`pokeball-icon ${isFavorite ? "favorite-pulse" : ""}`}
              />
              <span className="typing-text">
                Pokédex by <span className="author-name">DaNiArI</span>
              </span>
            </h1>

            <Settings
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              limit={limit}
              setLimit={setLimit}
              onClearFavorites={() => setFavorites([])}
              temaVisual={temaVisual}
              setTemaVisual={setTemaVisual}
            />
    
            <SearchBar
              onSearch={handleSearch}
              elegirAleatorio={elegirPokemonAleatorio}
            />
    
            <div className="main-layout">
              
              <div className="left-panel">
                <PokemonList
                  onSelectPokemon={setSelectedPokemonId}
                  limit={limit}
                />
              </div>
    
              <div className="center-panel">
                <Pokemon
                  pokemonId={selectedPokemonId}
                  setPokemonId={setSelectedPokemonId}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  setPokemonType={setPokemonType}
                  temaVisual={temaVisual}
                />
              </div>
    
              <div className="right-panel">
                <Favorites
                  favorites={favorites}
                  onSelectPokemon={setSelectedPokemonId}
                  onClearFavorites={() => setFavorites([])}
                />
                <button className="btn-perfil" onClick={() => setPerfilAbierto(true)}>👤 Ver mi Perfil</button>
              </div>

              <TrainerProfile
                isOpen={perfilAbierto}
                onClose={() => setPerfilAbierto(false)}
                favorites={favorites}
                temaVisual={temaVisual}
                vistos={vistos}
                logros={logros}
              />
            </div>
            {logroNuevo && (
              <div className="toast-logro">
                🏆 ¡Nuevo logro desbloqueado! <strong>{DETALLES_LOGROS[logroNuevo]}</strong>
              </div>
            )}
          </div>
        )}
      </>
    );
};

export default App;