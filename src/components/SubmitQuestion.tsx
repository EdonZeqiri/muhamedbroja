"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function SubmitQuestion() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/questions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || "Anonim", question: question.trim() }),
      });
      if (res.ok) {
        setSent(true);
        setName("");
        setQuestion("");
      }
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white/70 rounded-2xl border border-accent/10 p-8 text-center">
        <CheckCircle size={32} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-headings text-lg font-medium mb-1">
          Pyetja u dërgua me sukses!
        </h3>
        <p className="text-sm text-secondary mb-4">
          Hoxha do ta shqyrtojë pyetjen tuaj dhe do të publikojë përgjigjen.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-accent hover:text-accent/80 font-medium transition-colors"
        >
          Dërgo pyetje tjetër
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 p-4 bg-accent/[0.06] rounded-2xl border border-accent/15 hover:bg-accent/10 transition-colors group"
      >
        <Send size={16} className="text-accent" />
        <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
          Dërgo pyetje hoxhës
        </span>
      </button>
    );
  }

  return (
    <div className="bg-white/70 rounded-2xl border border-accent/10 p-6">
      <h3 className="font-headings text-lg font-medium mb-1">
        Dërgo pyetje hoxhës
      </h3>
      <p className="text-xs text-secondary mb-5">
        Pyetja juaj do të shqyrtohet dhe përgjigja do të publikohet këtu.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Emri (opsionale)"
          className="w-full bg-white/80 border border-accent/15 rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-accent/30 focus:bg-white transition-colors"
        />
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Shkruani pyetjen tuaj..."
          rows={4}
          required
          className="w-full bg-white/80 border border-accent/15 rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-accent/30 focus:bg-white transition-colors resize-none"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={14} />
            {loading ? "Duke dërguar..." : "Dërgo"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm text-secondary hover:text-primary transition-colors"
          >
            Anulo
          </button>
        </div>
      </form>
    </div>
  );
}
