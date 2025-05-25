/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // GitHub Pages configuration
  // Replace 'cv-builder-bangladesh' with your actual GitHub repository name
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cv-builder-bangladesh/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/cv-builder-bangladesh' : '',
}

export default nextConfig
