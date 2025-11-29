const express = require("express");
const router = express.Router();

// Ovdje će kasnije biti poziv prema OpenAI API-ju.
// Za sada samo vraćamo echo da znamo da ruta radi.

router.post("/", (req, res) => {
  const { articleText } = req.body || {};

  if (!articleText) {
    return res.status(400).json({ error: "articleText is required" });
  }

  // TODO: ovdje ide AI summarization, risk, integrity, geo...

  res.json({
    summary: "Ovdje će ići pravi AI sažetak.",
    riskScore: 50,
    integrityLabel: "Likely Reliable",
    integrityConfidence: 80,
    geoLocation: "Unknown",
  });
});

module.exports = router;
