const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const newsRoutes = require("./routes/news");
const analyzeRoutes = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 5000;

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

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
