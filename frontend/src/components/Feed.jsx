// frontend/src/components/Feed.jsx
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ArticleOverlay from "./ArticleOverlay";

export default function Feed({ preferences, onBack }) {
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    // Za sada dohvaćamo mock podatke sa backend rute /api/news
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, [preferences]);

  return (
    <div className="feed-page">
      <header className="feed-header">
        <button onClick={onBack}>← Back</button>
        <h2>Your Feed</h2>
      </header>

      <div className="feed-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onShowOverlay={setActiveArticle}
          />
        ))}
      </div>

      {/* Popup overlay */}
      <ArticleOverlay
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </div>
  );
}
