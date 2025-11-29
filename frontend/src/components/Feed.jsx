// frontend/src/components/Feed.jsx
import { useEffect, useState } from "react";
import "../styles/global.css";
import { fetchNews } from "../api.js";
import ArticleCard from "./ArticleCard.jsx";
import ArticleOverlay from "./ArticleOverlay.jsx";

export default function Feed({ preferences }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeOverlay, setActiveOverlay] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchNews(preferences);
        if (!cancelled) {
          setArticles(res?.articles || res || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching news:", err);
          setError("Failed to load news.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      cancelled = true;
    };
  }, [preferences]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!articles.length) return <p>Nema članaka za zadane filtere.</p>;

  return (
    <div className="feed">
      <div className="feed-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article.id || article.link}
            article={article}
            onBulletHover={(idx) =>
              setActiveOverlay({ article, bulletIndex: idx })
            }
            onBulletLeave={() => setActiveOverlay(null)}
          />
        ))}
      </div>

      {activeOverlay && (
        <ArticleOverlay
          article={activeOverlay.article}
          bulletIndex={activeOverlay.bulletIndex}
          onClose={() => setActiveOverlay(null)}
        />
      )}
    </div>
  );
}
