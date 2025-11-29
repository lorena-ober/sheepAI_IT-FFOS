import { useState } from "react";
import "./App.css";
import FilterForm from "./components/FilterForm.jsx";
import Feed from "./components/Feed.jsx";


function App() {
  const [preferences, setPreferences] = useState(null);

  const handleResetPreferences = () => {
    setPreferences(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Naziv stranice</h1>
        {preferences && (
          <button
            type="button"
            className="app-reset-btn"
            onClick={handleResetPreferences}
          >
            Promijeni filtere
          </button>
        )}
      </header>

      <main className="app-main">
        {!preferences ? (
          <FilterForm onSubmit={setPreferences} />
        ) : (
          <Feed preferences={preferences} />
        )}
      </main>
    </div>
  );
}

export default App;
