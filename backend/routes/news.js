// backend/routes/news.js

const express = require("express");
const { fetchNewsArticles } = require("../services/rssService");

const router = express.Router();

// GET /api/news
router.get("/", async (req, res) => {
  const {
    interests,
    strictness,
    contentType,
    personalization,
    heatmap,
    limit
  } = req.query;

  console.log("GET /api/news filters:", {
    interests,
    strictness,
    contentType,
    personalization,
    heatmap,
    limit
  });

  try {
    const numericLimit = Number(limit) || 20;
    const articles = await fetchNewsArticles(numericLimit);

    res.json({ articles });
  } catch (error) {
    console.error("GET /api/news error:", error.message);
    res.status(500).json({
      error: "Unable to fetch news articles"
    });
  }
});

module.exports = router;
