import { useState } from "react";
import "../styles/global.css";
import Dropdown from "./Dropdown.jsx";


const INTEREST_OPTIONS = [
  "vulnerabilities",
  "malware",
  "data-breaches",
  "cloud-security",
  "ai-security",
  "privacy",
];

const CONTENT_TYPE_OPTIONS = [
  { value: "all", label: "All articles" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "ai", label: "AI" },
  { value: "vulnerabilities", label: "Vulnerabilities" },
];

const MODE_OPTIONS = [
  { value: "risk", label: "Risk focus" },
  { value: "popularity", label: "Popularity" },
  { value: "relevance", label: "AI relevance" },
];

function FilterForm({ onSubmit }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [strictness, setStrictness] = useState("medium");
  const [contentType, setContentType] = useState("all");
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
      mode,
    };

    onSubmit(prefs);
  };

  return (
    <section className="filter-screen">
      <h2 className="filter-title">Customize your feed</h2>
      <p className="filter-subtitle">
        Choose topics and how to filter the news. You can always change this
        later.
      </p>

      <form className="filter-form" onSubmit={handleSubmit}>
        {/* Interests */}
        <div className="filter-group">
          <h3 className="filter-group-title">Interests</h3>
          <div className="filter-chips">
            {INTEREST_OPTIONS.map((interest) => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  className={active ? "chip chip-active" : "chip"}
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

        {/* Content type — CUSTOM DROPDOWN */}
        <div className="filter-group">
          <h3 className="filter-group-title">Content type</h3>
          <Dropdown
            value={contentType}
            options={CONTENT_TYPE_OPTIONS}
            onChange={(val) => setContentType(val)}
          />
        </div>

        {/* Mode — CUSTOM DROPDOWN */}
        <div className="filter-group">
          <h3 className="filter-group-title">Mode</h3>
          <Dropdown
            value={mode}
            options={MODE_OPTIONS}
            onChange={(val) => setMode(val)}
          />
        </div>

        <div className="filter-actions">
          <button type="submit" className="primary-btn">
            Generate feed
          </button>
        </div>
      </form>
    </section>
  );
}

export default FilterForm;