// backend/services/aiService.js
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

if (!process.env.OPENAI_API_KEY) {
  console.warn(
    "⚠ OPENAI_API_KEY nije postavljen u .env – AI analiza će biti fallback dummy."
  );
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
  // Fallback ako nema API keya – da backend ne puca
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
    // Ne koristimo response_format – dobijemo tekst i sami parsiramo JSON
  });

  const raw = response.output?.[0]?.content?.[0]?.text;

  if (!raw) {
    console.error(
      "❌ Neočekivani OpenAI response (nema text outputa):",
      JSON.stringify(response, null, 2)
    );
    throw new Error("Invalid AI response (no text)");
  }

  // počisti eventualne ```json ... ``` markdown fenceove
  let cleaned = raw.trim();

  if (cleaned.startsWith("```")) {
    // makni početni ``` ili ```json
    cleaned = cleaned.replace(/^```[a-zA-Z]*\s*/, "");
    // makni završni ```
    cleaned = cleaned.replace(/```$/, "").trim();
  }

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error("❌ Ne mogu parsirati AI JSON:", cleaned);
    throw new Error("Failed to parse AI JSON");
  }

  // osiguraj default vrijednosti ako model nešto izostavi
  return {
    bulletPoints: parsed.bulletPoints || [],
    extendedSummary: parsed.extendedSummary || "",
    riskScore: parsed.riskScore ?? 50,
    integrityLabel: parsed.integrityLabel || "needs-checking",
    integrityConfidence: parsed.integrityConfidence ?? 50,
    geo: parsed.geo ?? null,
  };
}

function buildPrompt(article) {
  const maxText = article.cleanText?.slice(0, 4000) || "";

  // modelu jasno kažemo da VRATI SAMO JSON
  return `
You are a cybersecurity news analyst.

Analyze the following article and respond ONLY with a single valid JSON object, no explanations, no extra text.

The JSON MUST have exactly these keys:
{
  "bulletPoints": string[],          // 3–5 short bullet points
  "extendedSummary": string,         // 1–3 paragraphs, neutral tone
  "riskScore": number,               // 0–100 (0 = low/no risk, 100 = extreme risk)
  "integrityLabel": string,          // "reliable" | "suspicious" | "needs-checking"
  "integrityConfidence": number,     // 0–100
  "geo": string | null               // country (e.g. "US", "Germany") or null
}

Article title: ${article.title || "N/A"}
Source: ${article.source || "N/A"}
Link: ${article.link || "N/A"}

Content:
${maxText}
`;
}

module.exports = {
  analyzeArticle,
};
