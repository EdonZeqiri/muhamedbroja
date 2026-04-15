"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";

interface Question {
  id: string;
  question: string;
  category: string;
  date: string;
}

export default function QAList({ questions }: { questions: Question[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? questions.filter((q) =>
        q.question.toLowerCase().includes(query.toLowerCase())
      )
    : questions;

  const categories = Array.from(
    new Set(filtered.map((q) => q.category || "Te pergjithshme"))
  );

  return (
    <>
      {/* Search */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kërko pyetje..."
            className="w-full bg-white/80 border border-accent/15 rounded-full px-5 py-2.5 pl-10 pr-10 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-accent/30 focus:bg-white transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-secondary"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      {categories.length > 1 && (
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = filtered.filter(
                (q) => (q.category || "Te pergjithshme") === cat
              ).length;
              return (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-white/80 border border-accent/15 text-primary hover:border-accent/30 hover:bg-white transition-colors"
                >
                  {cat}
                  <span className="ml-1.5 text-secondary/60">{count}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Questions by Category */}
      <div className="max-w-3xl mx-auto space-y-10">
        {categories.map((cat) => {
          const catQuestions = filtered.filter(
            (q) => (q.category || "Te pergjithshme") === cat
          );
          return (
            <section
              key={cat}
              id={cat.toLowerCase().replace(/\s+/g, "-")}
              className="scroll-mt-24"
            >
              <h2 className="font-headings text-lg font-medium text-primary mb-4 pb-3 border-b border-border">
                {cat}
              </h2>
              <div className="space-y-2">
                {catQuestions.map((q) => (
                  <Link
                    key={q.id}
                    href={`/pyetje-pergjigje/${q.id}`}
                    className="group flex items-center justify-between gap-4 p-4 bg-white/70 rounded-xl border border-accent/10 hover:border-accent/20 hover:bg-white transition-all"
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium text-[15px] text-primary group-hover:text-accent transition-colors leading-snug">
                        {q.question}
                      </h3>
                      <span className="text-xs text-secondary/60 mt-1 block">
                        {q.date}
                      </span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-secondary/40 group-hover:text-accent transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white/60 rounded-2xl border border-accent/10 p-12 text-center">
            <p className="text-secondary">
              {query
                ? "Nuk u gjet asnjë pyetje me këtë kërkim."
                : "Nuk ka pyetje ende."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
