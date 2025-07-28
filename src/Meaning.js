import React from "react";
import Synonyms from "./Synonyms";
import "./Meaning.css";

export default function Meaning({ partOfSpeech, definitions }) {
  console.log("Loaded definitions for", partOfSpeech, definitions);
  if (!definitions || definitions.length === 0) return null;

  const allSynonyms = Array.from(
    new Set(
      definitions.flatMap((def) => def.synonyms || []).filter(Boolean)
    )
  );

  const allAntonyms = Array.from(
    new Set(
      definitions.flatMap((def) => def.antonyms || []).filter(Boolean)
    )
  );

  return (
    <div className="MeaningSection">
      <h3>{partOfSpeech}</h3>

      {definitions.map((definition, index) => (
        <div className="DefinitionBlock" key={index}>
          <p>
            <strong>Definition:</strong> {definition.definition}
          </p>

          {definition.example && (
            <p>
              <em>Example:</em> "{definition.example}"
            </p>
          )}
        </div>
      ))}

      {allSynonyms.length > 0 && (
        <div className="SynonymsBlock">
          <p>
            <strong>Synonyms:</strong> <Synonyms synonyms={allSynonyms} />
          </p>
        </div>
      )}

      {allAntonyms.length > 0 && (
        <div className="SynonymsBlock">
          <p>
            <strong>Antonyms:</strong> <Synonyms synonyms={allAntonyms} />
          </p>
        </div>
      )}
    </div>
  );
}