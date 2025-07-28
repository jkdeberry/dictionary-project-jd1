import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({});

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function handleSheCodesResponse(response) {
    setResults(response.data);
  }

  function search(event) {
  event.preventDefault();
  const word = keyword;

  // SheCodes Dictionary API for definitions
  const sheCodesApiKey = "4e2df5aotaa983694533f2b4440ef095";
  const sheCodesApiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${sheCodesApiKey}`;
  axios.get(sheCodesApiUrl).then(handleSheCodesResponse);
}

  return (
    <div className="Dictionary">
      <h1>DeBerry's Dictionary App</h1>
      <section>
        <form onSubmit={search} className="search-form">
          <input
            type="search"
            name="keyword"
            placeholder="Enter a word..."
            onChange={handleKeywordChange}
            value={keyword}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <Results results={results} />
    </div>
  );
}
