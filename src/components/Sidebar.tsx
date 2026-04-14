import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Sidebar() {
  const [recentArticles, categories] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { title: true, slug: true, createdAt: true },
    }),
    prisma.category.findMany({
      include: { _count: { select: { articles: { where: { published: true } } } } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <aside className="space-y-6">
      {/* Recent Posts */}
      <div className="bg-white rounded-lg p-5 border border-border">
        <h3 className="font-headings text-base font-medium mb-4 pb-3 border-b border-border">
          Postimet e fundit
        </h3>
        <div className="space-y-3">
          {recentArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/shkrime/${article.slug}`}
              className="block group"
            >
              <h4 className="text-sm font-medium text-primary group-hover:text-secondary transition-colors leading-snug">
                {article.title}
              </h4>
              <time className="text-xs text-secondary mt-1 block">
                {new Date(article.createdAt).toLocaleDateString("sq-AL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg p-5 border border-border">
        <h3 className="font-headings text-base font-medium mb-4 pb-3 border-b border-border">
          Kategoritë
        </h3>
        <div className="space-y-2">
          {categories
            .filter((c) => c._count.articles > 0)
            .map((category) => (
              <Link
                key={category.slug}
                href={`/?kategoria=${category.slug}`}
                className="flex items-center justify-between text-sm text-primary hover:text-secondary transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-xs text-secondary bg-layout-bg rounded-full px-2 py-0.5">
                  {category._count.articles}
                </span>
              </Link>
            ))}
        </div>
      </div>

      {/* YouTube Subscribe */}
      <div className="bg-white rounded-lg p-5 border border-border">
        <h3 className="font-headings text-base font-medium mb-4 pb-3 border-b border-border">
          YouTube
        </h3>
        <p className="text-sm text-secondary mb-3">
          Ndiqni kanalin tonë në YouTube për ligjerata dhe mësime.
        </p>
        <a
          href="https://www.youtube.com/@MuhamedBroja?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Abonohu
        </a>
      </div>
    </aside>
  );
}
