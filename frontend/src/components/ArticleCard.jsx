// frontend/src/components/ArticleCard.jsx

// 1) OVO IDE NA SAMI VRH FILEA
export default function ArticleCard({ article, onBulletHover, onBulletLeave }) {
  // 2) OVO IDE ODMAH ISPOD export default
  const {
    title,
    bulletPoints = [],
    riskScore,
    integrityLabel,
    geo,
    link
  } = article;

  // 3) RETURN BLOK — OVO STAVITE ISPOD DESTRUKTURIRANJA
  return (
    <div className="article-card">
      
      {/* 4) TITLE — PRVI ELEMENT U RETURNU */}
      <h3 className="article-title">{title}</h3>

      {/* 5) BULLET POINT LISTA — IDE ISPOD TITLE-A */}
      <ul className="article-bullets">
        {bulletPoints.length > 0 ? (
          bulletPoints.map((bp, idx) => (
            <li
              key={idx}
              onMouseEnter={() => onBulletHover(idx)}
              onMouseLeave={onBulletLeave}
            >
              {bp}
            </li>
          ))
        ) : (
          <li>No bullet points yet.</li>
        )}
      </ul>

      {/* 6) META INFO — STAVITI ISPOD BULLET LISTE */}
      <div className="article-meta">
        {riskScore !== null && <RiskBadge score={riskScore} />}
        {integrityLabel && (
          <span className="badge integrity">{integrityLabel}</span>
        )}
        {geo && <span className="badge geo">{geo}</span>}
      </div>

      {/* 7) LINK — NA SAMO DNO RETURN-A */}
      <a href={link} target="_blank" className="read-more">
        Read original →
      </a>
    </div>
  );
}

// 8) RISK BADGE HELPER — STAVITI ISPOD ZATVORENE } OD ArticleCard
function RiskBadge({ score }) {
  let cls = "badge ";
  if (score < 40) cls += "badge-risk-low";
  else if (score < 70) cls += "badge-risk-medium";
  else cls += "badge-risk-high";

  return <span className={cls}>Risk {score}</span>;
}
