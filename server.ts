import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("contributions.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS contributions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    sensor_location TEXT NOT NULL,
    resistance TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contributions", (req, res) => {
    const { brand, type, category, sensor_location, resistance, notes } = req.body;
    
    if (!brand || !resistance) {
      return res.status(400).json({ error: "Marca e Resistência são obrigatórios" });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO contributions (brand, type, category, sensor_location, resistance, notes)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(brand, type, category, sensor_location, resistance, notes);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao salvar contribuição" });
    }
  });

  app.get("/api/contributions/count", (req, res) => {
    const row = db.prepare("SELECT COUNT(*) as count FROM contributions").get() as { count: number };
    res.json({ count: row.count });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
