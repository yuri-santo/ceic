/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
