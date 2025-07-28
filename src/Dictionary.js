import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);

  function handleDictionaryResponse(response) {
    const wordData = response.data[0];
    setResults({
      word: wordData.word,
      phonetic: wordData.phonetic,
      meanings: wordData.meanings
    });

    // Get audio URL (if available)
    const audio = wordData.phonetics?.find(
      (item) => item.audio && item.audio !== ""
    );
    setAudioUrl(audio?.audio || null);
  }

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  function search(event) {
    event.preventDefault();

    // 📘 Dictionary API
    const dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios
      .get(dictionaryApiUrl)
      .then(handleDictionaryResponse)
      .catch((error) => {
        console.error("Dictionary API error:", error.message);
      });

    // 📸 Pexels API
    const pexelsApiKey = "uOGK1BU3SckmYVPjjU8iySbEYl56jXWTQilIKNSOZieuKdRB6ka4GOA3";
    const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;

    axios
      .get(pexelsApiUrl, {
        headers: { Authorization: pexelsApiKey }
      })
      .then(handlePexelsResponse)
      .catch((error) => {
        console.error("Pexels API error:", error.message);
      });
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <section>
        <form onSubmit={search} className="search-form">
          <input
            type="search"
            placeholder="Search for a word"
            onChange={handleKeywordChange}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </section>

      {results && (
        <Results
          results={results}
          audioUrl={audioUrl}
          keyword={keyword}
          photos={photos}
        />
      )}
    </div>
  );
}