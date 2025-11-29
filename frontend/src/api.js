// frontend/src/api.js

// Jedan, jedinstveni BASE URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Pretvori preferences objekt u query string.
 * - interests: array -> interests=ai-security,privacy
 * - ostalo: obični key=value
 */
function buildQueryFromPreferences(preferences = {}) {
  const params = new URLSearchParams();

  const { interests, strictness, contentType, heatmap, mode } = preferences;

  if (Array.isArray(interests) && interests.length > 0) {
    params.set("interests", interests.join(","));
  }

  if (strictness) {
    params.set("strictness", strictness);
  }

  if (contentType && contentType !== "all") {
    params.set("contentType", contentType);
  }

  if (typeof heatmap === "boolean") {
    params.set("heatmap", heatmap ? "1" : "0");
  }

  if (mode) {
    params.set("mode", mode);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

// ---------------------------
// GET /api/news
// ---------------------------
export async function fetchNews(preferences = {}) {
  try {
    const query = buildQueryFromPreferences(preferences);
    const res = await fetch(`${API_BASE_URL}/api/news${query}`);

    if (!res.ok) {
      console.error("Failed to fetch /api/news");
      return { articles: [] };
    }

    const data = await res.json();

    // Osiguraj da se FE ne sruši ako backend vrati čudan oblik
    return {
      articles: data?.articles || data || [],
    };
  } catch (err) {
    console.error("fetchNews error:", err);
    return { articles: [] };
  }
}

// ---------------------------
// POST /api/analyze
// ---------------------------
export async function analyzeArticle(article) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });

    if (!res.ok) {
      console.error("Failed to POST /api/analyze");
      return null;
    }

    const data = await res.json();
    return data.analysis || data || null;
  } catch (err) {
    console.error("analyzeArticle error:", err);
    return null;
  }
}
