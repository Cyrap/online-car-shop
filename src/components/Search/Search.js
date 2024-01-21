import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css"
export default function Search() {
  const [data, setData] = useState("");
  console.log(data);
  const navigate = useNavigate();

  const makeSearch = (e) => {
    setData(e);
  };
  const renderSearchResult = () => {
    navigate(`/searchResult/${data}`);
  };

  return (
    <div className={styles.searchContainer}>
    <div>
      <input
        className={styles.searchInput}
        placeholder="search"
        onChange={(e) => makeSearch(e.target.value)}
        ></input>
        <button className={styles.button}>all</button>
      <button
      className={styles.searchButton}
      onClick={renderSearchResult}>Search
      </button>
    </div>
    <div>

    </div>

    </div>
  );
}
