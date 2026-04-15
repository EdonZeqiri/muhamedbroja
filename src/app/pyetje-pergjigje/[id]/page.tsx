export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: QuestionPageProps): Promise<Metadata> {
  const question = await prisma.question.findUnique({
    where: { id: params.id, published: true },
  });

  if (!question) return { title: "Pyetja nuk u gjet" };

  const description = question.answer.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title: question.question,
    description,
    openGraph: {
      title: `${question.question} - Përgjigje Islame`,
      description,
      type: "article",
      locale: "sq_AL",
    },
    twitter: {
      card: "summary",
      title: question.question,
      description,
    },
    alternates: {
      canonical: `/pyetje-pergjigje/${question.id}`,
    },
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const question = await prisma.question.findUnique({
    where: { id: params.id, published: true },
  });

  if (!question) notFound();

  // Get adjacent questions for navigation
  const allQuestions = await prisma.question.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: { id: true, question: true },
  });

  const currentIndex = allQuestions.findIndex((q) => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const nextQuestion =
    currentIndex < allQuestions.length - 1
      ? allQuestions[currentIndex + 1]
      : null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: {
        "@type": "Question",
        name: question.question,
        text: question.questionDetail
          ? question.questionDetail.replace(/<[^>]+>/g, "")
          : question.question,
        dateCreated: question.createdAt.toISOString(),
        answerCount: 1,
        acceptedAnswer: {
          "@type": "Answer",
          text: question.answer.replace(/<[^>]+>/g, ""),
          dateCreated: question.createdAt.toISOString(),
          author: {
            "@type": "Person",
            name: "Dr. Muhamed Broja",
            url: "https://muhamedbroja.com/biografia",
            image: "https://muhamedbroja.com/images/muhamed-broja.jpg",
            jobTitle: "Imam dhe Ligjerues",
          },
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Pyetje & Përgjigje",
          item: "https://muhamedbroja.com/pyetje-pergjigje",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: question.question,
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/pyetje-pergjigje"
          className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Kthehu te pyetjet
        </Link>

        {/* Question Card */}
        <div className="bg-accent/[0.06] rounded-2xl border border-accent/15 p-6 sm:p-8 mb-8">
          <span className="text-xs font-medium text-accent uppercase tracking-wider mb-3 block">
            Pyetja
          </span>
          <h1 className="font-headings text-xl sm:text-2xl font-medium leading-tight text-primary">
            {question.question}
          </h1>
          <div className="flex items-center gap-3 mt-4 text-xs text-secondary">
            <span className="px-2.5 py-1 rounded-full bg-white/80 border border-accent/10 font-medium">
              {question.category}
            </span>
            <time>
              {new Date(question.createdAt).toLocaleDateString("sq-AL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {question.questionDetail && (
            <div
              className="mt-6 pt-5 border-t border-accent/10 font-serif text-[15px] text-primary/80 leading-relaxed [&_p]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2"
              dangerouslySetInnerHTML={{ __html: question.questionDetail }}
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
            dangerouslySetInnerHTML={{ __html: question.answer }}
          />
          <div className="mt-6 pt-4 border-t border-border text-sm text-secondary">
            Përgjigjet nga{" "}
            <span className="font-medium text-primary">Dr. Muhamed Broja</span>
          </div>
        </div>

        {/* Navigation between questions */}
        {(prevQuestion || nextQuestion) && (
          <div className="flex items-stretch gap-3 mt-8">
            {prevQuestion ? (
              <Link
                href={`/pyetje-pergjigje/${prevQuestion.id}`}
                className="flex-1 group flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-accent/10 hover:border-accent/20 hover:bg-white transition-all"
              >
                <ChevronLeft
                  size={16}
                  className="shrink-0 text-secondary/40 group-hover:text-accent transition-colors"
                />
                <div className="min-w-0">
                  <span className="text-[11px] text-secondary/60 uppercase tracking-wider">
                    Para
                  </span>
                  <p className="text-sm font-medium text-primary leading-snug line-clamp-2">
                    {prevQuestion.question}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextQuestion ? (
              <Link
                href={`/pyetje-pergjigje/${nextQuestion.id}`}
                className="flex-1 group flex items-center justify-end gap-3 p-4 bg-white/70 rounded-xl border border-accent/10 hover:border-accent/20 hover:bg-white transition-all text-right"
              >
                <div className="min-w-0">
                  <span className="text-[11px] text-secondary/60 uppercase tracking-wider">
                    Tjetra
                  </span>
                  <p className="text-sm font-medium text-primary leading-snug line-clamp-2">
                    {nextQuestion.question}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="shrink-0 text-secondary/40 group-hover:text-accent transition-colors"
                />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
