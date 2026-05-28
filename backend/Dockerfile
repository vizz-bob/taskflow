# ─── Stage 1: Dependencies ───────────────────────────────────────
# We use a separate stage to install dependencies.
# This way, if code changes but package.json doesn't change,
# Docker reuses the cached layer — faster builds.
FROM node:18-alpine AS deps

WORKDIR /app

# Copy package files first (not the code)
# Docker caches this layer — only re-runs npm install if package.json changes
COPY package*.json ./
RUN npm ci --only=production

# ─── Stage 2: Production Image ───────────────────────────────────
FROM node:18-alpine AS runner

# Security best practice: don't run as root
# Create a non-root user called 'appuser'
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY src/ ./src/
COPY package.json ./

# Change ownership of files to our non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 4000

# Health check — Docker itself will monitor this
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

# Start the application
CMD ["node", "src/index.js"]
