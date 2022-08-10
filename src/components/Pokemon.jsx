import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";

export const Pokemon = (props) => {
  const { pokemon } = props;
  const { favoritesPokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  const heart = favoritesPokemons.includes(pokemon.name) ? "💖" : "🖤";

  return (
    <div className="pokemon-card">
      <div className="pokemon-image-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h1>{pokemon.name}</h1>
          <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, index) => (
              <div key={index} className="pokemon-type-text">
                {type.type.name}
              </div>
            ))}
          </div>
          <button
            className="pokemon-heart-btn"
            onClick={() => updateFavoritePokemons(pokemon.name)}
          >
            {heart}
          </button>
        </div>
      </div>
    </div>
  );
};
