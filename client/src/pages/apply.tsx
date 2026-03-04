import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import logoImage from "@assets/svnteen-logo-white_1772226325057.png";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ApplyPage() {
  useEffect(() => {
    document.title = "Apply to Svnteen | Join the Creative Programme";
  }, []);

  const requirements = [
    "Based in the United Kingdom",
    "Aged 17–25 (or equivalent early career stage)",
    "Passionate about creative industries",
    "Committed to a 6-month programme",
    "Available for both remote and in-person sessions",
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]" style={{ fontFamily: "var(--font-body)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.06]" data-testid="nav-apply">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/" data-testid="link-home-logo">
            <img src={logoImage} alt="Svnteen" className="h-6 w-auto" />
          </Link>
          <div className="flex gap-6 text-[13px] tracking-wide">
            <Link href="/about" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-about">About</Link>
            <Link href="/programme" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-programme">Programme</Link>
            <Link href="/blog" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-blog">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4" style={{ fontFamily: "var(--font-mono)" }} data-testid="label-apply">Applications</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: 1.1 }} data-testid="heading-apply">
              Join the Programme
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-16 max-w-3xl" data-testid="text-apply-intro">
              Applications for the Svnteen creative programme are currently open. We are looking for passionate, driven individuals ready to take the next step in their creative journey.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 md:p-10 mb-12" data-testid="card-requirements">
              <h2 className="text-xl font-medium mb-6" style={{ fontFamily: "var(--font-display)" }}>Who Can Apply</h2>
              <ul className="space-y-4">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-sm" data-testid={`requirement-${i}`}>
                    <CheckCircle className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 md:p-10 mb-16" data-testid="card-how-to-apply">
              <h2 className="text-xl font-medium mb-4" style={{ fontFamily: "var(--font-display)" }}>How to Apply</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                To apply, send an email to our team with a brief introduction about yourself, your creative interests, and why you would like to join the Svnteen programme. Include any portfolio links or examples of your work.
              </p>
              <a
                href="mailto:hello@svnteenhq.co.uk?subject=Programme%20Application"
                className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                data-testid="link-email-apply"
              >
                <Mail className="w-4 h-4" />
                Apply via Email
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="text-center">
              <Link href="/programme" data-testid="link-learn-more">
                <span className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                  Learn more about the programme <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-8" data-testid="footer-apply">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[11px]">&copy; 2026 Svnteen. All rights reserved.</p>
          <nav className="flex gap-6 text-[11px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white/60 transition-colors">About</Link>
            <Link href="/programme" className="hover:text-white/60 transition-colors">Programme</Link>
            <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            <Link href="/landlords" className="hover:text-white/60 transition-colors">Landlords</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
