import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // Enable modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Reduce quality slightly for faster loading
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  // Enable modern CSS features for smaller bundles
  experimental: {
    // Enable MDX RS for faster MDX compilation
    mdxRs: true,
    // Web Vitals attribution for better debugging
    webVitalsAttribution: ["CLS", "LCP", "FCP", "TTFB", "INP"],
    // Optimize CSS chunks
    cssChunking: "loose",
    // Optimize more package imports to reduce bundle size
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "recharts",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-icons",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-popover",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-radio-group",
      "@tabler/icons-react",
      "embla-carousel-react",
      "pino",
      "sonner",
      "next-themes",
      "class-variance-authority",
      "next-intl",
      "date-fns",
      "clsx",
      "tailwind-merge",
    ],
  },
  // Add caching headers for static assets
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache generated images
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        // Add security headers that also help performance
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
};

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));

