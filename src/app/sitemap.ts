export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com";

  const [articles, categories, playlists, questions] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.category.findMany({
      where: { articles: { some: { published: true } } },
      select: { slug: true },
    }),
    prisma.playlist.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.question.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
    }),
  ]);

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/shkrime/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/kategoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const playlistUrls = playlists.map((pl) => ({
    url: `${baseUrl}/ligjerata/${pl.id}`,
    lastModified: pl.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const questionUrls = questions.map((q) => ({
    url: `${baseUrl}/pyetje-pergjigje/${q.id}`,
    lastModified: q.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/ligjerata`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pyetje-pergjigje`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/biografia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...categoryUrls,
    ...playlistUrls,
    ...articleUrls,
    ...questionUrls,
  ];
}
