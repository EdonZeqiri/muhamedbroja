import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biografia",
  description:
    "Biografia e Dr. Muhamed Broja - Imam dhe ligjerues në qytetin e Mitrovicës, diplomuar në Universitetin Islamik të Medinës.",
  openGraph: {
    title: "Biografia | Dr. Muhamed Broja",
    description:
      "Biografia e Dr. Muhamed Broja - Imam dhe ligjerues në qytetin e Mitrovicës.",
    locale: "sq_AL",
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
      "https://www.youtube.com/@MuhamedBroja",
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
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            {/* Header with separator */}
            <div className="p-6 sm:p-8">
              <hr className="border-border mb-8" />

              {/* Profile Image */}
              <div className="flex justify-center mb-8">
                <div className="w-[150px] h-[150px] rounded-full bg-layout-bg overflow-hidden border-2 border-border flex items-center justify-center">
                  <svg className="w-20 h-20 text-secondary/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              {/* Biography Text */}
              <blockquote className="text-center">
                <div className="space-y-6 text-base leading-relaxed">
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
