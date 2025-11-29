// frontend/src/components/ArticleOverlay.jsx

// 1) OVO NA VRH FILEA
export default function ArticleOverlay({ article, onClose }) {
  const {
    title = "No title available",
    extendedSummary = "",
    cleanText = "",
    riskScore = "N/A",
    integrityLabel = "N/A",
    integrityConfidence = "N/A",
    link = "#"
} = article || {};


  // 2) RETURN — STAVITI ODMAH IZA CONST BLOKA
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      
      {/* 3) OVERLAY CARD — IDE UNUTAR BACKDROP-A */}
      <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
        
        {/* 4) CLOSE GUMB — PRVI U CARDU */}
        <button className="overlay-close" onClick={onClose}>×</button>

        {/* 5) NASLOV */}
        <h2>{title}</h2>

        {/* 6) TEKST SAŽETKA */}
        <p className="overlay-summary">
          {extendedSummary || cleanText}
        </p>

        {/* 7) META BADGEOVI */}
        <div className="overlay-meta">
          <span className="badge">Risk: {riskScore}</span>
          <span className="badge">Label: {integrityLabel}</span>
          <span className="badge">Confidence: {integrityConfidence}</span>
        </div>

        {/* 8) LINK NA ORIGINAL */}
        <a href={link} target="_blank" className="overlay-link">
          View original →
        </a>

      </div>
    </div>
  );
}
