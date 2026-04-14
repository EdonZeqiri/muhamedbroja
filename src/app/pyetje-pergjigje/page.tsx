"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Question {
  id: string;
  question: string;
  answer: string;
}

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-border p-6 sm:p-8 mb-8">
          <h1 className="font-headings text-2xl sm:text-3xl font-medium mb-2">
            Pyetje & Përgjigje
          </h1>
          <p className="text-secondary text-sm">
            Përgjigje për pyetje të shpeshta rreth fesë islame.
          </p>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-border p-5 animate-pulse">
                  <div className="h-5 bg-layout-bg rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : questions.length === 0 ? (
            <div className="bg-white rounded-lg border border-border p-12 text-center">
              <p className="text-secondary">Nuk ka pyetje ende.</p>
            </div>
          ) : (
            questions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-lg border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === q.id ? null : q.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-layout-bg/50 transition-colors"
                >
                  <h2 className="font-headings text-base font-medium text-primary pr-4">
                    {q.question}
                  </h2>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-secondary transition-transform duration-200 ${
                      openId === q.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openId === q.id && (
                  <div className="px-5 pb-5 pt-0 border-t border-border">
                    <div
                      className="text-sm text-secondary leading-relaxed mt-4 article-content"
                      dangerouslySetInnerHTML={{ __html: q.answer }}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
