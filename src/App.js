import React from "react";
import "./App.css";
import Dictionary from "./Dictionary";


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>DeBerry's Dictionary App</h2>
      </header>
      <main>
        <Dictionary />
      </main>
      <footer className="AppFooter">
        <p>
          This was coded by{" "}
          <a
            href="https://github.com/jkdeberry"
            target="_blank"
            rel="noreferrer"
          >
            <strong>Jeanine DeBerry</strong>
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/jkdeberry/dictionary-project-jd1"
            target="_blank"
            rel="noreferrer"
          >
          open-sourced on GitHub
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://dictionary-project-jd1.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
          Netlify
          </a>
          .
          </p>
      </footer>
    </div>
  );
}