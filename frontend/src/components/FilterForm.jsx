import { useState } from "react";
import "../styles/global.css";

const INTEREST_OPTIONS = [
  "vulnerabilities",
  "malware",
  "data-breaches",
  "cloud-security",
  "ai-security",
  "privacy",
];

const CONTENT_TYPE_OPTIONS = [
  { value: "all", label: "Svi članci" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "ai", label: "AI" },
  { value: "vulnerabilities", label: "Vulnerabilities" },
];

const MODE_OPTIONS = [
  { value: "risk", label: "Risk fokus" },
  { value: "popularity", label: "Popularnost" },
  { value: "relevance", label: "AI relevantnost" },
];

function FilterForm({ onSubmit }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [strictness, setStrictness] = useState("medium");
  const [contentType, setContentType] = useState("all");
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [mode, setMode] = useState("risk");

  const toggleInterest = (value) => {
    setSelectedInterests((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const prefs = {
      interests: selectedInterests,
      strictness,
      contentType,
      heatmap: heatmapEnabled,
      mode,
    };

    onSubmit(prefs);
  };

  return (
    <section className="filter-screen">
      <h2 className="filter-title">Prilagodi svoj feed</h2>
      <p className="filter-subtitle">
        Odaberi teme i način filtriranja vijesti. Kasnije ih uvijek možeš
        promijeniti.
      </p>

      <form className="filter-form" onSubmit={handleSubmit}>
        {/* Interests */}
        <div className="filter-group">
          <h3 className="filter-group-title">Interesi</h3>
          <div className="filter-chips">
            {INTEREST_OPTIONS.map((interest) => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  className={
                    active
                      ? "chip chip-active"
                      : "chip"
                  }
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                  {active && <span className="chip-x">×</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Strictness */}
        <div className="filter-group">
          <h3 className="filter-group-title">Strictness</h3>
          <div className="filter-strictness">
            <label className="radio-pill">
              <input
                type="radio"
                name="strictness"
                value="low"
                checked={strictness === "low"}
                onChange={(e) => setStrictness(e.target.value)}
              />
              <span>Low</span>
            </label>
            <label className="radio-pill">
              <input
                type="radio"
                name="strictness"
                value="medium"
                checked={strictness === "medium"}
                onChange={(e) => setStrictness(e.target.value)}
              />
              <span>Medium</span>
            </label>
            <label className="radio-pill">
              <input
                type="radio"
                name="strictness"
                value="high"
                checked={strictness === "high"}
                onChange={(e) => setStrictness(e.target.value)}
              />
              <span>High</span>
            </label>
          </div>
        </div>

        {/* Content type */}
        <div className="filter-group">
          <h3 className="filter-group-title">Content type</h3>
          <select
            className="filter-select"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            {CONTENT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mode */}
        <div className="filter-group">
          <h3 className="filter-group-title">Mode</h3>
          <select
            className="filter-select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            {MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Heatmap toggle */}
        <div className="filter-group filter-heatmap">
          <label className="toggle">
            <input
              type="checkbox"
              checked={heatmapEnabled}
              onChange={(e) => setHeatmapEnabled(e.target.checked)}
            />
            <span className="toggle-slider" />
            <span className="toggle-label">Prikaži heatmapu</span>
          </label>
        </div>

        <div className="filter-actions">
          <button type="submit" className="primary-btn">
            Generiraj feed
          </button>
        </div>
      </form>
    </section>
  );
}

export default FilterForm;
