import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen, Briefcase, Award, Lightbulb, Rocket } from "lucide-react";
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

export default function ProgrammePage() {
  useEffect(() => {
    document.title = "The Svnteen Programme | Creative Development & Opportunities";
  }, []);

  const phases = [
    { icon: Lightbulb, title: "Discovery", desc: "Explore your creative strengths, identify opportunities, and build your personal creative vision.", duration: "Weeks 1–4" },
    { icon: BookOpen, title: "Development", desc: "Hands-on workshops, mentorship sessions, and collaborative projects to sharpen your skills.", duration: "Weeks 5–12" },
    { icon: Briefcase, title: "Industry Exposure", desc: "Real-world briefs, client projects, and industry placements to build your portfolio.", duration: "Weeks 13–20" },
    { icon: Rocket, title: "Launch", desc: "Showcase your work, make industry connections, and launch your creative career.", duration: "Weeks 21–24" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]" style={{ fontFamily: "var(--font-body)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.06]" data-testid="nav-programme">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/" data-testid="link-home-logo">
            <img src={logoImage} alt="Svnteen" className="h-6 w-auto" />
          </Link>
          <div className="flex gap-6 text-[13px] tracking-wide">
            <Link href="/about" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-about">About</Link>
            <Link href="/apply" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-apply">Apply</Link>
            <Link href="/blog" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-blog">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4" style={{ fontFamily: "var(--font-mono)" }} data-testid="label-programme">The Programme</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: 1.1 }} data-testid="heading-programme">
              Creative Development & Opportunities
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6 max-w-3xl" data-testid="text-programme-intro">
              The Svnteen Programme is a 6-month creative development experience designed for emerging talent in the UK. We combine mentorship, hands-on projects, and industry exposure to help you build a sustainable creative career.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex items-center gap-2 text-white/40 text-sm mb-20">
              <Clock className="w-4 h-4" />
              <span>6-month programme</span>
              <span className="mx-2">·</span>
              <Award className="w-4 h-4" />
              <span>Certificate awarded</span>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl md:text-3xl font-light mb-12" style={{ fontFamily: "var(--font-display)" }} data-testid="heading-phases">Programme Phases</h2>
          </Reveal>

          <div className="space-y-6 mb-24">
            {phases.map((phase, i) => (
              <Reveal key={phase.title} delay={i * 0.08}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 flex gap-6 items-start" data-testid={`card-phase-${i}`}>
                  <div className="bg-white/[0.05] rounded-lg p-3 shrink-0">
                    <phase.icon className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>{phase.title}</h3>
                      <span className="text-[11px] text-white/30" style={{ fontFamily: "var(--font-mono)" }}>{phase.duration}</span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center">
              <Link href="/apply" data-testid="link-apply-now">
                <span className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-8" data-testid="footer-programme">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[11px]">&copy; 2026 Svnteen. All rights reserved.</p>
          <nav className="flex gap-6 text-[11px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white/60 transition-colors">About</Link>
            <Link href="/apply" className="hover:text-white/60 transition-colors">Apply</Link>
            <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            <Link href="/landlords" className="hover:text-white/60 transition-colors">Landlords</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
