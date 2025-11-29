import { useEffect, useState } from "react";
import "./styles/global.css";
import FilterForm from "./components/FilterForm.jsx";
import Feed from "./components/Feed.jsx";

function LadybugSplash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2600); // trajanje animacije u ms, sinkronizirano s CSS-om
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-root">
      <div className="splash-bg-glow" />
      <div className="ladybug-track">
        <div className="ladybug" />
      </div>
      <p className="splash-text">Loading your secure feed...</p>
    </div>
  );
}

function App() {
  const [preferences, setPreferences] = useState(null);
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <LadybugSplash onFinish={() => setSplashDone(true)} />;
  }

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
