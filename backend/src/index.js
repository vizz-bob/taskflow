const express = require('express');
const cors = require('cors');
const promClient = require('prom-client');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Prometheus Metrics ───────────────────────────────────────────
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
});

// Record metrics for every request
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestCounter.labels(req.method, req.route?.path || req.path, res.statusCode).inc();
    httpRequestDuration.labels(req.method, req.route?.path || req.path, res.statusCode).observe(duration);
  });
  next();
});

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Health Check ─────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Metrics Endpoint ─────────────────────────────────────────────
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// ─── Routes ───────────────────────────────────────────────────────
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
