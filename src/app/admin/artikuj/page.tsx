"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  category?: { name: string } | null;
  createdAt: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("A jeni i sigurt që dëshironi ta fshini këtë artikull?")) return;

    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, published: !published } : a))
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headings text-2xl font-medium">Artikujt</h1>
        <Link
          href="/admin/artikuj/ri"
          className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Artikull i ri
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">Duke ngarkuar...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-secondary">Nuk ka artikuj ende.</div>
        ) : (
          <div className="divide-y divide-border">
            {articles.map((article) => (
              <div key={article.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium truncate">{article.title}</h3>
                  <p className="text-xs text-secondary mt-1">
                    {article.category?.name || "Pa kategori"} &middot;{" "}
                    {new Date(article.createdAt).toLocaleDateString("sq-AL")}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(article.id, article.published)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      article.published
                        ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                        : "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100"
                    }`}
                  >
                    {article.published ? "Publikuar" : "Draft"}
                  </button>
                  <Link
                    href={`/admin/artikuj/${article.id}`}
                    className="p-2 rounded-lg hover:bg-layout-bg text-secondary hover:text-primary transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-secondary hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
