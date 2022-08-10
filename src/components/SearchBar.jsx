import { useState } from "react";

export const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const { onSearch } = props;

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(undefined);
    }
  };
  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Buscar pokemon"
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="searchbar-btn">
        <button onClick={() => onSearch(search)}>Buscar</button>
      </div>
    </div>
  );
};
