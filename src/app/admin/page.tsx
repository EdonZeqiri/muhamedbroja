export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { FileText, FolderOpen, Video, HelpCircle } from "lucide-react";

export default async function AdminDashboard() {
  const [articlesCount, categoriesCount, playlistsCount, questionsCount, recentArticles] =
    await Promise.all([
      prisma.article.count(),
      prisma.category.count(),
      prisma.playlist.count(),
      prisma.question.count(),
      prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { category: true },
      }),
    ]);

  const publishedCount = await prisma.article.count({ where: { published: true } });
  const draftCount = articlesCount - publishedCount;

  const stats = [
    { label: "Artikuj", count: articlesCount, icon: FileText, color: "bg-blue-50 text-blue-600" },
    { label: "Kategori", count: categoriesCount, icon: FolderOpen, color: "bg-green-50 text-green-600" },
    { label: "Seri", count: playlistsCount, icon: Video, color: "bg-red-50 text-red-600" },
    { label: "Pyetje", count: questionsCount, icon: HelpCircle, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div>
      <h1 className="font-headings text-2xl font-medium mb-6">Paneli Kryesor</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-border p-5">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-sm text-secondary">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Publish stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-sm text-secondary mb-1">Publikuar</p>
          <p className="text-xl font-bold text-green-600">{publishedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-sm text-secondary mb-1">Draft</p>
          <p className="text-xl font-bold text-yellow-600">{draftCount}</p>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-lg border border-border">
        <div className="p-5 border-b border-border">
          <h2 className="font-headings text-lg font-medium">Artikujt e fundit</h2>
        </div>
        <div className="divide-y divide-border">
          {recentArticles.map((article) => (
            <div key={article.id} className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">{article.title}</h3>
                <p className="text-xs text-secondary mt-1">
                  {article.category?.name || "Pa kategori"} &middot;{" "}
                  {new Date(article.createdAt).toLocaleDateString("sq-AL")}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  article.published
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {article.published ? "Publikuar" : "Draft"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
