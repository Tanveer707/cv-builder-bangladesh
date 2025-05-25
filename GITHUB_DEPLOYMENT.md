# GitHub Pages Deployment Guide

## Step-by-Step Instructions

### 1. Create GitHub Repository

1. **Go to GitHub** and create a new repository
2. **Name it** `cv-builder-bangladesh` (or any name you prefer)
3. **Make it public** (required for free GitHub Pages)
4. **Don't initialize** with README (we'll upload our files)

### 2. Upload Your Code

**Option A: Using GitHub Web Interface**
1. **Download all project files** as a ZIP
2. **Extract the files** to a folder
3. **Go to your GitHub repository**
4. **Click "uploading an existing file"**
5. **Drag and drop all files** (maintain folder structure)
6. **Commit the files**

**Option B: Using Git Commands**
\`\`\`bash
# Clone your empty repository
git clone https://github.com/yourusername/cv-builder-bangladesh.git
cd cv-builder-bangladesh

# Copy all project files to this folder
# Then add and commit
git add .
git commit -m "Initial commit: CV Builder Bangladesh"
git push origin main
\`\`\`

### 3. Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section (left sidebar)
4. **Under "Source"** select "GitHub Actions"
5. **Save the settings**

### 4. Trigger Deployment

1. **Make any small change** to trigger deployment (e.g., edit README.md)
2. **Commit and push** the change
3. **Go to "Actions" tab** to see the deployment progress
4. **Wait for deployment** to complete (usually 2-5 minutes)

### 5. Access Your Website

Your website will be available at:
\`\`\`
https://yourusername.github.io/cv-builder-bangladesh/
\`\`\`

## Important Notes

### Repository Name Matters

If you use a different repository name, update `next.config.mjs`:

\`\`\`javascript
// Replace 'cv-builder-bangladesh' with your actual repository name
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
\`\`\`

### Custom Domain (Optional)

To use your own domain:

1. **Add CNAME file** in `public` folder with your domain
2. **Configure DNS** to point to GitHub Pages
3. **Update next.config.mjs** to remove basePath and assetPrefix

### Troubleshooting

**Deployment Failed?**
- Check the "Actions" tab for error details
- Ensure all files are uploaded correctly
- Verify Node.js version in workflow file

**Site Not Loading?**
- Wait a few minutes after deployment
- Check if GitHub Pages is enabled in settings
- Verify the URL format

**404 Error?**
- Check if repository name matches the basePath in next.config.mjs
- Ensure the repository is public

### File Structure for Upload

Make sure you upload these files/folders:
\`\`\`
cv-builder-bangladesh/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── app/
├── components/
├── types/
├── public/
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── README.md
\`\`\`

## Alternative: Manual Deployment

If GitHub Actions doesn't work, you can deploy manually:

1. **Build locally:**
\`\`\`bash
npm install
npm run build
\`\`\`

2. **Create gh-pages branch:**
\`\`\`bash
git checkout --orphan gh-pages
git rm -rf .
cp -r out/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
\`\`\`

3. **Set Pages source** to "Deploy from branch" and select "gh-pages"

## Cost

- **GitHub Pages is FREE** for public repositories
- **Unlimited bandwidth** for reasonable use
- **Custom domains supported** at no extra cost

Your CV Builder will be live and accessible to anyone with the URL!
\`\`\`
