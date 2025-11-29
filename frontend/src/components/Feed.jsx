import { useEffect, useMemo, useState } from "react";
import "../styles/global.css";
import { fetchNews } from "../api.js";
import ArticleCard from "./ArticleCard.jsx";
import ArticleOverlay from "./ArticleOverlay.jsx";
<<<<<<< Updated upstream
=======
import RiskBarometer from "./RiskBarometer";
>>>>>>> Stashed changes

function applyStrictnessFilter(articles, strictness) {
  if (!strictness) return articles;
  let minRisk = 0;
  if (strictness === "medium") minRisk = 30;
  if (strictness === "high") minRisk = 60;
  return articles.filter(
    (a) => typeof a.riskScore === "number" && a.riskScore >= minRisk
  );
}

function applyContentTypeFilter(articles, contentType) {
  if (!contentType || contentType === "all") return articles;

  const keywordGroups = {
    malware: ["malware", "rat", "trojan", "backdoor"],
    vulnerabilities: ["vulnerability", "vulnerabilities", "cve", "exploit"],
    policy: ["policy", "compliance", "regulation"],
    ai: ["artificial intelligence", "ai", "machine learning"],
    cybersecurity: ["cybersecurity", "security", "hacker", "threat"],
  };

  const keywords = keywordGroups[contentType];
  if (!keywords) return articles;

  return articles.filter((a) => {
    const text = `${a.title || ""} ${a.snippet || ""} ${a.cleanText || ""}`.toLowerCase();
    return keywords.some((k) => text.includes(k));
  });
}

function applySorting(articles, personalization) {
  const copy = [...articles];
  if (personalization === "risk") {
    return copy.sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));
  }
  if (personalization === "recency") {
    return copy.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }
  if (personalization === "popularity") {
    return copy.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
  return copy;
}

function buildGeoCounts(articles) {
  const counts = {};
  for (const a of articles) {
    const key = a.geo || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export default function Feed({ preferences }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNews(preferences);
        if (!cancelled) {
          setArticles(data.articles || data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error loading news:", err);
          setError("Failed to load news.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [preferences]);

  const filteredAndSorted = useMemo(() => {
    let result = applyStrictnessFilter(articles, preferences.strictness);
    result = applyContentTypeFilter(result, preferences.contentType);
    result = applySorting(result, preferences.mode || "risk");
    return result;
  }, [articles, preferences]);

  const geoCounts = useMemo(() => buildGeoCounts(filteredAndSorted), [filteredAndSorted]);

  if (loading) return <div className="feed-status">Loading news…</div>;
  if (error) return <div className="feed-status error">{error}</div>;
  if (!filteredAndSorted.length) return <div className="feed-status">Nema članaka za zadane filtere.</div>;

  return (
    <div className="feed-layout">
      <section className="feed-main">
<<<<<<< Updated upstream
=======
        {/* Risk barometer za filtrirane članke */}
        <RiskBarometer articles={filteredAndSorted} />

>>>>>>> Stashed changes
        <div className="feed-grid">
          {filteredAndSorted.map((article) => (
            <ArticleCard
              key={article.id || article.link}
              article={article}
              onOpenOverlay={() => setActiveArticle(article)}
            />
          ))}
        </div>
      </section>

      {preferences.heatmap && (
        <aside className="feed-sidebar">
        <aside className="feed-sidebar" aria-label="Geo activity sidebar">
          <h3>Geo activity</h3>
          <ul className="geo-list">
            {Object.entries(geoCounts).map(([country, count]) => (
              <li key={country}>
                <span>{country}</span>
                <span className="geo-count">{count}</span>
              </li>
            ))}
          </ul>
          <p className="geo-hint">
<<<<<<< Updated upstream
            * Approximate geo extracted by AI. Used for rough “heatmap” of where
            incidents happen.
=======
            * Approximate geo extracted by AI. Used for rough “heatmap” of where incidents happen.
>>>>>>> Stashed changes
          </p>
        </aside>
      )}

      {activeArticle && (
<<<<<<< Updated upstream
        <ArticleOverlay
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
        />
=======
        <ArticleOverlay article={activeArticle} onClose={() => setActiveArticle(null)} />
>>>>>>> Stashed changes
      )}
    </div>
  );
}
