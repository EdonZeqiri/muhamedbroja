import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-content mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-headings text-lg font-medium mb-4">Muhamed Broja</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Faqja zyrtare e Dr. Muhamed Broja. Shkrime, ligjerata dhe mësime islame në gjuhën shqipe.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-headings text-lg font-medium mb-4">Faqet</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                Shkrime
              </Link>
              <Link href="/ligjerata" className="text-sm text-gray-400 hover:text-white transition-colors">
                Ligjerata
              </Link>
              <Link href="/pyetje-pergjigje" className="text-sm text-gray-400 hover:text-white transition-colors">
                Pyetje & Përgjigje
              </Link>
              <Link href="/biografia" className="text-sm text-gray-400 hover:text-white transition-colors">
                Biografia
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-headings text-lg font-medium mb-4">Na ndiqni</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/muhamedbroja"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@MuhamedBroja"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Dr. Muhamed Broja. Të gjitha të drejtat e rezervuara.
          </p>
        </div>
      </div>
    </footer>
  );
}
