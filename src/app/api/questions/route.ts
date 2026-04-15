import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const showAll = req.nextUrl.searchParams.get("all") === "true";

  if (showAll) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const questions = await prisma.question.findMany({
    where: showAll ? {} : { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { question, questionDetail, answer, order, published, category } = await req.json();

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
  }

  const q = await prisma.question.create({
    data: {
      question,
      questionDetail: questionDetail || null,
      answer,
      order: order ?? 0,
      published: published ?? true,
      ...(category && { category }),
    },
  });

  return NextResponse.json(q, { status: 201 });
}
