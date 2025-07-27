import React from "react";

export default function Meaning({ meaning }) {
  if (!meaning) return null;

  return (
    <div className="Meaning">
      <h3>{meaning.partOfSpeech}</h3>
      <p>
        <strong>Definition:</strong>{meaning.definition}
      </p>
    </div>
  );
}