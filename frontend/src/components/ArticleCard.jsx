// frontend/src/components/ArticleCard.jsx
export default function ArticleCard({ article, onShowOverlay }) {
  if (!article) return null;

  return (
    <div className="article-card">
      <h3 className="article-title">{article.title}</h3>

      <ul className="article-summary">
        {article.shortSummaryBullets?.map((point, index) => (
          <li key={index} onMouseEnter={() => onShowOverlay(article)}>
            {point}
          </li>
        ))}
      </ul>

      <a
        href={article.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="see-more-link"
      >
        Vidi više →
      </a>
    </div>
  );
}
    