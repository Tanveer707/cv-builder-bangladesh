# Deployment Guide

This guide will help you deploy the CV Builder Bangladesh application to various hosting platforms.

## Quick Start (Local Development)

1. **Install Node.js** (version 18 or later) from [nodejs.org](https://nodejs.org/)

2. **Clone and setup the project:**
\`\`\`bash
# Download the project files
# Extract to a folder named 'cv-builder-bangladesh'
cd cv-builder-bangladesh

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

3. **Open your browser** and go to `http://localhost:3000`

## Production Deployment

### Option 1: Static Hosting (Recommended for beginners)

This creates static files that work on any web server:

\`\`\`bash
# Build static files
npm run build

# Upload the 'out' folder to your hosting service
\`\`\`

**Compatible with:**
- Netlify
- Vercel
- GitHub Pages
- Any web hosting service (cPanel, etc.)

### Option 2: Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically

### Option 3: Netlify

1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `out` folder

### Option 4: Traditional Web Hosting

1. Build the project: `npm run build`
2. Upload contents of `out` folder via FTP/cPanel
3. Point your domain to the uploaded files

## Environment Variables

For production, you may want to set:

\`\`\`bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
\`\`\`

## Custom Domain Setup

1. **For Vercel/Netlify:** Add your domain in their dashboard
2. **For traditional hosting:** Point your domain's DNS to your hosting server

## SSL Certificate

Most modern hosting services provide free SSL certificates. Make sure HTTPS is enabled.

## Performance Optimization

The app is already optimized with:
- Static generation
- Image optimization
- Code splitting
- Minification

## Troubleshooting

**Build fails?**
- Make sure Node.js version is 18+
- Delete `node_modules` and run `npm install` again

**Site not loading?**
- Check if all files from `out` folder are uploaded
- Verify your hosting service supports static sites

**Need help?**
- Check the console for errors
- Ensure JavaScript is enabled in the browser
