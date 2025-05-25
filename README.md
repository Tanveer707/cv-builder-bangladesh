# Professional CV Builder - Bangladesh

A modern, ATS-optimized CV builder specifically designed for the Bangladesh job market with bilingual support (English & Bengali).

🌐 **Live Demo:** [https://yourusername.github.io/cv-builder-bangladesh/](https://yourusername.github.io/cv-builder-bangladesh/)

## Features

- 🎨 **Multiple Professional Themes** - Choose from modern, classic, creative, and minimal designs
- 🤖 **AI-Powered Suggestions** - Get intelligent content recommendations
- 📊 **ATS Optimization** - Built-in ATS compatibility scoring
- 🌐 **Bilingual Support** - Full support for English and Bengali
- 📱 **Responsive Design** - Works perfectly on all devices
- 📄 **Multiple Export Options** - Download as PDF, Word, or other formats
- 🎯 **Job-Specific Optimization** - Analyze job descriptions for better matching

## Quick Start with GitHub Pages

### 1. Fork & Setup

1. **Fork this repository** by clicking the "Fork" button
2. **Rename your repository** to `cv-builder-bangladesh` (or keep any name)
3. **If you use a different name**, update `next.config.mjs`:
   \`\`\`javascript
   assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
   basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   \`\`\`

### 2. Enable GitHub Pages

1. Go to your repository **Settings**
2. Scroll to **Pages** section
3. Under **Source**, select **"GitHub Actions"**
4. Save the settings

### 3. Deploy

1. Make any small change (edit this README)
2. Commit and push to trigger deployment
3. Wait 2-5 minutes for deployment to complete
4. Access your site at: `https://yourusername.github.io/cv-builder-bangladesh/`

## Local Development

\`\`\`bash
# Clone your repository
git clone https://github.com/yourusername/cv-builder-bangladesh.git
cd cv-builder-bangladesh

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
\`\`\`

## Deployment Options

### GitHub Pages (Free & Easy)
- ✅ Free hosting
- ✅ Automatic deployment
- ✅ Custom domain support
- ✅ SSL certificate included

### Other Platforms
- **Vercel**: Connect GitHub repo for instant deployment
- **Netlify**: Drag & drop the `out` folder after `npm run build`
- **Traditional Hosting**: Upload `out` folder contents via FTP

## Troubleshooting

**Deployment Failed?**
- Check the "Actions" tab for error details
- Ensure repository is public
- Verify all files are uploaded correctly

**Site Not Loading?**
- Wait a few minutes after deployment
- Check if GitHub Pages is enabled
- Verify the URL format matches your repository name

**404 Error?**
- Make sure repository name matches the `basePath` in `next.config.mjs`
- Ensure the repository is public

## Customization

### Change Repository Name
Update `next.config.mjs` with your actual repository name:
\`\`\`javascript
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-actual-repo-name/' : '',
basePath: process.env.NODE_ENV === 'production' ? '/your-actual-repo-name' : '',
\`\`\`

### Custom Domain
1. Add `CNAME` file in `public` folder with your domain
2. Configure DNS to point to GitHub Pages
3. Remove `assetPrefix` and `basePath` from `next.config.mjs`

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Components
- **GitHub Pages** - Hosting

## License

MIT License - feel free to use for personal or commercial projects.

---

⭐ **Star this repository** if you find it helpful!

🚀 **Your CV Builder will be live at:** `https://yourusername.github.io/cv-builder-bangladesh/`
