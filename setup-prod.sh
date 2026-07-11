#!/bin/bash
# Script setup otomatis untuk server produksi Ubuntu/Debian

# Keluar jika ada error
set -e

echo "🔒 Memulai setup server produksi..."

# 1. Update OS
echo "🔄 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js v20
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js sudah terinstal: $(node -v)"
fi

# 3. Install PM2 & Serve
echo "🚀 Installing PM2 and Serve globally..."
sudo npm install -g pm2 serve

# 4. Install Project Dependencies & Build
echo "🔧 Installing project dependencies..."
npm install
echo "🏗️ Building static files..."
npm run build

# 5. Start with PM2
echo "📈 Starting application with PM2..."
if pm2 list | grep -q "portfolio-augie-static"; then
    echo "🔄 App is already running, restarting..."
    pm2 restart portfolio-augie-static
else
    pm2 start ecosystem.config.js
fi

# 6. Setup Startup
echo "💾 Configuring PM2 startup scripts..."
pm2 save

echo "🎉 Setup selesai! Portofolio berjalan di port 3000."
echo "Jalankan 'pm2 logs portfolio-augie-static' untuk melihat logs."
