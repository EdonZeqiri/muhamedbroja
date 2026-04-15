export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
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

  const [articles, totalCount, categories, totalArticles, playlistCount, lectureCount] = await Promise.all([
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
      include: { _count: { select: { articles: { where: { published: true } } } } },
      orderBy: { name: "asc" },
    }),
    prisma.article.count({ where: { published: true } }),
    prisma.playlist.count(),
    prisma.lecture.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Dr. Muhamed Broja",
      url: "https://muhamedbroja.com",
      description:
        "Faqja zyrtare e Dr. Muhamed Broja - Shkrime, ligjerata dhe mësime islame në gjuhën shqipe.",
      inLanguage: "sq",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://muhamedbroja.com/?kerko={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Dr. Muhamed Broja",
      url: "https://muhamedbroja.com",
      image: "https://muhamedbroja.com/images/muhamed-broja.jpg",
      jobTitle: "Imam dhe Ligjerues",
      description:
        "Dr. Muhamed Broja - Imam dhe ligjerues në qytetin e Mitrovicës. Diplomuar në Universitetin Islamik të Medinës, fakulteti i Hadithit. Doktor i shkencave islame.",
      birthDate: "1981-04-09",
      birthPlace: {
        "@type": "Place",
        name: "Mitrovicë, Kosovë",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Universiteti Islamik i Medinës",
      },
      knowsLanguage: ["sq", "ar"],
      sameAs: [
        "https://www.facebook.com/muhamedbroja",
        "https://www.youtube.com/@dr.muhamedbroja",
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#faf9f6]">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.04] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-accent/[0.03] translate-y-1/2 pointer-events-none" />

        <div className="max-w-content mx-auto px-4 py-14 sm:py-20 lg:py-24 relative">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: Content */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-5">
                Imam dhe Ligjerues · Mitrovicë
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] font-normal tracking-tight text-primary mb-6 leading-[1.1]">
                Dr. Muhamed<br className="hidden sm:block" /> Broja
              </h1>
              <p className="text-secondary text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                Shkrime, ligjerata dhe mësime islame në gjuhën shqipe. Diplomuar në Universitetin Islamik të Medinës.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                <Link
                  href="#articles"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Lexo shkrimet
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/ligjerata"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary text-sm font-semibold px-7 py-3.5 rounded-full border border-border hover:border-secondary transition-colors"
                >
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Shiko ligjeratat
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 justify-center lg:justify-start">
                <div className="text-center lg:text-left">
                  <span className="block text-2xl sm:text-3xl font-bold text-primary">{totalArticles}+</span>
                  <span className="text-xs text-secondary tracking-wide uppercase">Shkrime</span>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center lg:text-left">
                  <span className="block text-2xl sm:text-3xl font-bold text-primary">{playlistCount}</span>
                  <span className="text-xs text-secondary tracking-wide uppercase">Seri</span>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center lg:text-left">
                  <span className="block text-2xl sm:text-3xl font-bold text-primary">{lectureCount}+</span>
                  <span className="text-xs text-secondary tracking-wide uppercase">Video</span>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] shrink-0">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-accent/20" />
              {/* Inner filled circle */}
              <div className="absolute inset-5 rounded-full bg-gradient-to-br from-accent/[0.08] to-accent/[0.15]" />
              {/* Gold dot accent */}
              <div className="absolute top-4 right-8 w-3 h-3 rounded-full bg-accent/40" />
              <div className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-accent/30" />
              {/* Signature centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/MB-2-1.png"
                  alt="Dr. Muhamed Broja"
                  width={200}
                  height={80}
                  className="w-44 sm:w-48 lg:w-56 opacity-90 select-none"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Category Filter Strip */}
      <section className="sticky top-0 z-30 bg-[#faf9f6]/95 backdrop-blur-sm border-b border-accent/10">
        <div className="max-w-content mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <Suspense fallback={null}>
                <SearchBar />
              </Suspense>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/#articles"
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                  !categorySlug
                    ? "bg-primary text-white"
                    : "bg-white/80 text-primary border border-accent/15 hover:border-accent/30"
                }`}
              >
                Të gjitha
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/?kategoria=${cat.slug}#articles`}
                  className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                    categorySlug === cat.slug
                      ? "bg-primary text-white"
                      : "bg-white/80 text-primary border border-accent/15 hover:border-accent/30"
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 text-xs opacity-70">{cat._count.articles}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div id="articles" className="max-w-content mx-auto px-4 py-10 scroll-mt-20">
        {/* Section heading */}
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl text-primary">
            {categorySlug
              ? categories.find((c) => c.slug === categorySlug)?.name || "Shkrime"
              : "Shkrimet e fundit"}
          </h2>
          {(search || categorySlug) && (
            <p className="text-sm text-secondary mt-2">
              {totalCount} rezultat{totalCount !== 1 ? "e" : ""}
              {search && <> për &ldquo;{search}&rdquo;</>}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Article Grid - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
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
              <div className="bg-white/60 rounded-2xl border border-accent/10 p-12 text-center">
                <p className="text-secondary">Nuk u gjet asnjë artikull.</p>
              </div>
            )}

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
