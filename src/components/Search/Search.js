import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>

    <div>
      <input
        placeholder="search"
        onChange={(e) => makeSearch(e.target.value)}
        ></input>
      <button onClick={renderSearchResult}>Search</button>
    </div>

    <div>

    </div>

    </div>
  );
}
