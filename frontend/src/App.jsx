// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import "./styles/global.css";
import FilterForm from "./components/FilterForm.jsx";
import Feed from "./components/Feed.jsx";

function LadybugSplash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2600);
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

export default function App() {
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
        <h1 className="app-title">SECURE NEWS FEED</h1>
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

      {!preferences ? (
        // SAMO forma – centrirana kartica
        <main className="onboarding-layout">
          <FilterForm onSubmit={setPreferences} />
        </main>
      ) : (
        // Nakon submit – cijeli ekran zauzima Feed (unutra već ima grid + heatmap sidebar)
        <main className="feed-page">
          <Feed preferences={preferences} />
        </main>
      )}
    </div>
  );
}
