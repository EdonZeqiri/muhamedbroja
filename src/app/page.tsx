export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";

const ARTICLES_PER_PAGE = 10;

interface HomePageProps {
  searchParams: { kerko?: string; kategoria?: string; faqja?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const search = searchParams.kerko || "";
  const categorySlug = searchParams.kategoria || "";
  const page = Math.max(1, parseInt(searchParams.faqja || "1", 10));

  const where = {
    published: true,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { content: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(categorySlug && {
      category: { slug: categorySlug },
    }),
  };

  const [articles, totalCount, categories] = await Promise.all([
    prisma.article.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ARTICLES_PER_PAGE,
      take: ARTICLES_PER_PAGE,
    }),
    prisma.article.count({ where }),
    prisma.category.findMany({
      where: { articles: { some: { published: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Muhamed Broja",
    url: "https://muhamedbroja.com",
    jobTitle: "Imam dhe Ligjerues",
    description:
      "Dr. Muhamed Broja - Imam dhe ligjerues në qytetin e Mitrovicës. Diplomuar në Universitetin Islamik të Medinës.",
    sameAs: [
      "https://www.facebook.com/muhamedbroja",
      "https://www.youtube.com/@MuhamedBroja",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-content mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg border border-border p-4 mb-6 space-y-4">
              <Suspense fallback={null}>
                <SearchBar />
              </Suspense>
              <Suspense fallback={null}>
                <CategoryFilter categories={categories} />
              </Suspense>
            </div>

            {/* Results info */}
            {(search || categorySlug) && (
              <p className="text-sm text-secondary mb-4">
                {totalCount} rezultat{totalCount !== 1 ? "e" : ""}
                {search && <> për &ldquo;{search}&rdquo;</>}
                {categorySlug && (
                  <>
                    {" "}
                    në kategorinë{" "}
                    <span className="font-medium text-primary">
                      {categories.find((c) => c.slug === categorySlug)?.name}
                    </span>
                  </>
                )}
              </p>
            )}

            {/* Article List */}
            <div className="space-y-4">
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

              {articles.length === 0 && (
                <div className="bg-white rounded-lg border border-border p-12 text-center">
                  <p className="text-secondary">Nuk u gjet asnjë artikull.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <Suspense fallback={null}>
              <Pagination currentPage={page} totalPages={totalPages} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[320px] lg:shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
