#!/usr/bin/env bash
# ---------------------------------------------------------
# Ein UI Bun Setup & Dev Launcher
# Fully prepares project for Bun + Next.js + Tailwind + Biome
# ---------------------------------------------------------

set -e

echo "╔════════════════════════════════════════════════╗"
echo "║      EIN UI BUN PROJECT SETUP SCRIPT          ║"
echo "╚════════════════════════════════════════════════╝"

PROJECT_DIR="$(pwd)"
echo "Project Directory: $PROJECT_DIR"

# 1️⃣ Clean old installs
echo "Cleaning old installs..."
rm -rf node_modules bun.lock
echo "✅ Old installs removed"

# 2️⃣ Install dependencies with Bun
echo "Installing dependencies with Bun..."
bun install
echo "✅ Dependencies installed"

# 3️⃣ Link Next.js CLI manually (fixes Bun run dev issues)
echo "Linking Next.js CLI for Bun..."
mkdir -p node_modules/.bin
ln -sf ../next/dist/cli/next-dev.js node_modules/.bin/next
chmod +x node_modules/.bin/next 2>/dev/null || true
echo "✅ Next CLI linked"

# 4️⃣ Clean .next cache
echo "Cleaning .next cache..."
rm -rf .next
echo "✅ Cache cleaned"

echo "╔════════════════════════════════════════════════╗"
echo "║      EIN UI Bun Setup Complete                ║"
echo "╚════════════════════════════════════════════════╝"
