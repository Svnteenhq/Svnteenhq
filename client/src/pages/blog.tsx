import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
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

export default function BlogPage() {
  useEffect(() => {
    document.title = "Svnteen Blog | Creative Insights, News & Stories";
  }, []);

  const posts = [
    {
      title: "Why Creative Development Matters Now More Than Ever",
      excerpt: "The creative industries are evolving rapidly. Here's why investing in emerging talent is critical for the future of UK creativity.",
      date: "March 2026",
      tag: "Industry",
    },
    {
      title: "Inside the Svnteen Programme: What to Expect",
      excerpt: "A look at what participants experience during our 6-month creative development programme — from workshops to industry placements.",
      date: "March 2026",
      tag: "Programme",
    },
    {
      title: "Building a Creative Career in 2026",
      excerpt: "Practical advice for emerging creatives navigating the industry landscape, from portfolio building to networking strategies.",
      date: "Coming Soon",
      tag: "Advice",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]" style={{ fontFamily: "var(--font-body)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.06]" data-testid="nav-blog">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/" data-testid="link-home-logo">
            <img src={logoImage} alt="Svnteen" className="h-6 w-auto" />
          </Link>
          <div className="flex gap-6 text-[13px] tracking-wide">
            <Link href="/about" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-about">About</Link>
            <Link href="/programme" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-programme">Programme</Link>
            <Link href="/apply" className="text-white/50 hover:text-white/90 transition-colors" data-testid="link-apply">Apply</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4" style={{ fontFamily: "var(--font-mono)" }} data-testid="label-blog">Blog</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: 1.1 }} data-testid="heading-blog">
              Insights & Stories
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-16 max-w-3xl" data-testid="text-blog-intro">
              Creative perspectives, programme updates, and stories from the Svnteen community.
            </p>
          </Reveal>

          <div className="space-y-6">
            {posts.map((post, i) => (
              <Reveal key={post.title} delay={i * 0.08}>
                <article className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 group cursor-pointer hover:bg-white/[0.05] transition-colors" data-testid={`card-post-${i}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] uppercase tracking-wider text-white/30 bg-white/[0.05] px-3 py-1 rounded-full" style={{ fontFamily: "var(--font-mono)" }}>{post.tag}</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-white/25" style={{ fontFamily: "var(--font-mono)" }}>
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-medium mb-3 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>{post.title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-white/40 text-sm group-hover:text-white/70 transition-colors">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-8" data-testid="footer-blog">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[11px]">&copy; 2026 Svnteen. All rights reserved.</p>
          <nav className="flex gap-6 text-[11px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white/60 transition-colors">About</Link>
            <Link href="/programme" className="hover:text-white/60 transition-colors">Programme</Link>
            <Link href="/apply" className="hover:text-white/60 transition-colors">Apply</Link>
            <Link href="/landlords" className="hover:text-white/60 transition-colors">Landlords</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
