import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Muhamed Broja - Shkrime Islame",
    short_name: "Muhamed Broja",
    description:
      "Faqja zyrtare e Dr. Muhamed Broja - Shkrime, ligjerata dhe mësime islame në gjuhën shqipe.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f6",
    theme_color: "#1D1D1F",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
