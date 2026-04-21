import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Explicitly allow AI crawlers to index all public content
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Social media crawlers (for link previews)
      {
        userAgent: "facebookexternalhit",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "WhatsApp",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
