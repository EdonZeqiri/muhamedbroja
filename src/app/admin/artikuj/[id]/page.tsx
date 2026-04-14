"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";

export default function EditArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<{
    id: string;
    title: string;
    content: string;
    excerpt?: string | null;
    thumbnail?: string | null;
    categoryId?: string | null;
    published: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <div className="text-secondary">Duke ngarkuar...</div>;
  }

  if (!article) {
    return <div className="text-secondary">Artikulli nuk u gjet.</div>;
  }

  return (
    <div>
      <h1 className="font-headings text-2xl font-medium mb-6">Edito artikullin</h1>
      <ArticleForm article={article} />
    </div>
  );
}
