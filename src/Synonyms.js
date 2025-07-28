import React from "react";
import "./Synonyms.css";

export default function Synonyms({ synonyms }) {
  if (!synonyms || synonyms.length === 0) return null;

  return (
    <ul className="SynonymList">
      {synonyms.map((synonym, index) => (
        <li key={index}>{synonym}</li>
      ))}
    </ul>
  );
}
