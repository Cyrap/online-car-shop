import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";

export default function Search() {
  const [data, setData] = useState("");
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();

  if(inputError == true){
    setTimeout(() => {
      setInputError(false)
    }, 1500);
  }
  const makeSearch = (e) => {
    setData(e);
    setInputError(false); 
    };

  const renderSearchResult = () => {
    if (data.length > 0) {
      navigate(`/searchResult/${data}`);
    } else {
      setInputError(true);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div>
        <input
          id="searchInput"
          className={`${styles.searchInput} ${inputError ? styles.error : ""}`}
          placeholder="search"
          onChange={(e) => makeSearch(e.target.value)}
        ></input>
        {/* <button className={styles.button}>all</button> */}
        <button
          className={styles.searchButton}
          onClick={renderSearchResult}
        >
          Search
        </button>
      </div>
      <div></div>
    </div>
  );
}
