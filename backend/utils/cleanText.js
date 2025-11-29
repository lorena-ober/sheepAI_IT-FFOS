// backend/utils/cleanText.js

function cleanText(raw = "") {
  if (!raw) return "";

  let text = String(raw);

  text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
  text = text.replace(/<[^>]+>/g, " ");

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

  text = text.replace(/\s+/g, " ").trim();

  return text;
}

module.exports = { cleanText };
