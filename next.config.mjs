/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 14. Compress API payloads & HTML using Gzip/Brotli
  compress: true,
  // 16. Minify JS and CSS with high-performance SWC Rust compiler
  swcMinify: true,
  // 13. Power optimization for compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // 4. Compress & optimize images with modern formats (AVIF & WebP) + TTL caching
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 9 & 19. Split code into chunks & eliminate unused library dependencies via tree-shaking
  experimental: {
    optimizePackageImports: ["lucide-react", "three", "framer-motion"],
  },
  // 1, 2, 10 & 11. Cache API responses, CDN headers, Server-side caching & Load balancer security
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/walkthrough/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/gallery/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
