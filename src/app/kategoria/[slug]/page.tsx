export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";

const ARTICLES_PER_PAGE = 10;

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { faqja?: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) return { title: "Kategoria nuk u gjet" };

  return {
    title: `${category.name} - Shkrime`,
    description: `Shkrime dhe artikuj nga kategoria "${category.name}" nga Dr. Muhamed Broja.`,
    openGraph: {
      title: `${category.name} | Dr. Muhamed Broja`,
      description: `Shkrime dhe artikuj nga kategoria "${category.name}"`,
      locale: "sq_AL",
    },
    alternates: {
      canonical: `/kategoria/${category.slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({ select: { slug: true } });
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) notFound();

  const page = Math.max(1, parseInt(searchParams.faqja || "1", 10));

  const [articles, totalCount, allCategories] = await Promise.all([
    prisma.article.findMany({
      where: { published: true, categoryId: category.id },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ARTICLES_PER_PAGE,
      take: ARTICLES_PER_PAGE,
    }),
    prisma.article.count({ where: { published: true, categoryId: category.id } }),
    prisma.category.findMany({
      where: { articles: { some: { published: true } } },
      include: { _count: { select: { articles: { where: { published: true } } } } },
      orderBy: { name: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - Dr. Muhamed Broja`,
    description: `Shkrime dhe artikuj nga kategoria "${category.name}"`,
    url: `https://muhamedbroja.com/kategoria/${category.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Category Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-content mx-auto px-4 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Të gjitha shkrimet
          </Link>

          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {category.name}
          </h1>
          <p className="text-secondary">
            {totalCount} shkrim{totalCount !== 1 ? "e" : ""} në këtë kategori
          </p>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Link
              href="/"
              className="text-sm font-semibold px-4 py-2 rounded-full border bg-white text-primary border-border hover:border-secondary transition-colors"
            >
              Të gjitha
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategoria/${cat.slug}`}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                  cat.slug === params.slug
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-border hover:border-secondary"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-70">{cat._count.articles}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-content mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  slug={article.slug}
                  excerpt={article.excerpt}
                  thumbnail={article.thumbnail}
                  category={article.category}
                  author={article.author}
                  createdAt={article.createdAt}
                />
              ))}
            </div>

            {articles.length === 0 && (
              <div className="bg-white/70 rounded-2xl border border-accent/10 p-12 text-center">
                <p className="text-secondary">Nuk ka artikuj në këtë kategori.</p>
              </div>
            )}

            <Suspense fallback={null}>
              <Pagination currentPage={page} totalPages={totalPages} />
            </Suspense>
          </div>

          <div className="lg:w-[320px] lg:shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
