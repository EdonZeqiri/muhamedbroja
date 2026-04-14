"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Lecture {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnail: string;
}

export default function LecturesAdminPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/api/lectures")
      .then((r) => r.json())
      .then((data) => {
        setLectures(data);
        setLoading(false);
      });
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    setAdding(true);

    const res = await fetch("/api/lectures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), youtubeUrl: url.trim(), description }),
    });

    if (res.ok) {
      const lecture = await res.json();
      setLectures((prev) => [lecture, ...prev]);
      setTitle("");
      setUrl("");
      setDescription("");
    } else {
      const err = await res.json();
      alert(err.error || "Gabim");
    }
    setAdding(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("A jeni i sigurt?")) return;
    await fetch(`/api/lectures/${id}`, { method: "DELETE" });
    setLectures((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div>
      <h1 className="font-headings text-2xl font-medium mb-6">Ligjeratat</h1>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-white rounded-lg border border-border p-5 mb-6 space-y-3">
        <h2 className="font-headings text-base font-medium">Shto ligjeratë</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulli i ligjeratës..."
          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube URL (p.sh. https://www.youtube.com/watch?v=...)"
          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Përshkrimi (opsional)..."
          rows={2}
          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary resize-none"
        />
        <button
          type="submit"
          disabled={adding}
          className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Plus size={16} />
          {adding ? "Duke shtuar..." : "Shto ligjeratën"}
        </button>
      </form>

      {/* List */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">Duke ngarkuar...</div>
        ) : lectures.length === 0 ? (
          <div className="p-8 text-center text-secondary">Nuk ka ligjerata ende.</div>
        ) : (
          <div className="divide-y divide-border">
            {lectures.map((lecture) => (
              <div key={lecture.id} className="p-4 flex items-center gap-4">
                <img
                  src={lecture.thumbnail}
                  alt={lecture.title}
                  className="w-24 h-14 object-cover rounded border border-border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{lecture.title}</h3>
                  <p className="text-xs text-secondary truncate mt-1">{lecture.youtubeUrl}</p>
                </div>
                <button
                  onClick={() => handleDelete(lecture.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-secondary hover:text-red-600 transition-colors shrink-0"
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
