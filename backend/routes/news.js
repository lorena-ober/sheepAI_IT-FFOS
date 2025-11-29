// backend/routes/news.js
const express = require("express");
const router = express.Router();

const { fetchNewsArticles } = require("../services/rssService");
const { analyzeArticle } = require("../services/aiService");

// GET /api/news
router.get("/", async (req, res) => {
  try {
    // 1) Dohvati članke iz RSS-a (developer A)
    const articles = await fetchNewsArticles();

    // Opcionalno: limitiraj broj analiziranih članaka (npr. prvih 10) radi brzine i tokena
    const limited = articles.slice(0, 10);

    // 2) Za svaki članak pozovi AI analizu (tvoj dio)
    const analyzed = await Promise.all(
      limited.map(async (article) => {
        try {
          const ai = await analyzeArticle(article);
          // Spoji originalni artikel s AI rezultatima
          return {
            ...article,
            bulletPoints: ai.bulletPoints,
            extendedSummary: ai.extendedSummary,
            riskScore: ai.riskScore,
            integrityLabel: ai.integrityLabel,
            integrityConfidence: ai.integrityConfidence,
            geo: ai.geo,
          };
        } catch (err) {
          console.error("AI analysis failed for article:", article.id, err);
          // Ako AI pukne, vrati barem originalni članak
          return article;
        }
      })
    );

    res.json({ articles: analyzed });
  } catch (error) {
    console.error("Error in GET /api/news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
