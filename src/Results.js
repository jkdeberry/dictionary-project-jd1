import React from "react";
import Meaning from "./Meaning";
import "./Results.css"

export default function Results({ results, audioUrl, keyword }) {
  if (!results || !results.word) return null;

  const phoneticText = results.phonetic || results.phonetics?.[0].text || "";

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
      {results.meanings.map(function (meaning, index) {
        return <Meaning meaning={meaning} key={index} />
      })}
    </div>
  );
}