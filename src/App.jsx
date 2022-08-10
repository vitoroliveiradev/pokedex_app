import "./App.css";

import { useState, useEffect } from "react";

import { Navbar } from "./components/Navbar";
import { Pokedex } from "./components/Pokedex";
import { SearchBar } from "./components/SearchBar";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoriteProvider } from "./context/FavoritesContext";

const favoritesKey = "favoritePokemons";
export const App = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const itensPerPage = 27;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promisses = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promisses);

      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (err) {
      console.log(`fetchPokemons error: ${err}`);
    }
  };

  const loadFavoritesPokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey));
    setFavorites(pokemons || []);
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  useEffect(() => {
    loadFavoritesPokemons();
  }, []);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);

    if (favoriteIndex >= 0) {
      updatedFavorites.slice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }

    setFavorites(updatedFavorites);
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);

    if (!result) {
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritesPokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar />
        <SearchBar onSearch={onSearchHandler} />
        {notFound ? (
          <div className="not-found-text">Meteu essa ?!</div>
        ) : (
          <Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </FavoriteProvider>
  );
};
