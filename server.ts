import express from 'express';
import { createServer as createViteServer } from 'vite';
import cookieParser from 'cookie-parser';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- DATABASE SETUP ---------------- */

const dataDir = process.env.DB_PATH || './data';

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'box_tracker.db'));

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS houses (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS boxes (
    id TEXT PRIMARY KEY,
    name TEXT,
    items TEXT,
    house_id TEXT REFERENCES houses(id)
  );
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    house_id TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Add house_id to boxes if it doesn't exist
const tableInfo = db.prepare("PRAGMA table_info(boxes)").all();
const hasHouseId = tableInfo.some((col: any) => col.name === 'house_id');
if (!hasHouseId) {
  try {
    db.exec("ALTER TABLE boxes ADD COLUMN house_id TEXT REFERENCES houses(id)");
    console.log("Migration: Added house_id column to boxes table");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  app.get('/debug', (req, res) => res.send('Server is running at ' + new Date().toISOString()));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      time: new Date().toISOString(),
      env: process.env.NODE_ENV,
      hasDist: fs.existsSync(path.join(__dirname, 'dist')),
      cwd: process.cwd(),
      dirname: __dirname
    });
  });

  app.get('/api/ping', (req, res) => res.send('pong'));

  // Auth Middleware (House ID based)
  const authenticate = (req: any, res: any, next: any) => {
    const houseId = req.cookies.house_id;
    if (!houseId) return res.status(401).json({ error: 'No House ID connected' });
    
    // Verify house exists
    const house = db.prepare('SELECT id FROM houses WHERE id = ?').get(houseId);
    if (!house) return res.status(401).json({ error: 'Invalid House ID' });

    req.houseId = houseId;
    next();
  };

  // House Routes
  app.post('/api/house/join', (req, res) => {
    const { houseId, create } = req.body;
    if (!houseId || houseId.length < 3) {
      return res.status(400).json({ error: 'House ID must be at least 3 characters' });
    }

    const normalizedId = houseId.trim().toLowerCase();

    // Check if exists
    const existing = db.prepare('SELECT id FROM houses WHERE id = ?').get(normalizedId);
    
    if (!existing) {
      if (create) {
        db.prepare('INSERT INTO houses (id) VALUES (?)').run(normalizedId);
      } else {
        return res.status(404).json({ error: 'House not found', notFound: true });
      }
    }

    res.cookie('house_id', normalizedId, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    });

    res.json({ success: true, houseId: normalizedId });
  });

  app.post('/api/house/logout', (req, res) => {
    res.clearCookie('house_id', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.json({ success: true });
  });

  app.get('/api/house/current', (req, res) => {
    const houseId = req.cookies.house_id;
    if (!houseId) return res.json(null);
    
    const house = db.prepare('SELECT id FROM houses WHERE id = ?').get(houseId);
    res.json(house || null);
  });

  // Data Routes
  app.get('/api/boxes', authenticate, (req: any, res) => {
    console.log(`[GET /api/boxes] Fetching boxes for house: ${req.houseId}`);
    const boxes = db.prepare('SELECT * FROM boxes WHERE house_id = ?').all(req.houseId);
    console.log(`[GET /api/boxes] Found ${boxes.length} boxes`);
    res.json(boxes.map((b: any) => ({ ...b, items: JSON.parse(b.items) })));
  });

  app.post('/api/boxes', authenticate, (req: any, res) => {
    const { boxes } = req.body;
    console.log(`[POST /api/boxes] Saving ${boxes?.length || 0} boxes for house: ${req.houseId}`);
    
    const deleteOld = db.prepare('DELETE FROM boxes WHERE house_id = ?');
    const insertNew = db.prepare('INSERT INTO boxes (house_id, id, name, items) VALUES (?, ?, ?, ?)');

    try {
      const transaction = db.transaction((data) => {
        deleteOld.run(req.houseId);
        for (const box of data) {
          insertNew.run(req.houseId, box.id, box.name, JSON.stringify(box.items));
        }
      });

      transaction(boxes);
      console.log(`[POST /api/boxes] Successfully saved boxes for house: ${req.houseId}`);
      res.json({ success: true });
    } catch (err) {
      console.error(`[POST /api/boxes] Error saving boxes for house: ${req.houseId}`, err);
      res.status(500).json({ error: 'Failed to save boxes' });
    }
  });

  app.post('/api/feedback', (req, res) => {
    const { message } = req.body;
    const houseId = req.cookies.house_id || 'anonymous';
    
    if (!message || message.length < 5) {
      return res.status(400).json({ error: 'Feedback message is too short' });
    }

    try {
      db.prepare('INSERT INTO feedback (house_id, message) VALUES (?, ?)').run(houseId, message);
      res.json({ success: true });
    } catch (err) {
      console.error('Error saving feedback:', err);
      res.status(500).json({ error: 'Failed to save feedback' });
    }
  });

  app.get('/api/admin/feedback', (req, res) => {
    // In a real app, we would check for admin credentials here
    try {
      const feedback = db.prepare('SELECT * FROM feedback ORDER BY created_at DESC').all();
      res.json(feedback);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  });

  app.get('/api/admin/houses', (req, res) => {
    try {
      const houses = db.prepare('SELECT * FROM houses ORDER BY created_at DESC').all();
      res.json(houses);
    } catch (err) {
      console.error('Error fetching houses:', err);
      res.status(500).json({ error: 'Failed to fetch houses' });
    }
  });

  app.delete('/api/admin/houses/:id', (req, res) => {
    const { id } = req.params;
    if (id === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin house' });
    }
    try {
      const transaction = db.transaction(() => {
        db.prepare('DELETE FROM boxes WHERE house_id = ?').run(id);
        db.prepare('DELETE FROM feedback WHERE house_id = ?').run(id);
        db.prepare('DELETE FROM houses WHERE id = ?').run(id);
      });
      transaction();
      res.json({ success: true });
    } catch (err) {
      console.error('Error deleting house:', err);
      res.status(500).json({ error: 'Failed to delete house' });
    }
  });

  // Vite middleware for development
  // Only use production mode if the dist directory actually exists
  const isProd = fs.existsSync(path.join(__dirname, 'dist'));
  
  if (!isProd) {
    console.log('Starting in DEVELOPMENT mode with Vite middleware (dist not found)');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) return next();
      
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        if (!fs.existsSync(indexPath)) {
          return res.status(500).send('index.html not found at root: ' + indexPath);
        }
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    console.log('Starting in PRODUCTION mode serving static files from dist');
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, 'dist', 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Production build not found. Please run npm run build.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
