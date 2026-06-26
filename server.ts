import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const PORT = 3000;

  // Enable gzip/deflate text compression for HTML, CSS, JS, SVGs, and JSON
  app.use(compression());

  // Import our backend API Express handlers dynamically
  const { default: apiHandler } = await import('./api/index.js');

  // Mount backend endpoints
  app.use(apiHandler);

  if (process.env.NODE_ENV === 'production') {
    // Static file serving of the compiled output with efficient caching policy
    app.use(express.static(path.join(__dirname, 'dist'), {
      maxAge: '1y',
      etag: true,
      setHeaders: (res, filePath) => {
        const ext = path.extname(filePath);
        if (ext === '.html') {
          // Never cache HTML so updates are picked up instantly
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else if (['.js', '.css'].includes(ext) || filePath.includes('/assets/')) {
          // Hashed static JS and CSS are 100% immutable
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'].includes(ext)) {
          // Static images can be cached for 1 month
          res.setHeader('Cache-Control', 'public, max-age=2592000');
        } else if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
          // Web fonts are cached for 1 year (immutable)
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Integrate Vite server in middlewareMode for Dev
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT} (NODE_ENV: ${process.env.NODE_ENV || 'development'})`);
  });
}

createServer().catch((err) => {
  console.error('Fatal crash during server bootstrap:', err);
});
