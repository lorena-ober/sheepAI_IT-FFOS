const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check ruta
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Placeholder: ovdje će kasnije ići vijesti
app.get("/api/news", (req, res) => {
  res.json([]); // za sada samo prazno
});

// Placeholder: ovdje će kasnije ići AI analiza
app.post("/api/analyze", (req, res) => {
  res.json({ message: "Not implemented yet" });
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
