import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnail?: string | null;
  category?: { name: string; slug: string } | null;
  author: string;
  createdAt: Date;
}

export default function ArticleCard({
  title,
  slug,
  excerpt,
  thumbnail,
  category,
  author,
  createdAt,
}: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-sm transition-shadow">
      <Link href={`/shkrime/${slug}`} className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="sm:w-[200px] sm:min-w-[200px] h-[180px] sm:h-auto relative bg-layout-bg">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 200px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary">
              <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col justify-center flex-1">
          {category && (
            <span className="category-badge mb-2 self-start">
              {category.name}
            </span>
          )}

          <h2 className="font-headings text-lg font-medium text-primary leading-snug mb-2 hover:text-[#4A4A4A] transition-colors">
            {title}
          </h2>

          {excerpt && (
            <p className="text-sm text-secondary line-clamp-2 mb-3 leading-relaxed">
              {excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-secondary">
            <span className="font-medium">{author}</span>
            <span className="text-border">|</span>
            <time>
              {new Date(createdAt).toLocaleDateString("sq-AL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
