import { Pagination } from "./Pagination";
import { Pokemon } from "./Pokemon";

export const Pokedex = (props) => {
  const { pokemons, loading, page, setPage, totalPages } = props;

  const onLeftClickHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const onRightClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <div>
      <header className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClickHandler}
          onRightClick={onRightClickHandler}
        />
      </header>
      {loading ? (
        <p>Carregando, segura fera...</p>
      ) : (
        <div className="pokedex-grid">
          {pokemons &&
            pokemons.map((pokemon, index) => (
              <Pokemon key={index} pokemon={pokemon} />
            ))}
        </div>
      )}
    </div>
  );
};
