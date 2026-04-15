import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Biografia - Dr. Muhamed Broja",
  description:
    "Biografia e Dr. Muhamed Broja - Imam dhe ligjerues në qytetin e Mitrovicës. Diplomuar në Universitetin Islamik të Medinës, fakulteti i Hadithit. Doktor i shkencave islame.",
  openGraph: {
    title: "Biografia | Dr. Muhamed Broja",
    description:
      "Biografia e Dr. Muhamed Broja - Imam dhe ligjerues në Mitrovicë, diplomuar në Universitetin Islamik të Medinës.",
    locale: "sq_AL",
    images: [{ url: "/images/muhamed-broja.jpg", width: 600, height: 600, alt: "Dr. Muhamed Broja" }],
  },
  twitter: {
    card: "summary",
    title: "Biografia - Dr. Muhamed Broja",
    description:
      "Imam dhe ligjerues në Mitrovicë, diplomuar në Universitetin Islamik të Medinës.",
  },
  alternates: {
    canonical: "/biografia",
  },
};

export default function BiografiaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Muhamed Broja",
    birthDate: "1981-04-09",
    birthPlace: {
      "@type": "Place",
      name: "Mitrovicë",
    },
    jobTitle: "Imam dhe Ligjerues",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universiteti Islamik i Medinës",
    },
    url: "https://muhamedbroja.com",
    sameAs: [
      "https://www.facebook.com/muhamedbroja",
      "https://www.youtube.com/@dr.muhamedbroja",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-content mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/70 rounded-2xl border border-accent/10 overflow-hidden">
            {/* Header with separator */}
            <div className="p-6 sm:p-8">
              <hr className="border-border mb-8" />

              {/* Profile Image */}
              <div className="flex justify-center mb-8">
                <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border-2 border-accent/20">
                  <Image
                    src="/images/muhamed-broja.jpg"
                    alt="Dr. Muhamed Broja"
                    fill
                    className="object-cover"
                    sizes="180px"
                    quality={95}
                    priority
                  />
                </div>
              </div>

              {/* Biography Text */}
              <blockquote className="text-center max-w-[680px] mx-auto">
                <div className="space-y-6 font-serif text-lg leading-[1.58] text-[#242424]">
                  <p className="font-headings">
                    Muhamed Broja lindi në Mitrovicë, (09.04.1981). Shkollën fillore e kreu
                    në vendlindje, ndërsa të mesmen në Medresenë &ldquo;Alauddin&rdquo; &ndash;
                    Prishtinë. Studimet e gjuhës arabe për një kohë i vazhdoi në Mbretërinë
                    e Jordanisë, për të vazhduar më pas ato univerzitare në qytetin e
                    Profetit, sal-lallahu alejhi ue selem, në Universitetin Islamik të
                    Medinës ku diplomoi në vitin 2005, në fakultetin e Hadithit.
                  </p>

                  <p>
                    Studimet pasuniverzitare i vazhdoi në po të njëjtin fakultet në katedrën
                    Fikhus-Sunneh (Fikhu i Haditheve).
                  </p>

                  <p className="font-headings">
                    Temën e magjistraturës e mbrojti në degën e hadithit: &ldquo;Tahkik
                    (recensim) i një pjese të komentimit të Nesaiut, të autorit Abdurrahman
                    el-Behkeli (nxënës i Sheukanit)&rdquo;
                  </p>

                  <p>
                    Studimet i përmbylli me doktoratë me temën &ldquo;Qartësimi i haditheve
                    me hadithe të tjera në kapitullin e kurorëzimit dhe shkurorëzimit dhe
                    kapitujve çka lidhen me to&rdquo;. Tani jeton dhe vepron në qytetin e
                    Mitrovicës ku shërben si imam dhe ligjerues.
                  </p>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
