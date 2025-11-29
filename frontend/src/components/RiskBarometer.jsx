// frontend/src/components/RiskBarometer.jsx

import React from "react";

function clampRisk(v) {
  if (v == null || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

function getLevel(avg) {
  if (avg < 35) return { label: "Low", description: "Mostly low-risk incidents.", color: "#16a34a" };
  if (avg < 70) return { label: "Elevated", description: "Mix of medium and high-risk incidents.", color: "#eab308" };
  return { label: "Severe", description: "Feed is dominated by high-risk incidents.", color: "#ef4444" };
}

export default function RiskBarometer({ articles = [] }) {
  const scores = articles
    .map((a) => a.riskScore)
    .filter((n) => typeof n === "number" && !Number.isNaN(n));

  if (scores.length === 0) {
    return (
      <section className="risk-barometer-card">
        <header className="risk-barometer-header">
          <h2>Today&apos;s risk barometer</h2>
          <span className="risk-barometer-tag">No data</span>
        </header>
        <p className="risk-barometer-empty">
          We don&apos;t have enough analyzed incidents to calculate today&apos;s barometer.
        </p>
      </section>
    );
  }

  const avgRaw = scores.reduce((s, v) => s + v, 0) / scores.length;
  const avg = clampRisk(Math.round(avgRaw));
  const max = clampRisk(Math.max(...scores));
  const level = getLevel(avg);

  // map 0–100 → angle from -120° to +120°
  const MIN_ANGLE = -120;
  const MAX_ANGLE = 120;
  const angle = MIN_ANGLE + (avg / 100) * (MAX_ANGLE - MIN_ANGLE);
  const rad = (angle * Math.PI) / 180;

  const cx = 60;
  const cy = 60;
  const r = 40;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);

  return (
    <section className="risk-barometer-card">
      <header className="risk-barometer-header">
        <h2>Today&apos;s risk barometer</h2>
        <span className="risk-barometer-tag">{level.label}</span>
      </header>

      <div className="risk-barometer-content">
        {/* Gauge */}
        <div className="risk-barometer-gauge">
          <svg viewBox="0 0 120 70">
            <defs>
              <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            {/* background arc */}
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="none"
              stroke="rgba(148,163,184,0.4)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* colored arc */}
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="none"
              stroke="url(#riskGradient)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* ticks */}
            {[0, 25, 50, 75, 100].map((v) => {
              const a = MIN_ANGLE + (v / 100) * (MAX_ANGLE - MIN_ANGLE);
              const rTick = 46;
              const rTickInner = 41;
              const radTick = (a * Math.PI) / 180;
              const x1 = cx + rTickInner * Math.cos(radTick);
              const y1 = cy + rTickInner * Math.sin(radTick);
              const x2 = cx + rTick * Math.cos(radTick);
              const y2 = cy + rTick * Math.sin(radTick);
              return (
                <line
                  key={v}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(148,163,184,0.8)"
                  strokeWidth={v === 50 ? 1.8 : 1.2}
                />
              );
            })}

            {/* needle */}
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={level.color}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* needle center */}
            <circle cx={cx} cy={cy} r="4" fill="#0f172a" stroke={level.color} strokeWidth="2" />
          </svg>

          <div className="risk-barometer-scale-labels">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        {/* Text + numbers */}
        <div className="risk-barometer-info">
          <div className="risk-barometer-main">
            <span className="risk-barometer-main-value">{avg}</span>
            <span className="risk-barometer-main-unit">/100</span>
          </div>
          <p className="risk-barometer-description">{level.description}</p>
          <div className="risk-barometer-secondaries">
            <div>
              <span className="risk-barometer-label">Highest risk in feed</span>
              <span className="risk-barometer-value">{max}/100</span>
            </div>
            <div>
              <span className="risk-barometer-label">Incidents analyzed</span>
              <span className="risk-barometer-value">{scores.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
