"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Question {
  id: string;
  question: string;
  answer: string;
}

export default function QAAccordion({ questions }: { questions: Question[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (questions.length === 0) {
    return (
      <div className="bg-white/70 rounded-2xl border border-accent/10 p-12 text-center">
        <p className="text-secondary">Nuk ka pyetje ende.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <div
          key={q.id}
          className="bg-white/70 rounded-2xl border border-accent/10 overflow-hidden"
        >
          <button
            onClick={() => setOpenId(openId === q.id ? null : q.id)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-layout-bg/50 transition-colors"
          >
            <h2 className="font-bold text-base text-primary pr-4">
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
                className="font-serif text-base text-[#242424] leading-[1.58] mt-4 [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: q.answer }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
