#!/bin/bash

# Deployment script for CV Builder Bangladesh

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Static files are ready in the 'out' directory"
    echo ""
    echo "🌐 You can now:"
    echo "   1. Upload the 'out' folder to your web hosting service"
    echo "   2. Or run 'npm run start' to test locally"
    echo ""
    echo "🎉 Deployment ready!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
