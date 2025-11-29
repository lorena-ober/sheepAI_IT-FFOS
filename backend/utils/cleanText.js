// backend/utils/cleanText.js

export function cleanText(raw = "") {
  if (!raw) return "";

  let text = String(raw);

  // Ukloni <script> i <style> blokove
  text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");

  // Ukloni sve HTML tagove
  text = text.replace(/<[^>]+>/g, " ");

  // Decode nekoliko najčešćih HTML entiteta
  const entities = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&lt;": "<",
    "&gt;": ">"
  };
  for (const [entity, chr] of Object.entries(entities)) {
    text = text.replace(new RegExp(entity, "g"), chr);
  }

  // Normaliziraj whitespace
  text = text.replace(/\s+/g, " ").trim();

  return text;
}
