import React from "react";
import Meaning from "./Meaning";
import "./Results.css";

export default function Results({ results, audioUrl, keyword, photos }) {
  if (!results || !results.word) return null;

  const phoneticText = results.phonetic || results.phonetics?.[0]?.text || "";

  // ✅ Group definitions by part of speech
  function groupMeaningsByPartOfSpeech(meanings) {
    const grouped = {};

    meanings.forEach((item) => {
      const pos = item.partOfSpeech;

      if (!grouped[pos]) {
        grouped[pos] = {
          partOfSpeech: pos,
          definitions: []
        };
      }

      // Dig into each inner definition
      item.definitions.forEach((def) => {
        grouped[pos].definitions.push({
          definition: def.definition,
          example: def.example,
          synonyms: def.synonyms || [],
          antonyms: def.antonyms || []
        });
      });
    });

    return Object.values(grouped);
  }

  const groupedMeanings = groupMeaningsByPartOfSpeech(results.meanings);

  return (
    <div className="Results">
      <div className="TopBox">
        <h2>{results.word}</h2>

        {(phoneticText || audioUrl) && (
          <div className="phonetic-audio">
            {phoneticText && <span className="phonetic">/{phoneticText}/</span>}
            {audioUrl && (
              <audio controls className="audio-player">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        )}
      </div>

      
      {groupedMeanings.map((group, index) => (
        <Meaning
          key={index}
          partOfSpeech={group.partOfSpeech}
          definitions={group.definitions}
        />
      ))}

      
      {photos && photos.length > 0 && (
        <div className="PhotoSection">
          <h4 className="PhotoGalleryTitle">Images of “{keyword}”</h4>
          <div className="PhotoGallery">
            {photos.slice(0, 6).map((photo, index) => (
              <div className="PhotoWrapper" key={index}>
                <img
                  src={photo.src.medium}
                  alt={photo.alt || keyword}
                  className="PhotoItem"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}