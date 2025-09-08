/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // usando imagens locais em /public/galeria, não precisa de domains
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // mantém App Router confortável
    typedRoutes: false,
  },
};

module.exports = nextConfig;
