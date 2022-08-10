import { createContext } from "react";

export const FavoriteContext = createContext({
  favoritesPokemons: [],
  updateFavoritePokemons: (id) => null,
});

export const FavoriteProvider = FavoriteContext.Provider;
