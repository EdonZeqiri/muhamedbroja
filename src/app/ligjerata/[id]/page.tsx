export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface PlaylistPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PlaylistPageProps): Promise<Metadata> {
  const playlist = await prisma.playlist.findUnique({
    where: { id: params.id },
    select: { title: true, description: true },
  });

  if (!playlist) return { title: "Nuk u gjet" };

  return {
    title: playlist.title,
    description: playlist.description || `Ligjerata nga seria "${playlist.title}" - Dr. Muhamed Broja`,
    openGraph: {
      title: `${playlist.title} | Dr. Muhamed Broja`,
      description: playlist.description || `Ligjerata nga seria "${playlist.title}"`,
      locale: "sq_AL",
    },
    alternates: {
      canonical: `/ligjerata/${params.id}`,
    },
  };
}

export default async function PlaylistDetailPage({ params }: PlaylistPageProps) {
  const playlist = await prisma.playlist.findUnique({
    where: { id: params.id },
    include: {
      lectures: { orderBy: { order: "asc" } },
    },
  });

  if (!playlist) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: playlist.title,
    description: playlist.description || `Ligjerata nga seria "${playlist.title}"`,
    numberOfItems: playlist.lectures.length,
    itemListElement: playlist.lectures.map((lecture, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: lecture.title,
        description: lecture.description || lecture.title,
        thumbnailUrl: lecture.thumbnail,
        url: lecture.youtubeUrl,
      },
    })),
  };

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back link */}
      <Link
        href="/ligjerata"
        className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Të gjitha seritë
      </Link>

      {/* Playlist header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {playlist.title}
        </h1>
        {playlist.description && (
          <p className="text-secondary">{playlist.description}</p>
        )}
        <p className="text-sm text-secondary mt-2">
          {playlist.lectures.length} video
        </p>
      </div>

      {playlist.lectures.length === 0 ? (
        <div className="bg-white/70 rounded-2xl border border-accent/10 p-12 text-center">
          <p className="text-secondary">Nuk ka video ende në këtë seri.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {playlist.lectures.map((lecture, index) => (
            <a
              key={lecture.id}
              href={lecture.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 bg-white/70 rounded-2xl border border-accent/10 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Number */}
              <div className="flex items-center justify-center w-12 shrink-0 text-sm font-medium text-secondary">
                {index + 1}
              </div>

              {/* Thumbnail */}
              <div className="relative w-40 sm:w-48 shrink-0 aspect-video bg-layout-bg">
                <Image
                  src={lecture.thumbnail}
                  alt={lecture.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 py-3 pr-4">
                <h2 className="font-bold text-sm sm:text-base text-primary group-hover:text-secondary transition-colors leading-snug">
                  {lecture.title}
                </h2>
                {lecture.description && (
                  <p className="text-xs sm:text-sm text-secondary mt-1 line-clamp-2">
                    {lecture.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Watch on YouTube */}
      <div className="mt-8 text-center">
        <a
          href={`https://www.youtube.com/playlist?list=${playlist.youtubePlaylistId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Shiko playlistën në YouTube
        </a>
      </div>
    </div>
  );
}
