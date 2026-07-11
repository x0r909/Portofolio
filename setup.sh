#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm install

echo "✅ Dependencies installed!"
echo "🚀 Starting dev server..."
npm run dev
