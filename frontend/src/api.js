// frontend/src/api.js

// Base URL — koristi VITE varijablu ako postoji, inače localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


// ---------------------------
// GET /api/news
// ---------------------------
export async function fetchNews(preferences = {}) {
  try {
    // Pretvori preferences u query string
    const query = new URLSearchParams(preferences).toString();

    const res = await fetch(`${API_BASE_URL}/api/news?${query}`);

    if (!res.ok) {
      console.error("Failed to fetch /api/news");
      return { articles: [] };
    }

    const data = await res.json();

    // Osiguraj da se FE ne sruši ako backend vrati čudan oblik
    return {
      articles: data?.articles || data || []
    };

  } catch (err) {
    console.error("fetchNews error:", err);
    return { articles: [] };
  }
}



// ---------------------------
// POST /api/analyze
// (ako kasnije želiš on-demand AI)
// ---------------------------
export async function analyzeArticle(article) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    });

    if (!res.ok) {
      console.error("Failed to POST /api/analyze");
      return null;
    }

    const data = await res.json();
    return data.analysis || null;

  } catch (err) {
    console.error("analyzeArticle error:", err);
    return null;
  }
}
