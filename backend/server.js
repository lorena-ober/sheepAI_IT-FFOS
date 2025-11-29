const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const newsRoutes = require("./routes/news");
const analyzeRoutes = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 5000;

// Basic request logging (korisno na hackathonu)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check ruta
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// API rute
app.use("/api/news", newsRoutes);
app.use("/api/analyze", analyzeRoutes);

// 404 fallback za nepostojeće API rute
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Global error handler (ako negdje pozoveš next(err))
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
