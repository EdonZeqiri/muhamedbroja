export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com";

  const [articles, questions, playlists] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.question.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),
    prisma.playlist.findMany({
      include: {
        lectures: { orderBy: { order: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  let content = `# Dr. Muhamed Broja - Përmbajtja e plotë

> Faqja zyrtare e Dr. Muhamed Broja - Imam dhe ligjerues në Mitrovicë, Kosovë. Diplomuar në Universitetin Islamik të Medinës në fakultetin e Hadithit. Doktor i shkencave islame.

Ky dokument përmban të gjitha shkrimet, pyetjet e përgjigjet, dhe ligjeratat e disponueshme në ${baseUrl}

---

## Biografia

Dr. Muhamed Broja lindi në Mitrovicë (09.04.1981). Shkollën fillore e kreu në vendlindje, ndërsa të mesmen në Medresenë "Alauddin" në Prishtinë. Studimet e gjuhës arabe i vazhdoi në Mbretërinë e Jordanisë, për të vazhduar më pas studimet univerzitare në Universitetin Islamik të Medinës ku diplomoi në vitin 2005, në fakultetin e Hadithit.

Studimet pasuniverzitare i vazhdoi në po të njëjtin fakultet në katedrën Fikhus-Sunneh (Fikhu i Haditheve).

Temën e magjistraturës e mbrojti në degën e hadithit: "Tahkik (recensim) i një pjese të komentimit të Nesaiut, të autorit Abdurrahman el-Behkeli (nxënës i Sheukanit)".

Studimet i përmbylli me doktoratë me temën "Qartësimi i haditheve me hadithe të tjera në kapitullin e kurorëzimit dhe shkurorëzimit dhe kapitujve çka lidhen me to".

Tani jeton dhe vepron në qytetin e Mitrovicës ku shërben si imam dhe ligjerues.

---

## Shkrime Islame

`;

  for (const article of articles) {
    const date = article.createdAt.toISOString().split("T")[0];
    const category = article.category?.name || "";
    const plainContent = stripHtml(article.content);

    content += `### ${article.title}\n\n`;
    content += `- URL: ${baseUrl}/shkrime/${article.slug}\n`;
    content += `- Data: ${date}\n`;
    if (category) content += `- Kategoria: ${category}\n`;
    content += `- Autor: ${article.author}\n\n`;
    content += `${plainContent}\n\n---\n\n`;
  }

  content += `## Pyetje & Përgjigje Islame\n\n`;

  const categories = Array.from(new Set(questions.map((q) => q.category || "Te pergjithshme")));

  for (const cat of categories) {
    content += `### Kategoria: ${cat}\n\n`;

    const catQuestions = questions.filter(
      (q) => (q.category || "Te pergjithshme") === cat
    );

    for (const q of catQuestions) {
      const plainAnswer = stripHtml(q.answer);
      content += `**Pyetja: ${q.question}**\n\n`;
      content += `URL: ${baseUrl}/pyetje-pergjigje/${q.id}\n\n`;
      if (q.questionDetail) {
        content += `Detajet e pyetjes: ${stripHtml(q.questionDetail)}\n\n`;
      }
      content += `Përgjigja nga Dr. Muhamed Broja:\n${plainAnswer}\n\n---\n\n`;
    }
  }

  content += `## Ligjerata\n\n`;

  for (const playlist of playlists) {
    content += `### ${playlist.title}\n\n`;
    if (playlist.description) {
      content += `${playlist.description}\n\n`;
    }
    content += `- URL: ${baseUrl}/ligjerata/${playlist.id}\n`;
    content += `- Video: ${playlist.lectures.length}\n\n`;

    for (const lecture of playlist.lectures) {
      content += `${lecture.order}. ${lecture.title}\n`;
      content += `   YouTube: https://www.youtube.com/watch?v=${lecture.youtubeId}\n`;
    }
    content += `\n---\n\n`;
  }

  content += `## Kontakt dhe Rrjete Sociale

- Facebook: https://www.facebook.com/muhamedbroja
- YouTube: https://www.youtube.com/@dr.muhamedbroja
- Faqja zyrtare: ${baseUrl}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
