// frontend/src/components/Heatmap.jsx
import { memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import worldGeo from "../data/countries.geo.json";

/**
 * Očekuje props:
 * - articles: [{ geo: "US" | "DE" | null, riskScore: number | null, ... }]
 *   gdje je geo ISO3166-1-Alpha-2 kod (2 slova).
 */
function Heatmap({ articles = [] }) {
  // 1) Agregiraj prosječni risk po 'geo' polju
  const countryRisk = useMemo(() => {
    const map = new Map();

    for (const article of articles) {
      const codeOrName = article.geo;
      const risk =
        typeof article.riskScore === "number" ? article.riskScore : null;

      if (!codeOrName || risk == null) continue;

      const key = String(codeOrName).toUpperCase();

      const existing = map.get(key) || { sum: 0, count: 0 };
      existing.sum += risk;
      existing.count += 1;
      map.set(key, existing);
    }

    const result = {};
    map.forEach((value, key) => {
      result[key] = value.sum / value.count;
    });
    return result;
  }, [articles]);

  // 2) Scale za boje (0–100 risk -> svijetlo → tamno)
  const colorScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, 30, 70, 100])
        .range(["#d1fae5", "#fde68a", "#f97316", "#b91c1c"]),
    []
  );

  // 3) Odredi boju i tooltip za svaku državu iz GeoJSON-a
  function getCountryFill(geoProps) {
    const isoA2 =
      geoProps["ISO3166-1-Alpha-2"] ||
      geoProps.iso_a2 ||
      geoProps.ISO_A2 ||
      "";
    const name = geoProps.name || "";

    const key = (isoA2 || name).toUpperCase();
    const avgRisk = countryRisk[key];

    if (avgRisk == null) {
      return {
        fill: "#f3f4f6",
        tooltip: `${name || isoA2 || "Unknown"} – no data`
      };
    }

    return {
      fill: colorScale(avgRisk),
      tooltip: `${name || isoA2}: avg risk ${avgRisk.toFixed(0)}/100`
    };
  }

  return (
    <section className="heatmap-section">
      <header className="heatmap-header">
        <h2 className="heatmap-title">Global risk heatmap</h2>
        <p className="heatmap-subtitle">
          Prosječni risk score po zemlji na temelju trenutnih članaka.
        </p>
      </header>

      <div className="heatmap-map-wrapper">
        <ComposableMap
          projectionConfig={{ scale: 150 }}
          className="heatmap-map"
        >
          <Geographies geography={worldGeo}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { fill, tooltip } = getCountryFill(
                  geo.properties || {}
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", opacity: 0.9, cursor: "pointer" },
                      pressed: { outline: "none", opacity: 0.8 }
                    }}
                    title={tooltip}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Low risk</span>
        <span className="heatmap-legend-gradient" />
        <span className="heatmap-legend-label">High risk</span>
      </div>
    </section>
  );
}

export default memo(Heatmap);
