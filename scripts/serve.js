/**
 * Lightweight Standalone Frontend Dev & Static Server
 * Runs frontend independently on port 5173 with automatic API proxying to backend (port 3000).
 * Zero external dependencies required.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.FRONTEND_PORT || process.env.PORT || '5173', 10);
const BACKEND_URL = process.env.BACKEND_URL || process.env.API_BASE_URL || (process.env.BACKEND_PORT ? `http://localhost:${process.env.BACKEND_PORT}` : 'https://backend-radar-production.up.railway.app');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4'
};

function proxyRequestToBackend(req, res) {
  const targetUrl = new URL(req.url, BACKEND_URL);
  const isHttps = targetUrl.protocol === 'https:';
  const client = isHttps ? https : http;

  const headers = { ...req.headers, host: targetUrl.host };

  const options = {
    protocol: targetUrl.protocol,
    hostname: targetUrl.hostname,
    port: targetUrl.port || (isHttps ? 443 : 80),
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers: headers
  };

  const proxyReq = client.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`[Frontend Proxy Error]: Backend unreachable at ${BACKEND_URL}`, err.message);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: `Backend service is unreachable at ${BACKEND_URL}.`,
      code: 'BACKEND_UNAVAILABLE'
    }));
  });

  req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // 1. Proxy API routes & downloads to backend
  if (pathname.startsWith('/api') || pathname.startsWith('/temp_downloads')) {
    return proxyRequestToBackend(req, res);
  }

  // 2. Route mapping for frontend pages
  let filePath;
  if (pathname === '/' || pathname === '/landing' || pathname === '/landing.html') {
    filePath = path.join(PUBLIC_DIR, 'landing.html');
  } else if (pathname === '/app' || pathname === '/app.html' || pathname === '/index.html') {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  } else {
    filePath = path.join(PUBLIC_DIR, pathname);
  }

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for client routing
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Internal Server Error');
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🌐 Frontend Development Server running independently`);
  console.log(`📡 Local URL:   http://localhost:${PORT}`);
  console.log(`🔗 Backend API: Proxying /api/* -> ${BACKEND_URL}`);
  console.log('====================================================');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use. Please specify another port via FRONTEND_PORT.`);
  } else {
    console.error('Server error:', err);
  }
});
