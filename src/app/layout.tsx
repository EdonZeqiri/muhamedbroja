import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com"
  ),
  title: {
    default: "Dr. Muhamed Broja - Shkrime, Ligjerata dhe Mësime Islame",
    template: "%s | Dr. Muhamed Broja",
  },
  description:
    "Faqja zyrtare e Dr. Muhamed Broja - Imam dhe ligjerues në Mitrovicë. Shkrime, ligjerata, pyetje e përgjigje dhe mësime islame në gjuhën shqipe. Diplomuar në Universitetin Islamik të Medinës.",
  keywords: [
    "Dr. Muhamed Broja",
    "Muhamed Broja",
    "shkrime islame",
    "ligjerata islame",
    "mësime islame",
    "islam shqip",
    "pyetje dhe përgjigje islame",
    "hoxhë shqiptar",
    "imam Mitrovicë",
    "Universiteti Islamik i Medinës",
    "fikh",
    "hadith",
    "kuran",
    "fetva shqip",
    "ligjërata shqip",
  ],
  authors: [{ name: "Dr. Muhamed Broja", url: "https://muhamedbroja.com" }],
  creator: "Dr. Muhamed Broja",
  publisher: "Dr. Muhamed Broja",
  category: "Religion",
  openGraph: {
    type: "website",
    locale: "sq_AL",
    siteName: "Dr. Muhamed Broja",
    title: "Dr. Muhamed Broja - Shkrime, Ligjerata dhe Mësime Islame",
    description:
      "Faqja zyrtare e Dr. Muhamed Broja - Shkrime, ligjerata, pyetje e përgjigje dhe mësime islame në gjuhën shqipe.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Muhamed Broja - Shkrime Islame",
    description:
      "Shkrime, ligjerata, pyetje e përgjigje dhe mësime islame në gjuhën shqipe nga Dr. Muhamed Broja.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <body className="font-base antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
