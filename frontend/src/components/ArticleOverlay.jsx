// frontend/src/components/ArticleOverlay.jsx

export default function ArticleOverlay({ article, onClose }) {
  const {
    title = "No title available",
    extendedSummary = "",
    riskScore,
    integrityLabel,
    integrityConfidence,
    geo,
    link = "#",
    source,
  } = article || {};

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-card"
        onClick={(e) => e.stopPropagation()} // spriječi zatvaranje pri kliku unutar carda
      >
        <button className="overlay-close" type="button" onClick={onClose}>
          ✕
        </button>

        <header className="overlay-header">
          <h2 className="overlay-title">{title}</h2>
          <div className="overlay-meta">
            {source && <span className="meta-pill">{source}</span>}
            {geo && <span className="badge badge-geo">{geo}</span>}
            {integrityLabel && (
              <span className="badge badge-integrity">
                {integrityLabel}
                {integrityConfidence != null ? ` · ${integrityConfidence}%` : ""}
              </span>
            )}
            {typeof riskScore === "number" && (
              <span className="badge badge-risk">{riskScore} risk</span>
            )}
          </div>
        </header>

        <section className="overlay-body">
          <p className="overlay-summary">{extendedSummary}</p>
        </section>

        <footer className="overlay-footer">
          <a
            className="primary-btn"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            Open original article
          </a>
        </footer>
      </div>
    </div>
  );
}
