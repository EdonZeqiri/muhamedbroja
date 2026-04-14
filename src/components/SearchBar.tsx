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
    router.push(`/?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Kërko artikuj..."
        className="w-full bg-white border border-border rounded-md px-4 py-2.5 pr-10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-secondary transition-colors"
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
