"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";

interface Question {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
}

export default function QuestionsAdminPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    const res = await fetch("/api/questions");
    const data = await res.json();
    setQuestions(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    if (editId) {
      const res = await fetch(`/api/questions/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      if (res.ok) {
        const updated = await res.json();
        setQuestions((prev) => prev.map((q) => (q.id === editId ? updated : q)));
      }
    } else {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer, order: questions.length }),
      });
      if (res.ok) {
        const newQ = await res.json();
        setQuestions((prev) => [...prev, newQ]);
      }
    }

    resetForm();
  }

  function resetForm() {
    setQuestion("");
    setAnswer("");
    setEditId(null);
    setShowForm(false);
  }

  function startEdit(q: Question) {
    setEditId(q.id);
    setQuestion(q.question);
    setAnswer(q.answer);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("A jeni i sigurt?")) return;
    await fetch(`/api/questions/${id}`, { method: "DELETE" });
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headings text-2xl font-medium">Pyetje & Përgjigje</h1>
        <button
          onClick={() => { setShowForm(!showForm); resetForm(); }}
          className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Mbyll" : "Shto pyetje"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-5 mb-6 space-y-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Pyetja..."
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
          />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Përgjigja (mundeni me përdor HTML)..."
            rows={5}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary resize-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
          >
            <Save size={16} />
            {editId ? "Përditëso" : "Ruaj"}
          </button>
        </form>
      )}

      {/* List */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">Duke ngarkuar...</div>
        ) : questions.length === 0 ? (
          <div className="p-8 text-center text-secondary">Nuk ka pyetje ende.</div>
        ) : (
          <div className="divide-y divide-border">
            {questions.map((q) => (
              <div key={q.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium">{q.question}</h3>
                    <p className="text-xs text-secondary mt-1 line-clamp-2">
                      {q.answer.replace(/<[^>]+>/g, "").slice(0, 100)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(q)}
                      className="p-2 rounded-lg hover:bg-layout-bg text-secondary hover:text-primary transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-secondary hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
