import express from 'express';
import { createServer as createViteServer } from 'vite';
import cookieParser from 'cookie-parser';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- DATABASE SETUP (Supabase) ---------------- */

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const db = createClient(supabaseUrl, supabaseKey);

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
  const authenticate = async (req: any, res: any, next: any) => {
    const houseId = req.cookies.house_id;
    if (!houseId) return res.status(401).json({ error: 'No House ID connected' });

    const { data: house } = await db.from('houses').select('id').eq('id', houseId).single();
    if (!house) return res.status(401).json({ error: 'Invalid House ID' });

    req.houseId = houseId;
    next();
  };

  // House Routes
  app.post('/api/house/join', async (req, res) => {
    const { houseId, create } = req.body;
    if (!houseId || houseId.length < 3) {
      return res.status(400).json({ error: 'House ID must be at least 3 characters' });
    }

    const normalizedId = houseId.trim().toLowerCase();

    const { data: existing } = await db.from('houses').select('id').eq('id', normalizedId).single();

    if (!existing) {
      if (create) {
        const { error } = await db.from('houses').insert({ id: normalizedId });
        if (error) return res.status(500).json({ error: 'Failed to create house' });
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

  app.get('/api/house/current', async (req, res) => {
    const houseId = req.cookies.house_id;
    if (!houseId) return res.json(null);

    const { data: house } = await db.from('houses').select('id').eq('id', houseId).single();
    res.json(house || null);
  });

  // Data Routes
  app.get('/api/boxes', authenticate, async (req: any, res) => {
    console.log(`[GET /api/boxes] Fetching boxes for house: ${req.houseId}`);

    const { data: boxes, error } = await db.from('boxes').select('*').eq('house_id', req.houseId);
    if (error) return res.status(500).json({ error: 'Failed to fetch boxes' });

    console.log(`[GET /api/boxes] Found ${boxes?.length || 0} boxes`);
    res.json((boxes || []).map((b: any) => ({ ...b, items: JSON.parse(b.items) })));
  });

  app.post('/api/boxes', authenticate, async (req: any, res) => {
    const { boxes } = req.body;
    console.log(`[POST /api/boxes] Saving ${boxes?.length || 0} boxes for house: ${req.houseId}`);

    try {
      const { error: deleteError } = await db.from('boxes').delete().eq('house_id', req.houseId);
      if (deleteError) throw deleteError;

      if (boxes && boxes.length > 0) {
        const rows = boxes.map((box: any) => ({
          id: box.id,
          name: box.name,
          items: JSON.stringify(box.items),
          house_id: req.houseId,
        }));

        const { error: insertError } = await db.from('boxes').insert(rows);
        if (insertError) throw insertError;
      }

      console.log(`[POST /api/boxes] Successfully saved boxes for house: ${req.houseId}`);
      res.json({ success: true });
    } catch (err) {
      console.error(`[POST /api/boxes] Error saving boxes for house: ${req.houseId}`, err);
      res.status(500).json({ error: 'Failed to save boxes' });
    }
  });

  app.post('/api/feedback', async (req, res) => {
    const { message } = req.body;
    const houseId = req.cookies.house_id || 'anonymous';

    if (!message || message.length < 5) {
      return res.status(400).json({ error: 'Feedback message is too short' });
    }

    const { error } = await db.from('feedback').insert({ house_id: houseId, message });
    if (error) {
      console.error('Error saving feedback:', error);
      return res.status(500).json({ error: 'Failed to save feedback' });
    }

    res.json({ success: true });
  });

  app.get('/api/admin/feedback', async (req, res) => {
    const { data, error } = await db.from('feedback').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching feedback:', error);
      return res.status(500).json({ error: 'Failed to fetch feedback' });
    }
    res.json(data || []);
  });

  app.get('/api/admin/houses', async (req, res) => {
    const { data, error } = await db.from('houses').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching houses:', error);
      return res.status(500).json({ error: 'Failed to fetch houses' });
    }
    res.json(data || []);
  });

  app.delete('/api/admin/houses/:id', async (req, res) => {
    const { id } = req.params;
    if (id === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin house' });
    }

    try {
      const { error: e1 } = await db.from('boxes').delete().eq('house_id', id);
      if (e1) throw e1;
      const { error: e2 } = await db.from('feedback').delete().eq('house_id', id);
      if (e2) throw e2;
      const { error: e3 } = await db.from('houses').delete().eq('id', id);
      if (e3) throw e3;

      res.json({ success: true });
    } catch (err) {
      console.error('Error deleting house:', err);
      res.status(500).json({ error: 'Failed to delete house' });
    }
  });

  // Vite middleware for development
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