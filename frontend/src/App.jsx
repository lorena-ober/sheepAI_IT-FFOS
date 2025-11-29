import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

import "./styles/global.css";
import FilterForm from "./components/FilterForm.jsx";
import Feed from "./components/Feed.jsx";

// Splash ekran s bubamarom
function LadybugSplash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2600); // trajanje splash animacije

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-root">
      <div className="splash-bg-glow" />
      <div className="ladybug-track">
        <div className="ladybug" />
      </div>
      <p className="splash-text">Loading your secure feed.</p>
    </div>
  );
}

export default function App() {
  const [preferences, setPreferences] = useState(null);
  const [splashDone, setSplashDone] = useState(false);


  // VANTA.NET pozadina
  const vantaRef = useRef(null);

  useEffect(() => {
    // ne pokreći Vantu dok je splash aktivan
    if (!splashDone) return;
    if (!vantaRef.current) return;

    const effect = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,

      // 🎨 BOJE – fintech / iOS look
      backgroundColor: 0x050617, // #050617 tamna plavo-ljubičasta
      color: 0x22d3ee,           // #22D3EE cyan linije
      showDots: true,

      // mekši network pattern
      points: 11.0,
      maxDistance: 23.0,
      spacing: 18.0,
    });

    // cleanup
    return () => {
      effect.destroy();
    };
  }, [splashDone]);

  // dok splash traje
  if (!splashDone) {
    return <LadybugSplash onFinish={() => setSplashDone(true)} />;
  }

  const handleResetPreferences = () => {
    setPreferences(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={vantaRef} className="vanta-container">
      <div className="app-root">


        <header className="app-header">
          <h1 className="app-title">TECH BRIEF</h1>
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
            <Feed
              preferences={preferences}
              onBack={handleResetPreferences}
            />
          )}
        </main>
      </div>
    </div>
  );
}
