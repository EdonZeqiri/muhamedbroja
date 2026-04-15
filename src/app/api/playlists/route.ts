import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function extractPlaylistId(url: string): string | null {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export async function GET() {
  const playlists = await prisma.playlist.findMany({
    include: { _count: { select: { lectures: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(playlists);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, youtubeUrl, description, thumbnail } = await req.json();

  if (!title || !youtubeUrl) {
    return NextResponse.json({ error: "Titulli dhe URL e playlist-ës janë të detyrueshme" }, { status: 400 });
  }

  const youtubePlaylistId = extractPlaylistId(youtubeUrl);
  if (!youtubePlaylistId) {
    return NextResponse.json({ error: "URL e YouTube playlist-ës nuk është valide" }, { status: 400 });
  }

  const existing = await prisma.playlist.findUnique({ where: { youtubePlaylistId } });
  if (existing) {
    return NextResponse.json({ error: "Kjo playlist ekziston tashmë" }, { status: 409 });
  }

  const playlistThumbnail = thumbnail || `https://img.youtube.com/vi/default/maxresdefault.jpg`;

  const playlist = await prisma.playlist.create({
    data: {
      title,
      youtubePlaylistId,
      thumbnail: playlistThumbnail,
      description,
    },
  });

  return NextResponse.json(playlist, { status: 201 });
}
