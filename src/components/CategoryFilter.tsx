"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  name: string;
  slug: string;
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("kategoria") || "";

  function handleClick(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === active) {
      params.delete("kategoria");
    } else {
      params.set("kategoria", slug);
    }
    params.delete("faqja");
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("kategoria");
          params.delete("faqja");
          router.push(`/?${params.toString()}`);
        }}
        className={`text-xs font-headings font-medium px-3 py-1.5 rounded-full border transition-colors ${
          !active
            ? "bg-primary text-white border-primary"
            : "bg-white text-primary border-border hover:border-secondary"
        }`}
      >
        Të gjitha
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleClick(cat.slug)}
          className={`text-xs font-headings font-medium px-3 py-1.5 rounded-full border transition-colors ${
            active === cat.slug
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-border hover:border-secondary"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
