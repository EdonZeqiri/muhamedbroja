import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export async function GET() {
  const lectures = await prisma.lecture.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(lectures);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, youtubeUrl, description } = await req.json();

  if (!title || !youtubeUrl) {
    return NextResponse.json({ error: "Title and YouTube URL are required" }, { status: 400 });
  }

  const youtubeId = extractYoutubeId(youtubeUrl);
  if (!youtubeId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  const lecture = await prisma.lecture.create({
    data: { title, youtubeUrl, youtubeId, thumbnail, description },
  });

  return NextResponse.json(lecture, { status: 201 });
}
