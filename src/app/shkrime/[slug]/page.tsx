export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar";
import { ChevronLeft } from "lucide-react";

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug, published: true },
    include: { category: true },
  });

  if (!article) return { title: "Artikulli nuk u gjet" };

  const description = article.excerpt || article.content.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      locale: "sq_AL",
      publishedTime: article.createdAt.toISOString(),
      authors: [article.author],
      ...(article.thumbnail && { images: [{ url: article.thumbnail }] }),
    },
    alternates: {
      canonical: `/shkrime/${article.slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug, published: true },
    include: { category: true },
  });

  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: article.author,
      url: "https://muhamedbroja.com/biografia",
    },
    publisher: {
      "@type": "Person",
      name: "Dr. Muhamed Broja",
    },
    ...(article.thumbnail && {
      image: article.thumbnail,
    }),
    description: article.excerpt || article.content.replace(/<[^>]+>/g, "").slice(0, 160),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://muhamedbroja.com/shkrime/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-content mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {/* Header */}
              <div className="p-6 sm:p-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors mb-4"
                >
                  <ChevronLeft size={14} />
                  Kthehu te shkrimet
                </Link>

                {article.category && (
                  <span className="category-badge mb-3 block w-fit">
                    {article.category.name}
                  </span>
                )}

                <h1 className="font-headings text-2xl sm:text-3xl font-medium leading-tight mb-4">
                  {article.title}
                </h1>

                <div className="flex items-center gap-3 text-sm text-secondary pb-6 border-b border-border">
                  <span className="font-medium">{article.author}</span>
                  <span className="text-border">|</span>
                  <time>
                    {new Date(article.createdAt).toLocaleDateString("sq-AL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>

              {/* Thumbnail */}
              {article.thumbnail && (
                <div className="px-6 sm:px-8">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="px-6 sm:px-8 pb-8">
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:w-[320px] lg:shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
