import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com"),
  title: {
    default: "Dr. Muhamed Broja - Shkrime Islame",
    template: "%s | Dr. Muhamed Broja",
  },
  description:
    "Faqja zyrtare e Dr. Muhamed Broja - Shkrime, ligjerata dhe mësime islame në gjuhën shqipe.",
  openGraph: {
    type: "website",
    locale: "sq_AL",
    siteName: "Dr. Muhamed Broja",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <head>
        <link rel="preload" href="/fonts/satoshi-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeneralSans-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-base antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
