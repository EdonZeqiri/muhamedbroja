"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("kerko") || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("kerko", query.trim());
    } else {
      params.delete("kerko");
    }
    params.delete("faqja");
    router.push(`/?${params.toString()}#articles`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Kërko artikuj..."
        className="w-full bg-white/80 border border-accent/15 rounded-full px-5 py-2.5 pr-10 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-accent/30 focus:bg-white transition-colors"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
        aria-label="Kërko"
      >
        <Search size={16} />
      </button>
    </form>
  );
}
