import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const questions = await prisma.question.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { question, answer, order, published } = await req.json();

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
  }

  const q = await prisma.question.create({
    data: { question, answer, order: order ?? 0, published: published ?? true },
  });

  return NextResponse.json(q, { status: 201 });
}
