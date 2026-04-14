import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import articles from "./wp-articles.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@muhamedbroja.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "MuhamedBroja2024!";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Dr. Muhamed Broja",
    },
  });
  console.log(`Admin user created: ${adminEmail}`);

  // Create categories
  const categoryNames = Array.from(new Set(articles.map((a: { category: string }) => a.category)));
  const categoryMap: Record<string, string> = {};

  for (const name of categoryNames) {
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    const cat = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
    categoryMap[name] = cat.id;
  }
  console.log(`Categories created: ${categoryNames.join(", ")}`);

  // Create articles
  for (const article of articles as any[]) {
    const existing = await prisma.article.findUnique({
      where: { slug: article.slug },
    });

    if (existing) {
      console.log(`  Skipping (exists): ${article.title}`);
      continue;
    }

    await prisma.article.create({
      data: {
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: article.excerpt,
        published: true,
        author: "Dr. Muhamed Broja",
        categoryId: categoryMap[article.category] || null,
        createdAt: new Date(article.date),
      },
    });
    console.log(`  Created: ${article.title}`);
  }
  console.log(`\nArticles imported: ${articles.length}`);

  // Create lectures
  const lectures = [
    {
      title: "Koment i Akides së Tahaviut",
      youtubeUrl: "https://www.youtube.com/watch?v=C59gxyO2TcI",
      youtubeId: "C59gxyO2TcI",
      thumbnail: "https://img.youtube.com/vi/C59gxyO2TcI/maxresdefault.jpg",
    },
    {
      title: "Pozita e Sunetit në Islam",
      youtubeUrl: "https://www.youtube.com/watch?v=nHTYfrCbWZk",
      youtubeId: "nHTYfrCbWZk",
      thumbnail: "https://img.youtube.com/vi/nHTYfrCbWZk/maxresdefault.jpg",
    },
    {
      title: "Biografia e eruditëve të Hadithit",
      youtubeUrl: "https://www.youtube.com/watch?v=8-BO2reXB8I",
      youtubeId: "8-BO2reXB8I",
      thumbnail: "https://img.youtube.com/vi/8-BO2reXB8I/maxresdefault.jpg",
    },
  ];

  for (const lecture of lectures) {
    const existing = await prisma.lecture.findFirst({
      where: { youtubeId: lecture.youtubeId },
    });

    if (!existing) {
      await prisma.lecture.create({ data: lecture });
      console.log(`  Lecture created: ${lecture.title}`);
    }
  }

  // Create sample Q&A
  const qaItems = [
    {
      question: "A lejohet të dëgjohen ligjerata gjatë punës?",
      answer: "<p>Po, dëgjimi i ligjeratave dhe mësimeve fetare gjatë punës është i lejuar dhe i rekomanduar, përderisa nuk ndikon negativisht në cilësinë e punës dhe nuk e shpërqendron njeriun nga obligimet e tij.</p>",
      order: 1,
    },
    {
      question: "Si të filloj me mësimin e gjuhës arabe?",
      answer: "<p>Fillimi me gjuhën arabe kërkon durim dhe konsekuencë. Rekomandohet të fillohet me alfabetin arab, pastaj me rregullat bazike të gramatikës (nahv) dhe morfologjisë (sarf). Libra të mirë për fillestarë janë 'El-Arabijetu bejne Jedejke' dhe 'Medinah Books'.</p>",
      order: 2,
    },
    {
      question: "Çfarë libra rekomandoni për njohjen e hadithit?",
      answer: "<p>Për fillestarët rekomandohet 'El-Erbe'ine En-Nevevije' (40 Hadithet e Neveviut), pastaj 'Rijadus-Salihin'. Për nivelin e avancuar, 'Sahihul-Buhari' dhe 'Sahihu Muslim' janë dy koleksionet më të rëndësishme të hadithit.</p>",
      order: 3,
    },
  ];

  for (const qa of qaItems) {
    const existing = await prisma.question.findFirst({
      where: { question: qa.question },
    });

    if (!existing) {
      await prisma.question.create({ data: qa });
      console.log(`  Q&A created: ${qa.question.slice(0, 40)}...`);
    }
  }

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
