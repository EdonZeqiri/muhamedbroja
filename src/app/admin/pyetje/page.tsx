"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, Edit, Save, X, FileText, Eye, EyeOff } from "lucide-react";
import PreviewModal from "@/components/admin/PreviewModal";

const TiptapEditor = dynamic(
  () => import("@/components/admin/TiptapEditor"),
  { ssr: false }
);

const ANSWER_TEMPLATE = `<p>Alejkum selam ve rahmetullah.</p>
<p></p>
<p></p>
<p>Allahu e di me se miri.</p>`;

interface Question {
  id: string;
  question: string;
  questionDetail: string | null;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

export default function QuestionsAdminPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [questionDetail, setQuestionDetail] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("Te pergjithshme");
  const [tab, setTab] = useState<"all" | "pending">("all");
  const [previewQ, setPreviewQ] = useState<Question | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    const res = await fetch("/api/questions?all=true");
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
        body: JSON.stringify({
          question,
          questionDetail: questionDetail || null,
          answer,
          category,
          published: true,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setQuestions((prev) =>
          prev.map((q) => (q.id === editId ? updated : q))
        );
      }
    } else {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          questionDetail: questionDetail || null,
          answer,
          category,
          order: questions.length,
        }),
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
    setQuestionDetail("");
    setAnswer("");
    setCategory("Te pergjithshme");
    setEditId(null);
    setShowForm(false);
  }

  function startNew() {
    resetForm();
    setAnswer(ANSWER_TEMPLATE);
    setShowForm(true);
  }

  function startEdit(q: Question) {
    setEditId(q.id);
    setQuestion(q.question);
    setQuestionDetail(q.questionDetail || "");
    setAnswer(q.answer || ANSWER_TEMPLATE);
    setCategory(q.category);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("A jeni i sigurt?")) return;
    await fetch(`/api/questions/${id}`, { method: "DELETE" });
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  async function togglePublish(q: Question) {
    const res = await fetch(`/api/questions/${q.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !q.published }),
    });
    if (res.ok) {
      const updated = await res.json();
      setQuestions((prev) => prev.map((x) => (x.id === q.id ? updated : x)));
    }
  }

  const pendingCount = questions.filter((q) => !q.published).length;
  const filtered =
    tab === "pending" ? questions.filter((q) => !q.published) : questions;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-headings text-2xl font-medium">
            Pyetje & Përgjigje
          </h1>
          {pendingCount > 0 && (
            <p className="text-sm text-accent mt-1">
              {pendingCount} pyetje në pritje për përgjigje
            </p>
          )}
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Mbyll" : "Shto pyetje"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setTab("all")}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            tab === "all"
              ? "bg-primary text-white"
              : "bg-white border border-border text-secondary hover:text-primary"
          }`}
        >
          Të gjitha ({questions.length})
        </button>
        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            tab === "pending"
              ? "bg-accent text-white"
              : "bg-white border border-border text-secondary hover:text-primary"
          }`}
        >
          Në pritje ({pendingCount})
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-border p-5 mb-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Titulli i pyetjes
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Pyetja e shkurtër (shfaqet në listë)..."
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Pyetja e plotë{" "}
              <span className="text-secondary font-normal">(opsionale)</span>
            </label>
            <TiptapEditor
              content={questionDetail}
              onChange={setQuestionDetail}
              placeholder="Detajet e pyetjes..."
              compact
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Kategoria
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="psh. Agjërim, Namaz, Familje..."
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium">Përgjigja</label>
              {!editId && (
                <button
                  type="button"
                  onClick={() => setAnswer(ANSWER_TEMPLATE)}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                >
                  <FileText size={12} />
                  Përdor template
                </button>
              )}
            </div>
            <TiptapEditor
              content={answer}
              onChange={setAnswer}
              placeholder="Shkruaj përgjigjen..."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={!question.trim() || !answer.trim()}
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Save size={16} />
              {editId ? "Përditëso & Publiko" : "Ruaj & Publiko"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Anulo
            </button>
            <button
              type="button"
              onClick={() =>
                setPreviewQ({
                  id: editId || "preview",
                  question,
                  questionDetail: questionDetail || null,
                  answer,
                  category,
                  order: 0,
                  published: false,
                })
              }
              disabled={!question.trim()}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 disabled:opacity-50 transition-colors ml-auto"
            >
              <Eye size={14} />
              Shiko si duket
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">
            Duke ngarkuar...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-secondary">
            {tab === "pending"
              ? "Nuk ka pyetje në pritje."
              : "Nuk ka pyetje ende."}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((q) => (
              <div key={q.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-medium">{q.question}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium shrink-0">
                        {q.category}
                      </span>
                      {!q.published && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium shrink-0">
                          Në pritje
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary line-clamp-2">
                      {q.answer
                        ? q.answer.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
                        : "Pa përgjigje ende"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => togglePublish(q)}
                      title={q.published ? "Çpubliko" : "Publiko"}
                      className={`p-2 rounded-lg transition-colors ${
                        q.published
                          ? "hover:bg-layout-bg text-green-600"
                          : "hover:bg-green-50 text-secondary hover:text-green-600"
                      }`}
                    >
                      {q.published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
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

      {/* Preview Modal */}
      <PreviewModal
        open={!!previewQ}
        onClose={() => setPreviewQ(null)}
      >
        {previewQ && (
          <div className="max-w-3xl mx-auto">
            {/* Question Card */}
            <div className="bg-accent/[0.06] rounded-2xl border border-accent/15 p-6 sm:p-8 mb-8">
              <span className="text-xs font-medium text-accent uppercase tracking-wider mb-3 block">
                Pyetja
              </span>
              <h1 className="font-headings text-xl sm:text-2xl font-medium leading-tight text-primary">
                {previewQ.question}
              </h1>
              <div className="flex items-center gap-3 mt-4 text-xs text-secondary">
                <span className="px-2.5 py-1 rounded-full bg-white/80 border border-accent/10 font-medium">
                  {previewQ.category}
                </span>
                <time>
                  {new Date().toLocaleDateString("sq-AL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              {previewQ.questionDetail && (
                <div
                  className="mt-6 pt-5 border-t border-accent/10 font-serif text-[15px] text-primary/80 leading-relaxed [&_p]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2"
                  dangerouslySetInnerHTML={{ __html: previewQ.questionDetail }}
                />
              )}
            </div>

            {/* Answer */}
            <div className="bg-white/70 rounded-2xl border border-accent/10 p-6 sm:p-8">
              <span className="text-xs font-medium text-accent uppercase tracking-wider mb-4 block">
                Përgjigja
              </span>
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: previewQ.answer || "<p>Pa përgjigje ende...</p>",
                }}
              />
              <div className="mt-6 pt-4 border-t border-border text-sm text-secondary">
                Përgjigjet nga{" "}
                <span className="font-medium text-primary">
                  Dr. Muhamed Broja
                </span>
              </div>
            </div>
          </div>
        )}
      </PreviewModal>
    </div>
  );
}
