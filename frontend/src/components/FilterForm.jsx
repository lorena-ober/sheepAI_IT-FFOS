import { useState } from "react";

const INTEREST_OPTIONS = [
  "vulnerabilities",
  "malware",
  "data-breaches",
  "cloud-security",
  "ai-security",
  "privacy",
  "policy",
  "cryptography",
  "zero-day",
  "ransomware",
];

const CONTENT_TYPE_OPTIONS = [
  { value: "all", label: "Svi članci" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "ai", label: "AI" },
  { value: "vulnerabilities", label: "Vulnerabilities" },
  { value: "malware", label: "Malware" },
  { value: "policy", label: "Policy" },
  { value: "ransomware", label: "Ransomware" },
];

const MODE_OPTIONS = [
  { value: "risk", label: "Risk fokus" },
  { value: "popularity", label: "Popularnost" },
  { value: "relevance", label: "AI relevantnost" },
  { value: "recency", label: "Najnovije" },
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
    <section className="filter-screen" aria-label="Filter preferences form">
      <h2 className="filter-title">Prilagodi svoj feed</h2>
      <p className="filter-subtitle">
        Odaberi teme i način filtriranja vijesti. Kasnije ih uvijek možeš promijeniti.
      </p>

      <form className="filter-form" onSubmit={handleSubmit}>
        {/* Interests */}
        <div className="filter-group" role="region" aria-labelledby="interests-label">
          <h3 id="interests-label" className="filter-group-title">Interesi</h3>
          <div className="filter-chips">
            {INTEREST_OPTIONS.map((interest) => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  className={active ? "chip chip-active" : "chip"}
                  onClick={() => toggleInterest(interest)}
                  aria-pressed={active}
                >
                  {interest}
                  {active && <span className="chip-x" aria-hidden="true">×</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Strictness */}
        <div className="filter-group" role="radiogroup" aria-labelledby="strictness-label">
          <h3 id="strictness-label" className="filter-group-title">Strictness</h3>
          <div className="filter-strictness">
            {["low", "medium", "high"].map((level) => (
              <label key={level} className="radio-pill">
                <input
                  type="radio"
                  name="strictness"
                  value={level}
                  checked={strictness === level}
                  onChange={(e) => setStrictness(e.target.value)}
                />
                <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Content type */}
        <div className="filter-group">
          <h3 className="filter-group-title" htmlFor="content-type-select">Content type</h3>
          <select
            id="content-type-select"
            className="filter-select"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            aria-label="Content type selector"
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
          <h3 className="filter-group-title" htmlFor="mode-select">Mode</h3>
          <select
            id="mode-select"
            className="filter-select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            aria-label="Personalization mode selector"
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
          <label className="toggle" htmlFor="heatmap-toggle">
            <input
              type="checkbox"
              id="heatmap-toggle"
              checked={heatmapEnabled}
              onChange={(e) => setHeatmapEnabled(e.target.checked)}
            />
            <span className="toggle-slider" aria-hidden="true" />
            <span className="toggle-label">Prikaži heatmapu</span>
          </label>
        </div>

        {/* Submit */}
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
