// frontend/src/components/ArticleCard.jsx

function riskClass(riskScore) {
  if (riskScore == null) return "risk-unknown";
  if (riskScore >= 70) return "risk-high";
  if (riskScore >= 40) return "risk-medium";
  return "risk-low";
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

  // prikaži max 3 bullet-a da kartica ostane čitka
  const safeBullets = bulletPoints.slice(0, 3);

  return (
    <article className="article-card">
      <header className="card-header">
        <h3 className="article-title">{title}</h3>
        <div className="card-meta">
          {source && <span className="meta-pill">{source}</span>}
          {publishedAt && (
            <span className="meta-pill meta-muted">
              {new Date(publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </header>

      <div className="card-badges">
        {typeof riskScore === "number" && (
          <span className={`badge badge-risk ${riskClass(riskScore)}`}>
            Risk {riskScore}
          </span>
        )}

        {integrityLabel && (
          <span className="badge badge-integrity">{integrityLabel}</span>
        )}

        {geo && <span className="badge badge-geo">{geo}</span>}
      </div>

      {safeBullets.length > 0 && (
        <ul className="article-bullets">
          {safeBullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}

      <footer className="card-footer">
        {/* otvara AI overlay – više nema hovera, samo klik */}
        <button
          className="link-btn"
          type="button"
          onClick={onOpenOverlay}
        >
          See more →
        </button>

        {link && (
          <a
            className="link-btn subtle"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            Open original
          </a>
        )}
      </footer>
    </article>
  );
}
