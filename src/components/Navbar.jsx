import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";

export const Navbar = () => {
  const { favoritesPokemons } = useContext(FavoriteContext);

  let logoImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <nav>
      <div>
        <img src={logoImg} alt="pokeapi-log" className="navbar-img" />
      </div>
      <div>
        <div>💖 {favoritesPokemons.length}</div>
      </div>
    </nav>
  );
};
