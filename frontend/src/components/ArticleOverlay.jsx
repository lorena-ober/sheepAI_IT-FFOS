// frontend/src/components/ArticleOverlay.jsx
export default function ArticleOverlay({ article, onClose }) {
  if (!article) return null; // ne prikazuj ništa ako nema aktivnog članka

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-card"
        onClick={(e) => e.stopPropagation()} // da klik unutra ne zatvori overlay
      >
        <button className="overlay-close" onClick={onClose}>
          ×
        </button>

        <h2 className="overlay-title">{article.title}</h2>

        <section className="overlay-section">
          <h4>Sažetak (prošireni)</h4>
          <p>{article.extendedSummary}</p>
        </section>

        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="overlay-link"
        >
          Otvori originalni članak →
        </a>
      </div>
    </div>
  );
}
