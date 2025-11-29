// src/components/RiskBarometer.jsx

function computeBarometer(articles) {
  const withRisk = articles.filter(
    (a) => typeof a.riskScore === "number" && !Number.isNaN(a.riskScore)
  );
  if (withRisk.length === 0) {
    return {
      avg: 0,
      max: 0,
      label: "No data",
      description: "No risk-scored articles in the current view.",
      level: "none",
    };
  }

  const sum = withRisk.reduce((acc, a) => acc + a.riskScore, 0);
  const avg = Math.round(sum / withRisk.length);
  const max = Math.max(...withRisk.map((a) => a.riskScore));

  let label = "Low";
  let description = "Mostly low-severity stories.";
  let level = "low";

  if (avg >= 70) {
    label = "Severe";
    description = "Feed is dominated by high-risk incidents.";
    level = "high";
  } else if (avg >= 40) {
    label = "Elevated";
    description = "Mix of medium and high-risk incidents.";
    level = "medium";
  }

  return { avg, max, label, description, level };
}

export default function RiskBarometer({ articles }) {
  const { avg, max, label, description, level } = computeBarometer(articles);

  const percent = Math.min(Math.max(avg, 0), 100); // clamp 0–100

  return (
    <section className="barometer">
      <div className="barometer-header">
        <span className="barometer-label">Today’s risk barometer</span>
        <span className={`barometer-level barometer-${level}`}>
          {label} · {avg || 0}/100
        </span>
      </div>

      <div className="barometer-bar-wrapper">
        <div className="barometer-bar">
          <div
            className={`barometer-bar-fill barometer-${level}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="barometer-scale">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      <p className="barometer-description">{description}</p>
      {max > 0 && (
        <p className="barometer-meta">
          Highest risk article in view: <strong>{max}/100</strong>
        </p>
      )}
    </section>
  );
}
