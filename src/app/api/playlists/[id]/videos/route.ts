import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, youtubeUrl, description } = await req.json();

  if (!title || !youtubeUrl) {
    return NextResponse.json({ error: "Titulli dhe URL janë të detyrueshme" }, { status: 400 });
  }

  const youtubeId = extractYoutubeId(youtubeUrl);
  if (!youtubeId) {
    return NextResponse.json({ error: "URL e YouTube nuk është valide" }, { status: 400 });
  }

  const playlist = await prisma.playlist.findUnique({ where: { id: params.id } });
  if (!playlist) {
    return NextResponse.json({ error: "Playlist nuk u gjet" }, { status: 404 });
  }

  const lastLecture = await prisma.lecture.findFirst({
    where: { playlistId: params.id },
    orderBy: { order: "desc" },
  });

  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  const lecture = await prisma.lecture.create({
    data: {
      title,
      youtubeUrl,
      youtubeId,
      thumbnail,
      description,
      order: (lastLecture?.order ?? -1) + 1,
      playlistId: params.id,
    },
  });

  // Update playlist thumbnail to the first video's thumbnail if not set
  if (!playlist.thumbnail || playlist.thumbnail.includes("default/maxresdefault")) {
    await prisma.playlist.update({
      where: { id: params.id },
      data: { thumbnail },
    });
  }

  return NextResponse.json(lecture, { status: 201 });
}
