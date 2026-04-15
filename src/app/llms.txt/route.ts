export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com";

  const [articleCount, questionCount, playlistCount] = await Promise.all([
    prisma.article.count({ where: { published: true } }),
    prisma.question.count({ where: { published: true } }),
    prisma.playlist.count(),
  ]);

  const content = `# Dr. Muhamed Broja

> Faqja zyrtare e Dr. Muhamed Broja - Imam dhe ligjerues në Mitrovicë, Kosovë. Diplomuar në Universitetin Islamik të Medinës në fakultetin e Hadithit. Doktor i shkencave islame.

Ky sajt ofron shkrime, ligjerata, dhe përgjigje për pyetje rreth fesë islame në gjuhën shqipe.

## Rreth autorit

Dr. Muhamed Broja lindi në Mitrovicë (09.04.1981). Shkollën fillore e kreu në vendlindje, ndërsa të mesmen në Medresenë "Alauddin" në Prishtinë. Studimet e gjuhës arabe i vazhdoi në Mbretërinë e Jordanisë, për të vazhduar më pas studimet univerzitare në Universitetin Islamik të Medinës ku diplomoi në vitin 2005, në fakultetin e Hadithit. Studimet pasuniverzitare i vazhdoi në po të njëjtin fakultet në katedrën Fikhus-Sunneh. Tani jeton dhe vepron në qytetin e Mitrovicës ku shërben si imam dhe ligjerues.

## Përmbajtja

- Shkrime Islame: ${articleCount} artikuj të publikuar rreth temave islame
- Pyetje & Përgjigje: ${questionCount} pyetje me përgjigje profesionale rreth fesë islame
- Ligjerata: ${playlistCount} seri ligjeratash në YouTube

## Lidhje

- Shkrime: ${baseUrl}/
- Ligjerata: ${baseUrl}/ligjerata
- Pyetje & Përgjigje: ${baseUrl}/pyetje-pergjigje
- Biografia: ${baseUrl}/biografia
- Versioni i plotë për LLM: ${baseUrl}/llms-full.txt
- Facebook: https://www.facebook.com/muhamedbroja
- YouTube: https://www.youtube.com/@dr.muhamedbroja
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
