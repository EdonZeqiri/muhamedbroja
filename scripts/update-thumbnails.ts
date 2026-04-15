import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com";

// Slug -> image filename mapping (from WordPress backup)
const thumbnailMap: Record<string, string> = {
  "a-eshte-toka-e-rrumbullaket": "a-eshte-toka-e-rrumbullaket.jpg",
  "ambiciet-e-larta-per-dituri-ne-kohe-vape": "ambiciet-e-larta-per-dituri-ne-kohe-vape.jpg",
  "begatia-e-perudhjes-ne-fe": "begatia-e-perudhjes-ne-fe.jpg",
  "gjenerata-e-tik-tokut-dhe-vjedhja-e-vemendjes": "gjenerata-e-tik-tokut-dhe-vjedhja-e-vemendjes.jpg",
  "ik-prej-dyshimeve-sic-ik-prej-luanit": "ik-prej-dyshimeve-sic-ik-prej-luanit.jpg",
  "kenaqu-me-ate-qe-ta-ka-caktuar-allahu-%ef%b7%bb": "kenaqu-me-ate-qe-ta-ka-caktuar-allahu-sal.jpg",
  "per-nje-fillim-te-mbare": "per-nje-fillim-te-mbare.jpg",
  "rendesia-e-njohjes-se-biografise-se-buhariut-dhe-vepres-se-tij-es-sahih-ne-kohen-bashkekohore": "rendesia-e-njohjes-se-biografise-se-buhariut-dhe-vepres-se-tij-es-sahih-ne-kohen-bashkekohore.jpg",
  "sakrifica-per-dunja-dhe-sakrifica-per-ahiret": "sakrifica-per-dunja-dhe-sakrifica-per-ahiret.jpeg",
  "shpirti-i-uritur": "shpirti-i-uritur.jpg",
  "hadith-i-trilluar-ngrenia-e-rrushit-te-tharte-qe-iu-ishte-dhuruar-pejgamberit-alejhi-selam-nga-nje-njeri-i-varfer": "hadith-i-trilluar-ngrenia-e-rrushit-te-tharte-qe-iu-ishte-dhuruar-pejgamberit-alejhi-selam-nga-nje-njeri-i-varfer.jpg",
  "normalizimi-me-te-keqen": "normalizimi-me-te-keqen.jpeg",
  "sfida-e-perfitimit-hallall-ne-kohen-moderne": "sfida-e-perfitimit-hallall-ne-kohen-moderne.jpeg",
  "biografia-e-imam-buhariut-1": "biografia-e-imam-buhariut-1.jpeg",
  "pengesat-ne-kerkimin-e-diturise-1": "pengesat-ne-kerkimin-e-diturise-1.jpg",
  "pengesat-ne-kerkimin-e-diturise-2": "pengesat-ne-kerkimin-e-diturise-2.jpg",
  "dituria-e-csistematizuar": "dituria-e-csistematizuar.jpg",
  "kategorite-e-njerezve-ne-aspektin-e-dashurise-per-pejgamberin-%ef%b7%ba": "kategorite-e-njerezve-ne-aspektin-e-dashurise-per-pejgamberin-sal.jpg",
  // 5 articles without original thumbnail - use a relevant existing one
  "hadith-i-trilluar-plaka-e-shkretetires": "hadith-i-trilluar-ngrenia-e-rrushit-te-tharte-qe-iu-ishte-dhuruar-pejgamberit-alejhi-selam-nga-nje-njeri-i-varfer.jpg",
  "optimizmi-dhe-koncepti-i-keqkuptuar": "per-nje-fillim-te-mbare.jpg",
  "a-ka-ardhur-koha-e-shfaqjes-se-mehdiut": "a-eshte-toka-e-rrumbullaket.jpg",
  "perhapja-e-haditheve-te-trilluara-neper-rrjetet-sociale": "rendesia-e-njohjes-se-biografise-se-buhariut-dhe-vepres-se-tij-es-sahih-ne-kohen-bashkekohore.jpg",
  "dispozitat-mjekesore-bashkohore-qe-lidhen-me-agjerimin-i": "begatia-e-perudhjes-ne-fe.jpg",
};

async function main() {
  const articles = await prisma.article.findMany();
  console.log(`Found ${articles.length} articles in database\n`);

  let updated = 0;
  let notFound = 0;

  for (const article of articles) {
    const filename = thumbnailMap[article.slug];
    if (filename) {
      const thumbnailUrl = `/images/articles/${filename}`;
      await prisma.article.update({
        where: { id: article.id },
        data: { thumbnail: thumbnailUrl },
      });
      updated++;
      console.log(`✅ ${article.slug.substring(0, 60)} -> ${filename}`);
    } else {
      notFound++;
      console.log(`⚠️  No thumbnail for: ${article.slug}`);
    }
  }

  console.log(`\n✅ Updated ${updated} articles with thumbnails`);
  if (notFound > 0) {
    console.log(`⚠️  ${notFound} articles without thumbnails`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
