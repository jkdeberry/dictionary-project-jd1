import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({});
  const [audioUrl, setAudioUrl] = useState(null);

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function handleSheCodesResponse(response) {
    setResults(response.data);
  }

  function handleFreeDictionaryResponse(response) {
    const audio = response.data[0]?.phonetics?.find(p => p.audio);
    setAudioUrl(audio?.audio || null);
  }

  function search(event) {
  event.preventDefault();
  const word = keyword;

  // SheCodes Dictionary API for definitions
  const sheCodesApiKey = "4e2df5aotaa983694533f2b4440ef095";
  const sheCodesApiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${sheCodesApiKey}`;
  axios.get(sheCodesApiUrl).then(handleSheCodesResponse);

  // Free Dictionary API for audio
  const freeDictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  axios
    .get(freeDictionaryUrl)
    .then(handleFreeDictionaryResponse)
    .catch((error) => {
      console.error("Free Dictionary API error:", error.message);
      setAudioUrl(null); // fallback in case audio not found
    });

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

      <Results results={results} audioUrl={audioUrl} keyword={keyword} />
    </div>
  );
}
