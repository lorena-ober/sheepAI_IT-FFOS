const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Pretvori preferences objekt u query string.
 * - interests: array -> interests=ai-security,privacy
 * - ostalo: obični key=value
 */
function buildQueryFromPreferences(preferences) {
  const params = new URLSearchParams();

  if (preferences) {
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
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

/**
 * Dohvaća vijesti s backend-a, uzimajući preferences kao filtere.
 */
export async function fetchNews(preferences) {
  const query = buildQueryFromPreferences(preferences);
  const response = await fetch(`${BASE_URL}/api/news${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
