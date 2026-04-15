export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MessageCircleQuestion } from "lucide-react";
import QAList from "@/components/QAList";
import SubmitQuestion from "@/components/SubmitQuestion";

export const metadata: Metadata = {
  title: "Pyetje & Përgjigje Islame - Fetva nga Dr. Muhamed Broja",
  description:
    "Përgjigje për pyetje të shpeshta rreth fesë islame nga Dr. Muhamed Broja. Pyetje rreth namazit, agjërimit, familjes, zekatit dhe temave të tjera islame.",
  openGraph: {
    title: "Pyetje & Përgjigje Islame | Dr. Muhamed Broja",
    description:
      "Përgjigje profesionale për pyetje rreth fesë islame nga Dr. Muhamed Broja.",
    locale: "sq_AL",
  },
  twitter: {
    card: "summary",
    title: "Pyetje & Përgjigje Islame - Dr. Muhamed Broja",
    description:
      "Përgjigje për pyetje rreth fesë islame në gjuhën shqipe.",
  },
  alternates: {
    canonical: "/pyetje-pergjigje",
  },
};

export default async function QAPage() {
  const questions = await prisma.question.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer.replace(/<[^>]+>/g, ""),
      },
    })),
  };

  const serialized = questions.map((q) => ({
    id: q.id,
    question: q.question,
    category: q.category || "Te pergjithshme",
    date: q.createdAt.toLocaleDateString("sq-AL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <MessageCircleQuestion size={20} className="text-accent" />
          </div>
          <h1 className="font-headings text-2xl sm:text-3xl font-medium tracking-[-0.02em]">
            Pyetje & Përgjigje
          </h1>
        </div>
        <p className="text-secondary text-sm ml-[52px]">
          Përgjigje për pyetje të shpeshta rreth fesë islame nga Dr. Muhamed
          Broja.
        </p>
      </div>

      {/* Search + Questions */}
      <QAList questions={serialized} />

      {/* Submit Question */}
      <div className="max-w-3xl mx-auto mt-10">
        <SubmitQuestion />
      </div>
    </div>
  );
}
