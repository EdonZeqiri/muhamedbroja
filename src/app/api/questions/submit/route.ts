import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyNewQuestion } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { name, question } = await req.json();

  if (!question || typeof question !== "string" || question.trim().length < 5) {
    return NextResponse.json(
      { error: "Pyetja duhet të ketë së paku 5 karaktere" },
      { status: 400 }
    );
  }

  const senderName = (name || "").trim() || "Anonim";

  await prisma.question.create({
    data: {
      question: question.trim(),
      questionDetail: name ? `<p>Pyetje nga: ${senderName}</p>` : null,
      answer: "",
      published: false,
      order: 999,
    },
  });

  // Send email notification (non-blocking)
  notifyNewQuestion(senderName, question.trim()).catch(() => {});

  return NextResponse.json({ success: true }, { status: 201 });
}
