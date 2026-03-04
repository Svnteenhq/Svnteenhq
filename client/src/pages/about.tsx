import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Sparkles } from "lucide-react";
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

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Svnteen | Who We Are — Creative Agency";
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]" style={{ fontFamily: "var(--font-body)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.06]" data-testid="nav-about">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/" data-testid="link-home-logo">
            <img src={logoImage} alt="Svnteen" className="h-6 w-auto" />
          </Link>
          <div className="flex gap-6 text-[13px] tracking-wide">
            <Link href="/programme" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-programme">Programme</Link>
            <Link href="/apply" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-apply">Apply</Link>
            <Link href="/blog" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-blog">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4" style={{ fontFamily: "var(--font-mono)" }} data-testid="label-about">About Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: 1.1 }} data-testid="heading-about">
              Who We Are
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-16 max-w-3xl" data-testid="text-about-intro">
              Svnteen is a forward-thinking creative agency and programme empowering the next generation of creative talent. Based in the UK, we bridge the gap between emerging creativity and commercial opportunity.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: Target, title: "Our Mission", desc: "To create pathways for emerging creative talent, providing the tools, mentorship, and opportunities needed to thrive in the modern creative industry." },
              { icon: Users, title: "Our Team", desc: "A collective of experienced professionals from across the creative industries, united by a passion for developing the next generation." },
              { icon: Sparkles, title: "Our Approach", desc: "We combine hands-on creative development with real-world commercial experience, ensuring every participant gains practical, industry-ready skills." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8" data-testid={`card-about-${i}`}>
                  <item.icon className="w-6 h-6 text-white/40 mb-4" />
                  <h2 className="text-lg font-medium mb-3" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center">
              <Link href="/programme" data-testid="link-explore-programme">
                <span className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                  Explore our programme <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-8" data-testid="footer-about">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[11px]">&copy; 2026 Svnteen. All rights reserved.</p>
          <nav className="flex gap-6 text-[11px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/programme" className="hover:text-white/60 transition-colors">Programme</Link>
            <Link href="/apply" className="hover:text-white/60 transition-colors">Apply</Link>
            <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            <Link href="/landlords" className="hover:text-white/60 transition-colors">Landlords</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
