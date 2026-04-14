"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { articles: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });

    if (res.ok) {
      const cat = await res.json();
      setCategories((prev) => [...prev, { ...cat, _count: { articles: 0 } }]);
      setNewName("");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("A jeni i sigurt? Artikujt do të mbeten pa kategori.")) return;

    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <h1 className="font-headings text-2xl font-medium mb-6">Kategoritë</h1>

      {/* Add Category */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Emri i kategorisë..."
          className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Shto
        </button>
      </form>

      {/* List */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">Duke ngarkuar...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-secondary">Nuk ka kategori ende.</div>
        ) : (
          <div className="divide-y divide-border">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{cat.name}</h3>
                  <p className="text-xs text-secondary mt-1">
                    {cat._count.articles} artikuj &middot; /{cat.slug}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-secondary hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
