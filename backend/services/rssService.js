// backend/services/rssService.js

const Parser = require("rss-parser");
const { cleanText } = require("../utils/cleanText");

const parser = new Parser();

// Potvrđeni The Hacker News RSS feed. [web:8][web:42]
const THE_HACKER_NEWS_RSS_URL =
  process.env.THN_RSS_URL || "http://feeds.feedburner.com/TheHackersNews";

/**
 * Dohvati i normaliziraj članke s The Hacker News.
 * Vraća array objekata:
 * {
 *   id,
 *   title,
 *   link,
 *   publishedAt,
 *   source,
 *   snippet,
 *   cleanText,
 *   bulletPoints,
 *   riskScore,
 *   integrityLabel,
 *   integrityConfidence,
 *   geo
 * }
 */
async function fetchNewsArticles(limit = 20) {
  try {
    const feed = await parser.parseURL(THE_HACKER_NEWS_RSS_URL);

    const items = (feed.items || []).slice(0, limit);

    return items.map((item, index) => {
      const title = item.title || "";
      const link = item.link || item.guid || "";
      const pubDate = item.pubDate || item.isoDate || null;

      const rawSnippet =
        item.contentSnippet || item.summary || item.description || "";
      const rawContent = item["content:encoded"] || item.content || rawSnippet;

      const snippet = cleanText(rawSnippet).slice(0, 260);
      const fullClean = cleanText(rawContent);

      return {
        id: item.guid || link || `thn-${index}`,
        title,
        link,
        publishedAt: pubDate,
        source: "The Hacker News",
        snippet,
        cleanText: fullClean,

        // Polja koja će popuniti AI analiza (analyzeArticle / batch)
        bulletPoints: [],
        riskScore: null,
        integrityLabel: null,
        integrityConfidence: null,
        geo: null
      };
    });
  } catch (error) {
    console.error("rssService.fetchNewsArticles error:", error.message);
    throw new Error("Failed to fetch or parse RSS feed");
  }
}

module.exports = { fetchNewsArticles };
