# syntax=docker/dockerfile:1

# =========================================
# Stage 1: Dependencies
# =========================================
FROM oven/bun:1 AS dependencies

WORKDIR /app

# Copy package file
COPY package.json ./

# Install dependencies with caching
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

# =========================================
# Stage 2: Builder
# =========================================
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy dependencies from previous stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the Next.js application
RUN bun run build

# =========================================
# Stage 3: Production
# =========================================
FROM oven/bun:1 AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create non-root user for security
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nodejs

# Copy package file
COPY package.json ./

# Install production dependencies only
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --production

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/.next ./.next
COPY --from=builder --chown=nodejs:nodejs /app/public ./public
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nodejs

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the Next.js application
CMD ["bun", "start"]
