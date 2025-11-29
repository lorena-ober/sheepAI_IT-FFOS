function riskClass(riskScore) {
  if (riskScore == null) return "badge-risk-low";
  if (riskScore >= 70) return "badge-risk-high";
  if (riskScore >= 40) return "badge-risk-medium";
  return "badge-risk-low";
}

export default function ArticleCard({ article, onOpenOverlay }) {
  const {
    title,
    bulletPoints = [],
    riskScore,
    integrityLabel,
    geo,
    link,
    source,
    publishedAt,
  } = article;

  const safeBullets = bulletPoints.slice(0, 3);

  return (
    <article
      className="article-card"
      tabIndex={0}
      role="button"
      onClick={onOpenOverlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenOverlay();
      }}
      aria-label={`Detalji za vijest: ${title}`}
    >
      <header className="card-header">
        <h3 className="article-title">{title}</h3>
        <div className="card-meta">
          {source && <span className="meta-pill">{source}</span>}
          {publishedAt && (
            <span className="meta-pill">
              {new Date(publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </header>

      <div className="card-badges">
        {typeof riskScore === "number" && (
          <span className={`badge ${riskClass(riskScore)}`}>Risk {riskScore}</span>
        )}
        {integrityLabel && (
          <span className="badge badge-integrity">{integrityLabel}</span>
        )}
        {geo && <span className="badge badge-geo">{geo}</span>}
      </div>

      <ul className="article-bullets">
        {safeBullets.length ? (
          safeBullets.map((bp, i) => (
            <li key={i} tabIndex={0} aria-label={`Bullet point: ${bp}`}>
              {bp}
            </li>
          ))
        ) : (
          <li>No bullet points yet.</li>
        )}
      </ul>

      <footer className="card-footer">
        <button className="link-btn" type="button" onClick={onOpenOverlay} aria-label={`Prošireni sažetak vijesti: ${title}`}>
          See more →
        </button>
        {link && (
          <a
            className="link-btn subtle"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Otvori originalni članak: ${title}`}
            onClick={(e) => e.stopPropagation()}
          >
            Open original
          </a>
        )}
      </footer>
    </article>
  );
}
