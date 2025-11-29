const express = require("express");
const router = express.Router();

// Ovdje ćemo kasnije ubaciti pravi RSS parsing i AI analizu.
// Za sada vraćamo par mock članaka da frontend ima nešto za prikaz.

router.get("/", (req, res) => {
  const mockArticles = [
    {
      id: "1",
      title: "Major Data Breach at X Corporation",
      shortSummaryBullets: [
        "2 million user records exposed",
        "Misconfigured cloud storage bucket",
        "Regulators notified within 24 hours",
      ],
      extendedSummary:
        "This article describes a large-scale data breach at X Corporation, where 2 million user records were exposed due to a misconfigured cloud storage bucket. The company has notified regulators and affected users, and an internal investigation is in progress.",
      riskScore: 82,
      integrityLabel: "Likely Reliable",
      integrityConfidence: 91,
      tags: ["Cybersecurity", "Data Breach"],
      geoLocation: "United States",
      originalUrl: "https://thehackernews.com/",
    },
    {
      id: "2",
      title: "New AI Model Targets Malware Detection",
      shortSummaryBullets: [
        "AI model trained on large malware dataset",
        "Improves detection of zero-day threats",
        "Vendors testing integration in production",
      ],
      extendedSummary:
        "Security researchers have developed a new AI model trained on a large dataset of malware samples. The model aims to improve early detection of zero-day threats and reduce false positives in traditional security tools.",
      riskScore: 64,
      integrityLabel: "Needs Verification",
      integrityConfidence: 70,
      tags: ["AI", "Malware", "Security Research"],
      geoLocation: "Global",
      originalUrl: "https://thehackernews.com/",
    },
  ];

  res.json(mockArticles);
});

module.exports = router;
