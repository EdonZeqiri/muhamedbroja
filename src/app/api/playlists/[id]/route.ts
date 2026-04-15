import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const playlist = await prisma.playlist.findUnique({
    where: { id: params.id },
    include: {
      lectures: { orderBy: { order: "asc" } },
    },
  });

  if (!playlist) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(playlist);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const playlist = await prisma.playlist.update({
    where: { id: params.id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.thumbnail && { thumbnail: data.thumbnail }),
    },
  });

  return NextResponse.json(playlist);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.playlist.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
