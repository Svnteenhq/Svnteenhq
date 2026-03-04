import { useEffect } from "react";
import { Link } from "wouter";
import { Home, BookOpen, Send, FileText } from "lucide-react";
import logoImage from "@assets/svnteen-logo-white_1772226325057.png";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | Svnteen";
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
      <nav className="border-b border-white/[0.06] bg-[#0A0A0A]" data-testid="nav-404">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center">
          <Link href="/" data-testid="link-home-logo">
            <img src={logoImage} alt="Svnteen" className="h-6 w-auto" />
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-5 sm:px-8" data-testid="section-404">
        <div className="text-center max-w-lg">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-4" style={{ fontFamily: "var(--font-mono)" }}>Error 404</p>
          <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }} data-testid="heading-404">
            Page Not Found
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-10" data-testid="text-404">
            Sorry, the page you are looking for does not exist or has been moved. Use the links below to navigate back to the site.
          </p>

          <nav aria-label="404 navigation" className="flex flex-wrap justify-center gap-3" data-testid="nav-404-links">
            <Link href="/" data-testid="link-404-home">
              <span className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                <Home className="w-4 h-4" /> Home
              </span>
            </Link>
            <Link href="/programme" data-testid="link-404-programme">
              <span className="inline-flex items-center gap-2 bg-white/[0.06] text-white/70 px-5 py-2.5 rounded-full text-sm hover:bg-white/[0.1] transition-colors">
                <BookOpen className="w-4 h-4" /> Programme
              </span>
            </Link>
            <Link href="/apply" data-testid="link-404-apply">
              <span className="inline-flex items-center gap-2 bg-white/[0.06] text-white/70 px-5 py-2.5 rounded-full text-sm hover:bg-white/[0.1] transition-colors">
                <Send className="w-4 h-4" /> Apply
              </span>
            </Link>
            <Link href="/blog" data-testid="link-404-blog">
              <span className="inline-flex items-center gap-2 bg-white/[0.06] text-white/70 px-5 py-2.5 rounded-full text-sm hover:bg-white/[0.1] transition-colors">
                <FileText className="w-4 h-4" /> Blog
              </span>
            </Link>
          </nav>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 px-5 sm:px-8" data-testid="footer-404">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/30 text-[11px]">&copy; 2026 Svnteen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
