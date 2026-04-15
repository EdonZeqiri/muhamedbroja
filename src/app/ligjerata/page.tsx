export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Ligjerata Islame - Video nga Dr. Muhamed Broja",
  description:
    "Seritë e ligjeratave dhe mësimeve islame nga Dr. Muhamed Broja në YouTube. Tefsir, hadith, fikh dhe tema të ndryshme islame në gjuhën shqipe.",
  openGraph: {
    title: "Ligjerata Islame | Dr. Muhamed Broja",
    description:
      "Seritë e ligjeratave dhe mësimeve islame nga Dr. Muhamed Broja në YouTube.",
    locale: "sq_AL",
  },
  twitter: {
    card: "summary",
    title: "Ligjerata Islame - Dr. Muhamed Broja",
    description:
      "Ligjerata dhe mësime islame në gjuhën shqipe nga Dr. Muhamed Broja.",
  },
  alternates: {
    canonical: "/ligjerata",
  },
};

export default async function LecturePage() {
  const playlists = await prisma.playlist.findMany({
    include: {
      _count: { select: { lectures: true } },
      lectures: { take: 1, orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ligjerata - Dr. Muhamed Broja",
    description: "Seritë e ligjeratave dhe mësimeve islame nga Dr. Muhamed Broja në YouTube.",
    url: "https://muhamedbroja.com/ligjerata",
    mainEntity: playlists.map((pl) => ({
      "@type": "ItemList",
      name: pl.title,
      numberOfItems: pl._count.lectures,
      url: `https://muhamedbroja.com/ligjerata/${pl.id}`,
    })),
  };

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Ligjerata
        </h1>
        <p className="text-secondary text-sm">
          Seritë e ligjeratave dhe mësimeve islame në kanalin tonë të YouTube.
        </p>
      </div>

      {playlists.length === 0 ? (
        <div className="bg-white/70 rounded-2xl border border-accent/10 p-12 text-center">
          <p className="text-secondary">Nuk ka seri ende.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => {
            const thumb = playlist.thumbnail ||
              (playlist.lectures[0]?.thumbnail) ||
              null;

            return (
              <Link
                key={playlist.id}
                href={`/ligjerata/${playlist.id}`}
                className="group bg-white/70 rounded-2xl border border-accent/10 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-layout-bg">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={playlist.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-secondary opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                      </svg>
                    </div>
                  )}
                  {/* Playlist icon overlay */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4zm14 0v6l5-3z" />
                    </svg>
                    {playlist._count.lectures} video
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-base text-primary group-hover:text-secondary transition-colors leading-snug">
                    {playlist.title}
                  </h2>
                  {playlist.description && (
                    <p className="text-sm text-secondary mt-2 line-clamp-2">
                      {playlist.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Subscribe CTA */}
      <div className="mt-12 text-center">
        <a
          href="https://www.youtube.com/@dr.muhamedbroja?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Abonohu në YouTube
        </a>
      </div>
    </div>
  );
}
