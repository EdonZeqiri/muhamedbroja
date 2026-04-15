import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-4 py-20 text-center">
      <div className="bg-white/70 rounded-2xl border border-accent/10 p-12 max-w-lg mx-auto">
        <h1 className="font-headings text-6xl font-medium text-primary mb-4">404</h1>
        <p className="text-secondary mb-6">Faqja që kërkuat nuk u gjet.</p>
        <Link
          href="/"
          className="inline-flex items-center bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
        >
          Kthehu në faqen kryesore
        </Link>
      </div>
    </div>
  );
}
