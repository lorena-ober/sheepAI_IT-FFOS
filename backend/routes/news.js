// backend/routes/news.js

const express = require("express");
const { fetchNewsArticles } = require("../services/rssService");

const router = express.Router();

// GET /api/news
router.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;

    const articles = await fetchNewsArticles(limit);

    // FE očekuje { articles: [...] }
    res.json({ articles });
  } catch (error) {
    console.error("GET /api/news error:", error.message);
    res.status(500).json({
      error: "Unable to fetch news articles"
    });
  }
});

module.exports = router;
