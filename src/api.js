// Vai buscar o pokemon digitado no input
export const searchPokemon = async (pokemon) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// Vai buscar a lista de pokemons
export const getPokemons = async (limit = 50, offset = 0) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// Vai buscar os dados um pokemon
export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
