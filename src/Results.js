import React from "react";
import Meaning from "./Meaning";

export default function Results ({ results })  {
  if (!results.word) return null;

  return (
    <div className="Results">
      <h2>{results.word}</h2>
      {results.meanings && <Meaning meaning={results.meanings[0]} />}
    </div>
  );
}