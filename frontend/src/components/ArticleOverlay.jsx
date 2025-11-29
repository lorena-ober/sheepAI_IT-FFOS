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
    <div className="overlay-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="overlay-title" tabIndex={-1}>
      <div
        className="overlay-card"
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <button
          className="overlay-close"
          type="button"
          onClick={onClose}
          aria-label="Close overlay"
        >
          ✕
        </button>

        <header className="overlay-header">
          <h2 id="overlay-title" className="overlay-title">{title}</h2>
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
              <span className="badge badge-risk-high">{riskScore} risk</span>
            )}
          </div>
        </header>

        <section className="overlay-body">
          <p>{extendedSummary}</p>
        </section>

        <footer className="overlay-footer">
          <a
            className="primary-btn"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open original article
          </a>
        </footer>
      </div>
    </div>
  );
}
