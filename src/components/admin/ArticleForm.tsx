"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Save, Eye } from "lucide-react";

const TiptapEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

interface Category {
  id: string;
  name: string;
}

interface ArticleFormProps {
  article?: {
    id: string;
    title: string;
    content: string;
    excerpt?: string | null;
    thumbnail?: string | null;
    categoryId?: string | null;
    published: boolean;
  };
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [thumbnail, setThumbnail] = useState(article?.thumbnail || "");
  const [categoryId, setCategoryId] = useState(article?.categoryId || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  async function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const { url } = await res.json();
    if (url) setThumbnail(url);
  }

  async function handleSave(pub: boolean) {
    setSaving(true);

    const data = { title, content, excerpt, thumbnail, categoryId, published: pub };

    const url = article ? `/api/articles/${article.id}` : "/api/articles";
    const method = article ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/artikuj");
      router.refresh();
    } else {
      alert("Gabim gjatë ruajtjes.");
    }

    setSaving(false);
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Titulli</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-border rounded-lg px-4 py-3 text-lg font-headings focus:outline-none focus:border-secondary"
          placeholder="Titulli i artikullit..."
        />
      </div>

      {/* Editor */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Përmbajtja</label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Përshkrimi i shkurtër</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary resize-none"
            placeholder="Përshkrim i shkurtër për SEO..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Kategoria</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary bg-white"
          >
            <option value="">Pa kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-1.5 mt-4">Foto kryesore</label>
          {thumbnail && (
            <img src={thumbnail} alt="" className="w-full h-32 object-cover rounded-lg mb-2 border border-border" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="text-sm text-secondary"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <button
          onClick={() => handleSave(true)}
          disabled={saving || !title}
          className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Eye size={16} />
          {saving ? "Duke ruajtur..." : "Publiko"}
        </button>
        <button
          onClick={() => handleSave(false)}
          disabled={saving || !title}
          className="inline-flex items-center gap-2 bg-white text-primary text-sm font-medium px-5 py-2.5 rounded-full border border-border hover:bg-layout-bg disabled:opacity-50 transition-colors"
        >
          <Save size={16} />
          Ruaj si draft
        </button>
      </div>
    </div>
  );
}
