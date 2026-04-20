/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i3.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "muhamedbroja.com",
      },
      {
        protocol: "https",
        hostname: "www.muhamedbroja.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      // Redirect old WordPress category URLs to articles page
      {
        source: "/kategoria/:slug*",
        destination: "/shkrime",
        permanent: true,
      },
      // Redirect old WordPress tag URLs
      {
        source: "/tag/:slug*",
        destination: "/shkrime",
        permanent: true,
      },
      // Redirect old WordPress author URLs
      {
        source: "/author/:slug*",
        destination: "/biografia",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
