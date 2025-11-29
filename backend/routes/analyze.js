// backend/routes/analyze.js
const express = require("express");
const router = express.Router();
const { analyzeArticle } = require("../services/aiService");

router.post("/", async (req, res) => {
  try {
    const article = req.body?.article;

    if (!article || (!article.title && !article.cleanText)) {
      return res
        .status(400)
        .json({ error: "Missing article data (title or cleanText required)" });
    }

    const analysis = await analyzeArticle(article);

    res.json({
      articleId: article.id || null,
      ...analysis,
    });
  } catch (error) {
    console.error("Error in POST /api/analyze:", error);
    res.status(500).json({ error: "Failed to analyze article" });
  }
});

module.exports = router;
