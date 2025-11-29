// frontend/src/components/Feed.jsx
import { useEffect, useState } from "react";
import "../App.css"; // ili "./../styles/global.css" ako koristiš global.css
import { fetchNews } from "../api";

function Feed({ preferences }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNews(preferences);
        if (!cancelled) {
          setArticles(data.articles || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load news");
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

  if (loading) {
    return <p>Loading feed...</p>;
  }

  if (error) {
    return <p>Greška: {error}</p>;
  }

  if (!articles.length) {
    return <p>Nema članaka za zadane filtere.</p>;
  }

  return (
    <section>
      <h2>Feed</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id || article.link}>
            {article.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Feed;
