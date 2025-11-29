// backend/services/aiService.js
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠ OPENAI_API_KEY nije postavljen u .env – AI analiza će biti dummy.");
}

/**
 * article = {
 *   id?,
 *   title,
 *   cleanText,
 *   link,
 *   source,
 * }
 */
async function analyzeArticle(article) {
  // fallback ako nema API keya – da frontend ne pukne
  if (!process.env.OPENAI_API_KEY) {
    return {
      bulletPoints: ["AI analysis disabled (no API key configured)."],
      extendedSummary: article.cleanText?.slice(0, 400) || "",
      riskScore: 50,
      integrityLabel: "needs-checking",
      integrityConfidence: 50,
      geo: null,
    };
  }

  const prompt = buildPrompt(article);

  const response = await client.responses.create({
    model: MODEL,
    input: prompt,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "news_analysis",
        schema: {
          type: "object",
          properties: {
            bulletPoints: {
              type: "array",
              items: { type: "string" },
            },
            extendedSummary: { type: "string" },
            riskScore: {
              type: "number",
              minimum: 0,
              maximum: 100,
            },
            integrityLabel: {
              type: "string",
              enum: ["reliable", "suspicious", "needs-checking"],
            },
            integrityConfidence: {
              type: "number",
              minimum: 0,
              maximum: 100,
            },
            geo: {
              type: ["string", "null"],
              description:
                "Country most relevant to the news, or null if unclear",
            },
          },
          required: [
            "bulletPoints",
            "extendedSummary",
            "riskScore",
            "integrityLabel",
            "integrityConfidence",
            "geo",
          ],
          additionalProperties: false,
        },
        strict: true,
      },
    },
  });

  // kod /v1/responses output je u ovoj strukturi
  const output = response.output?.[0]?.content?.[0]?.json;

  if (!output) {
    console.error(
      "❌ Neočekivani OpenAI response shape:",
      JSON.stringify(response, null, 2)
    );
    throw new Error("Invalid AI response");
  }

  return {
    bulletPoints: output.bulletPoints,
    extendedSummary: output.extendedSummary,
    riskScore: output.riskScore,
    integrityLabel: output.integrityLabel,
    integrityConfidence: output.integrityConfidence,
    geo: output.geo,
  };
}

function buildPrompt(article) {
  const maxText = article.cleanText?.slice(0, 4000) || "";

  return `
You are a cybersecurity news analyst. Analyze the following article and return JSON that matches the provided schema.

Article title: ${article.title || "N/A"}
Source: ${article.source || "N/A"}
Link: ${article.link || "N/A"}

Content:
${maxText}

Guidelines:
- bulletPoints: 3-5 short, clear bullet points summarizing the core information.
- extendedSummary: 1–3 paragraphs, neutral tone, no fluff.
- riskScore: 0-100, where 0 = no risk / purely informational, 100 = extremely critical security risk.
- integrityLabel: "reliable" if information appears well-sourced and typical for The Hacker News; "suspicious" if it feels like potential misinformation or hype; "needs-checking" if important but verification is needed.
- integrityConfidence: 0-100 confidence in your integrityLabel.
- geo: a country most relevant to the news (e.g. US, UK, Germany) or null if not obvious.
`;
}

module.exports = {
  analyzeArticle,
};
