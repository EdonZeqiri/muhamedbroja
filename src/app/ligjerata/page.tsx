export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Ligjerata",
  description: "Ligjerata dhe mësime islame nga Dr. Muhamed Broja në YouTube.",
  openGraph: {
    title: "Ligjerata | Dr. Muhamed Broja",
    description: "Ligjerata dhe mësime islame nga Dr. Muhamed Broja në YouTube.",
    locale: "sq_AL",
  },
  alternates: {
    canonical: "/ligjerata",
  },
};

export default async function LecturePage() {
  const lectures = await prisma.lecture.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <div className="bg-white rounded-lg border border-border p-6 sm:p-8 mb-8">
        <h1 className="font-headings text-2xl sm:text-3xl font-medium mb-2">
          Ligjerata
        </h1>
        <p className="text-secondary text-sm">
          Ndiqni ligjëratat dhe mësimet islame në kanalin tonë të YouTube.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <a
            key={lecture.id}
            href={lecture.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-layout-bg">
              <Image
                src={lecture.thumbnail}
                alt={lecture.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-headings text-base font-medium text-primary group-hover:text-secondary transition-colors leading-snug">
                {lecture.title}
              </h2>
              {lecture.description && (
                <p className="text-sm text-secondary mt-2 line-clamp-2">
                  {lecture.description}
                </p>
              )}
            </div>
          </a>
        ))}

        {lectures.length === 0 && (
          <div className="col-span-full bg-white rounded-lg border border-border p-12 text-center">
            <p className="text-secondary">Nuk ka ligjerata ende.</p>
          </div>
        )}
      </div>
    </div>
  );
}
