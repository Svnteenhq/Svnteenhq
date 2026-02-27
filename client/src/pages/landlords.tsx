import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  AlertTriangle, Shield, Building2, TrendingUp, Calendar,
  ChevronDown, FileText, MessageCircle, Check, X, Minus,
  Home, Briefcase, Luggage, ArrowRight, Scale, Lock, Landmark,
  Search, ClipboardList, Wrench, DollarSign, Star, Phone,
  Users, Award, MapPin, Clock
} from "lucide-react";
import logoImage from "@assets/svnteen-logo-white_1772226325057.png";
import apartmentHero from "@assets/svnteen-apartment-hero_1772226325057.png";

const WHATSAPP_NUMBER = "447700000000";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Svnteen%2C%20I%20received%20your%20email%20about%20a%20commercial%20lease%20and%20have%20a%20few%20questions.`;
const WHATSAPP_URL_FULL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Svnteen%2C%20I%20received%20your%20email%20about%20a%20commercial%20lease%20and%20would%20like%20to%20find%20out%20more%20about%20your%20arrangement%20for%20my%20property.`;

const REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={REVEAL_VARIANTS}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, prefix = "", suffix = "", duration = 1.5, className }: {
  value: number; prefix?: string; suffix?: string; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest).toLocaleString("en-GB") + suffix;
      }
    });
  }, [spring, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

const WORD_VARIANTS = {
  hidden: { y: 60, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AnimatedHeadline({ text, delay = 0, italic = false, accent = false }: { text: string; delay?: number; italic?: boolean; accent?: boolean }) {
  const words = text.split(" ");
  return (
    <div className="overflow-hidden flex flex-wrap gap-x-[0.3em] pb-[0.15em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={delay + i}
          initial="hidden"
          animate="visible"
          variants={WORD_VARIANTS}
          style={{
            display: "inline-block",
            fontStyle: italic ? "italic" : "normal",
            color: accent ? "rgba(255,255,255,0.7)" : undefined,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

function GoldParticles({ count = 35, className }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    interface Particle { x: number; y: number; vx: number; vy: number; opacity: number; size: number; life: number; maxLife: number; }
    const createParticle = (): Particle => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.2 - 0.05,
      opacity: 0,
      size: Math.random() * 1.2 + 0.3,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: count }, () => {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      return p;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        if (progress < 0.2) p.opacity = progress / 0.2;
        else if (progress > 0.8) p.opacity = (1 - progress) / 0.2;
        else p.opacity = 1;
        const alpha = p.opacity * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
        if (p.life >= p.maxLife) particles[i] = createParticle();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", willChange: "transform" }}
    />
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function SvnteenLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoImage}
      alt="Svnteen. TheResidency."
      className={`object-contain ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

function BuildingIllustration() {
  const windows = useMemo(() => {
    return [130, 180, 230, 280, 330, 380].flatMap((y, row) =>
      [100, 150, 200, 250, 300].map((x, col) => {
        const seed = (row * 5 + col) * 17 % 100;
        const filled = seed > 40;
        return { key: `${row}-${col}`, x, y, filled, opacity: filled ? 0.2 : 0.1 };
      })
    );
  }, []);

  return (
    <motion.svg
      viewBox="0 0 400 500"
      className="w-full max-w-md opacity-30"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="80" y="100" width="240" height="360" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 2" />
      {windows.map((w) => (
        <rect key={w.key} x={w.x} y={w.y} width="35" height="28" rx="2"
          fill={w.filled ? '#FFFFFF' : 'none'}
          stroke="#FFFFFF" strokeWidth="0.5"
          opacity={w.opacity}
        />
      ))}
      <line x1="80" y1="200" x2="0" y2="200" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      <line x1="320" y1="300" x2="400" y2="300" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
      {[[80,100],[320,100],[80,460],[320,460]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="#FFFFFF" opacity="0.6" />
          <circle cx={x} cy={y} r="8" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}
      <text x="30" y="180" fill="#FFFFFF" fontSize="10" opacity="0.5" fontFamily="monospace">YIELD: FIXED</text>
      <text x="340" y="280" fill="#FFFFFF" fontSize="10" opacity="0.5" fontFamily="monospace">VOID: 0%</text>
      <text x="340" y="310" fill="#FFFFFF" fontSize="8" opacity="0.3" fontFamily="monospace">LEASE: COMMERCIAL</text>
    </motion.svg>
  );
}

function YieldIllustration() {
  const bars = [
    { x: 55, h: 80, isVoid: false },
    { x: 80, h: 0, isVoid: true },
    { x: 105, h: 65, isVoid: false },
    { x: 130, h: 70, isVoid: false },
    { x: 155, h: 0, isVoid: true },
    { x: 180, h: 55, isVoid: false },
    { x: 205, h: 72, isVoid: false },
    { x: 230, h: 68, isVoid: false },
  ];
  return (
    <svg viewBox="0 0 300 180" className="w-full max-w-xs opacity-80">
      <line x1="40" y1="20" x2="40" y2="150" stroke="#2A2A2A" strokeWidth="1" />
      <line x1="40" y1="150" x2="280" y2="150" stroke="#2A2A2A" strokeWidth="1" />
      {bars.map((bar, i) => (
        <rect key={i} x={bar.x} y={150 - bar.h} width="18" height={Math.max(bar.h, 2)}
          fill={bar.isVoid ? '#1F0A0A' : '#3A2A2A'}
          stroke={bar.isVoid ? '#e05555' : '#5A4040'}
          strokeWidth="0.5" rx="1"
        />
      ))}
      <line x1="45" y1="75" x2="275" y2="75" stroke="#FFFFFF" strokeWidth="2.5" />
      {[55, 80, 105, 130, 155, 180, 205, 230, 255].map((x, i) => (
        <circle key={i} cx={x + 9} cy="75" r="3" fill="#FFFFFF" />
      ))}
      <text x="45" y="170" fill="#8A8078" fontSize="9" fontFamily="monospace">Month 1</text>
      <text x="240" y="170" fill="#8A8078" fontSize="9" fontFamily="monospace">Month 12</text>
      <text x="250" y="78" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Svnteen</text>
      <text x="145" y="115" fill="#5A4040" fontSize="9" fontFamily="monospace">Standard AST</text>
      <text x="72" y="145" fill="#e05555" fontSize="7" fontFamily="monospace">VOID</text>
      <text x="148" y="145" fill="#e05555" fontSize="7" fontFamily="monospace">VOID</text>
    </svg>
  );
}

function ReliabilityIllustration() {
  const chainLabels = ['Job', 'Health', 'Relationship', 'Economy'];
  const corpLabels = ['Corporate Budget', 'Multiple Revenue', 'Business Insurance', 'Institutional Backing'];
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-xs opacity-80">
      <text x="40" y="25" fill="#8A8078" fontSize="10" fontFamily="monospace" textAnchor="middle">INDIVIDUAL TENANT</text>
      {chainLabels.map((label, i) => (
        <g key={i}>
          <rect x="10" y={40 + i * 32} width="60" height="22" rx="11"
            fill="#1C1C1C" stroke={i === 1 ? '#e05555' : '#3A3A3A'} strokeWidth={i === 1 ? 1.5 : 0.5}
          />
          <text x="40" y={55 + i * 32} fill={i === 1 ? '#e05555' : '#8A8078'} fontSize="8" textAnchor="middle" fontFamily="monospace">
            {label}
          </text>
          {i < 3 && <line x1="40" y1={62 + i * 32} x2="40" y2={72 + i * 32} stroke={i === 1 ? '#e05555' : '#3A3A3A'} strokeWidth={i === 1 ? 1.5 : 0.5} strokeDasharray={i === 1 ? '3 2' : '0'} />}
        </g>
      ))}
      <text x="80" y="82" fill="#e05555" fontSize="8" fontFamily="monospace">BREAK</text>
      <text x="230" y="25" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle">SVNTEEN RESIDENCY</text>
      <rect x="175" y="40" width="110" height="140" rx="4" fill="#141414" stroke="#FFFFFF" strokeWidth="1.5" />
      {corpLabels.map((label, i) => (
        <g key={i}>
          <rect x="185" y={52 + i * 30} width="90" height="20" rx="3" fill="#1C1C1C" stroke="#2A2A2A" strokeWidth="0.5" />
          <text x="230" y={66 + i * 30} fill="#B8B0A8" fontSize="7.5" textAnchor="middle" fontFamily="monospace">{label}</text>
        </g>
      ))}
      <text x="230" y="195" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontFamily="monospace">PROTECTED</text>
      <line x1="155" y1="30" x2="155" y2="175" stroke="#2A2A2A" strokeWidth="0.5" strokeDasharray="4 2" />
    </svg>
  );
}

function ManagedIllustration() {
  const tasks = [
    { label: 'Check-in', x: 40, done: true },
    { label: 'Cleaning', x: 40, done: true },
    { label: 'Maintenance', x: 40, done: true },
    { label: 'Guest Support', x: 40, done: true },
    { label: 'Check-out', x: 40, done: true },
  ];
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-xs opacity-80">
      <text x="150" y="18" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontFamily="monospace">MANAGED BY SVNTEEN</text>
      <rect x="30" y="30" width="240" height="145" rx="6" fill="#141414" stroke="#FFFFFF" strokeWidth="1" />
      {tasks.map((task, i) => (
        <g key={i}>
          <rect x={task.x} y={42 + i * 25} width="180" height="18" rx="4"
            fill="#1C1C1C" stroke="#2A2A2A" strokeWidth="0.5"
          />
          <text x={task.x + 22} y={54 + i * 25} fill="#B8B0A8" fontSize="8" fontFamily="monospace">
            {task.label}
          </text>
          <circle cx={task.x + 10} cy={51 + i * 25} r="5" fill="none" stroke="#52B788" strokeWidth="1" />
          <path d={`M${task.x + 7} ${51 + i * 25} l2 2 l4 -4`} stroke="#52B788" strokeWidth="1" fill="none" />
          <text x="235" y={54 + i * 25} fill="#52B788" fontSize="7" textAnchor="middle" fontFamily="monospace">HANDLED</text>
        </g>
      ))}
      <text x="150" y="192" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle" fontFamily="monospace">YOU: COLLECT PAYMENT</text>
    </svg>
  );
}

function VoidIllustration() {
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const voidMonths = [0, 6, 7];
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-xs opacity-80">
      <text x="60" y="20" fill="#8A8078" fontSize="9" textAnchor="middle" fontFamily="monospace">STANDARD AST</text>
      {months.map((m, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const isVoid = voidMonths.includes(i);
        return (
          <g key={`ast-${i}`}>
            <rect x={10 + col * 28} y={30 + row * 32} width="24" height="24" rx="3"
              fill={isVoid ? '#1F0A0A' : '#1C2A1C'}
              stroke={isVoid ? '#e05555' : '#52B788'}
              strokeWidth="0.8"
            />
            <text x={22 + col * 28} y={46 + row * 32} fill={isVoid ? '#e05555' : '#52B788'}
              fontSize="8" textAnchor="middle" fontFamily="monospace"
            >{m}</text>
          </g>
        );
      })}
      <text x="60" y="140" fill="#e05555" fontSize="8" textAnchor="middle" fontFamily="monospace">3 VOID MONTHS = LOST</text>
      <line x1="130" y1="15" x2="130" y2="150" stroke="#2A2A2A" strokeWidth="0.5" strokeDasharray="4 2" />
      <text x="220" y="20" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontFamily="monospace">SVNTEEN LEASE</text>
      {months.map((m, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <g key={`sv-${i}`}>
            <rect x={150 + col * 28} y={30 + row * 32} width="24" height="24" rx="3"
              fill="#1A1200" stroke="#FFFFFF" strokeWidth="0.8"
            />
            <text x={162 + col * 28} y={46 + row * 32} fill="#FFFFFF"
              fontSize="8" textAnchor="middle" fontFamily="monospace"
            >{m}</text>
          </g>
        );
      })}
      <text x="220" y="140" fill="#FFFFFF" fontSize="8" textAnchor="middle" fontFamily="monospace">12/12 MONTHS PAID</text>
    </svg>
  );
}

function StickyNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[999] border-b border-white/[0.06]"
      style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      data-testid="nav-sticky"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-[72px] flex items-center justify-between gap-6">
        <SvnteenLogo />
        <span className="hidden lg:block text-[11px] uppercase tracking-[0.25em] text-white/30 font-light">
          Corporate Lease Information — Landlords & Agents
        </span>
      </div>
    </nav>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-micro)", letterSpacing: "0.2em", textTransform: "uppercase" as const }} className="text-white/30 mb-4">
      {children}
    </p>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`display-text ${className}`} style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#F5F0E8" }}>
      {children}
    </h2>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    '3-year fixed commercial leases',
    'Zero void exposure',
    'No new tenancy legislation risk',
    'Fixed monthly yield',
  ];
  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: "100svh" }}
      data-testid="section-hero"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 origin-center"
        style={{ y: heroY, scale: heroScale }}
      >
        <img
          src={apartmentHero}
          alt="Premium serviced apartment interior — Svnteen The Residency"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
          loading="eager"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.1) 30%, rgba(10,10,10,0.05) 50%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.95) 100%)"
        }}
      />

      <GoldParticles count={35} />

      <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-10 flex flex-col justify-end pb-16 md:pb-20 px-5 sm:px-8 lg:px-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-6 h-px bg-white/30" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            A Message to Landlords &amp; Letting Agents
          </span>
        </motion.div>

        <div className="mb-4 display-text" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#F5F0E8" }} data-testid="text-hero-headline">
          <AnimatedHeadline text="The rental market" delay={0} />
          <AnimatedHeadline text="is about to" delay={3} />
          <AnimatedHeadline text="change." delay={6} italic accent />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-8 max-w-lg"
          style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}
        >
          More dramatically than it has in 30&nbsp;years.
          We've built a commercial structure that removes your exposure
          to the new legislation&nbsp;entirely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {stats.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9 + i * 0.1, duration: 0.4 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em" }}
              className="px-3 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] text-white/50"
              data-testid={`stat-pill-${i}`}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="flex gap-3 flex-wrap"
        >
          <a
            href="#how-it-works"
            className="px-8 py-4 font-semibold uppercase tracking-widest text-sm rounded-lg bg-white text-[#0A0A0A] transition-all duration-300 hover:shadow-xl hover:shadow-white/15 hover:scale-[1.02]"
            data-testid="link-how-it-works"
          >
            Read How It Works ↓
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 font-medium text-sm rounded-lg border border-[#25D366]/40 text-[#25D366] transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 backdrop-blur-md"
            data-testid="link-whatsapp-hero"
            aria-label="Speak to us on WhatsApp"
          >
            <span className="flex items-center gap-2"><WhatsAppIcon /> WhatsApp Us</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ width: 1, height: 40, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.3))" }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "rgba(255,255,255,0.15)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

const reformCards = [
  {
    title: 'Section 21 "No Fault" Evictions',
    status: 'ABOLISHED',
    body: 'You can no longer reclaim your property without proven grounds',
    icon: AlertTriangle,
  },
  {
    title: 'Periodic Tenancies',
    status: 'DEFAULT',
    body: 'All fixed-term ASTs become periodic by default. Tenants can leave with 2 months notice at any time',
    icon: Calendar,
  },
  {
    title: 'Grounds for Possession',
    status: 'NARROWED',
    body: 'Now narrower and harder to prove in court. Expect 12-24 month timelines for possession',
    icon: Scale,
  },
  {
    title: 'Rent Increases',
    status: 'RESTRICTED',
    body: 'Restricted to once per year, challengeable at tribunal',
    icon: TrendingUp,
  },
  {
    title: 'Ombudsman Membership',
    status: 'MANDATORY',
    body: 'Mandatory for all private landlords',
    icon: Landmark,
  },
  {
    title: 'Pets & Property Condition',
    status: 'EXPANDED',
    body: 'Tenants have stronger rights to keep pets and challenge property conditions',
    icon: Shield,
  },
];

function ReformBillSection() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" id="the-challenge" data-testid="section-reform-bill">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>The Challenge</SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <SectionHeading className="mb-3">
            The Renters Reform Bill<br />Is Now&nbsp;Law
          </SectionHeading>
        </Reveal>
        <Reveal delay={2}>
          <p style={{ fontFamily: "var(--font-body)" }} className="text-white/40 text-sm mb-12 max-w-lg">
            What it means for landlords with standard AST tenancies
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reformCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1]"
                data-testid={`card-reform-${i}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-[#e05555]/80" />
                  <span className="text-[10px] uppercase tracking-widest text-[#e05555] font-mono bg-[#e05555]/10 px-2.5 py-1 rounded-full">
                    {card.status}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2.5">{card.title}</h3>
                <p className="text-[13px] text-white/45 leading-relaxed">{card.body}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-8 rounded-xl border border-white/[0.08] bg-white/[0.03]"
        >
          <p className="text-center text-white/90 text-lg font-medium leading-relaxed">
            Commercial leases fall outside the scope of the Renters Reform Act.<br />
            <span className="text-white font-semibold">When your tenant is a company, not a person, the rules change entirely.</span>
          </p>
        </motion.div>

        <p className="text-[10px] text-white/15 text-center mt-6">
          Source: Renters (Reform) Bill 2024, UK Parliament
        </p>
      </div>
    </section>
  );
}

const valueAngles = [
  {
    number: '01',
    angle: 'FIXED MONTHLY YIELD',
    sub: 'The Financial Angle',
    illustration: 'yield' as const,
    content: "Unlike a standard residential AST where your income fluctuates with void periods and tenant arrears, we sign a Commercial Lease that provides a Fixed Monthly Yield for the next 3 years. Your income isn't reliant on one person's paycheck — it's underwritten by our corporate operating budget, diversified across multiple properties and booking channels.",
    bullets: [
      'Fixed monthly payment — same amount every month',
      'Commercial contract — not governed by residential law',
      '3-year term with structured break clauses',
      'Income from corporate budget, not personal salary',
      'Multiple booking channels reduce single-point risk',
    ],
  },
  {
    number: '02',
    angle: 'ZERO VOID EXPOSURE',
    sub: 'The Risk Management Angle',
    illustration: 'void' as const,
    content: "Our model completely removes your exposure to the retail rental market. Because we are your sole commercial tenant, we absorb 100% of the void risk. You don't need to worry about finding new tenants or losing income between occupants.",
    bullets: [
      'One tenant for the entire lease term',
      'We absorb 100% of void risk',
      'No marketing, no viewings, no reletting',
      'Continuous income regardless of our occupancy',
    ],
  },
  {
    number: '03',
    angle: 'FULLY MANAGED BY US',
    sub: 'The Day-to-Day Angle',
    illustration: 'managed' as const,
    content: "We handle everything so you don't have to. From guest check-in and check-out to professional cleaning, maintenance, and any issues that arise — it's all on us. You will never receive a call at 2am about a broken boiler or a difficult tenant. Your only involvement is receiving your fixed payment each month.",
    bullets: [
      'Guest management — check-in, check-out, vetting',
      'Professional cleaning between every stay',
      'Minor maintenance covered up to agreed threshold',
      'No landlord responsibilities for day-to-day operations',
      '24/7 guest support handled entirely by our team',
    ],
  },
];

function ValueAnglesSection() {
  const illustrationMap = {
    yield: <YieldIllustration />,
    reliability: <ReliabilityIllustration />,
    void: <VoidIllustration />,
    managed: <ManagedIllustration />,
  };

  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" id="how-it-works" data-testid="section-value-angles">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>Why Landlords Choose a Corporate Lease</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-16">Three reasons this outperforms<br />a standard tenancy</SectionHeading></Reveal>

        <div className="space-y-8">
          {valueAngles.map((angle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]`}
              data-testid={`card-value-${i}`}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-white/20 text-3xl font-mono font-extralight">{angle.number}</span>
                  <div className="w-px h-5 bg-white/10" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-light">{angle.sub}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-5 tracking-[-0.01em]">{angle.angle}</h3>
                <p className="text-[14px] text-white/45 leading-[1.8] mb-7">{angle.content}</p>
                <div className="space-y-3">
                  {angle.bullets.map((bullet, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#52B788]/80 mt-0.5 flex-shrink-0" />
                      <span className="text-[14px] text-white/50">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`flex justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                {illustrationMap[angle.illustration]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  {
    number: '01',
    title: 'Initial Conversation',
    body: 'We discuss your property, location, and current situation. We confirm it meets our criteria for short-let commercial use. No pressure, no commitment at this stage.',
    timeline: 'Day 1-2',
    icon: Phone,
    highlight: false,
  },
  {
    number: '02',
    title: 'Property Assessment',
    body: 'We visit (or conduct a virtual walkthrough) and assess the property. We then confirm the rental figure, lease term, and break clause structure — tailored to suit both parties.',
    timeline: 'Day 3-5',
    icon: Search,
    highlight: false,
  },
  {
    number: '03',
    title: 'Commercial Lease Drafted',
    body: 'Our commercial lease is drawn up. You are strongly encouraged to have your own solicitor review it. This is a B2B commercial contract — not a standard tenancy agreement.',
    timeline: 'Day 5-10',
    icon: ClipboardList,
    highlight: false,
  },
  {
    number: '04',
    title: 'Property Setup',
    body: 'We manage the entire fit-out: furniture, linen, professional photography, and platform listing. There is zero cost to you. Every penny comes from our operating budget.',
    timeline: 'Day 10-14',
    icon: Wrench,
    highlight: false,
  },
  {
    number: '05',
    title: 'Commercial Let Begins',
    body: 'Your Fixed Monthly Yield lands on day 1 of each calendar month. Whether the property has 2 guests or 30, your commercial lease payment is identical and unconditional.',
    timeline: 'Ongoing',
    icon: DollarSign,
    highlight: true,
  },
];


function ProcessSection() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" data-testid="section-process">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>The Process</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-16">
          From enquiry to lease signed
        </SectionHeading></Reveal>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2" />
          <div className="space-y-8">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-300
                      ${step.highlight ? 'border-white/30 bg-white/[0.08]' : 'border-white/[0.08] bg-white/[0.03]'}
                    `}>
                      <Icon className={`w-5 h-5 ${step.highlight ? 'text-white' : 'text-white/35'}`} />
                    </div>
                  </div>
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-32px)] p-6 rounded-xl border bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04]
                    ${step.highlight ? 'border-white/[0.12]' : 'border-white/[0.06]'}
                    ${i % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}
                  `}>
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <span className="text-white/20 text-xs font-mono">{step.number}</span>
                      <span className="text-[11px] text-white/30 bg-white/[0.05] px-2.5 py-1 rounded-full">
                        {step.timeline}
                      </span>
                    </div>
                    <h4 className={`font-semibold mb-2.5 ${step.highlight ? 'text-white' : 'text-white/90'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[13px] text-white/40 leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const comparisonRows = [
  { category: 'Income Security', ast: "Dependent on individual tenant's financial health", svnteen: 'Backed by corporate operating budget', svnteenWins: true },
  { category: 'Void Periods', ast: 'Common — 4-8 weeks average between tenancies', svnteen: 'Zero — we absorb 100% of void risk', svnteenWins: true },
  { category: 'Legislation Risk', ast: 'Fully governed by Renters Reform Act 2024', svnteen: 'Commercial lease — outside residential legislation', svnteenWins: true },
  { category: 'Eviction Process', ast: '12-24 months via county court (post-S21 abolition)', svnteen: 'Commercial break clause — structured and agreed in advance', svnteenWins: true },
  { category: 'Rent Increases', ast: 'Limited to once per year, challengeable at tribunal', svnteen: 'Fixed for lease term — agreed upfront, no disputes', svnteenWins: true },
  { category: 'Property Condition', ast: 'Tenant responsible — enforcement difficult', svnteen: "We maintain to hotel standard — it's our business", svnteenWins: true },
  { category: 'Management Required', ast: 'Agent fees 8-15% or self-managed time cost', svnteen: 'Fully passive — zero management from you', svnteenWins: true },
  { category: 'Tenants in Property', ast: 'Individual(s) — full residential rights', svnteen: 'Short-stay guests — no residential tenancy rights', svnteenWins: true },
  { category: 'Monthly Rent Level', ast: 'Market rate or higher (residential demand)', svnteen: 'Slightly below market — premium paid in stability', svnteenWins: false },
  { category: 'Property Use Control', ast: 'You retain residential use reversion rights', svnteen: 'Commercial use during lease — full residential rights return on expiry', svnteenWins: false },
];

function ComparisonSection() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" id="the-comparison" data-testid="section-comparison">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>The Comparison</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-16">
          Standard AST vs Svnteen<br />Commercial Lease
        </SectionHeading></Reveal>

        <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
          <table className="w-full min-w-[640px]" data-testid="table-comparison">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="py-5 px-6 text-left text-[11px] uppercase tracking-widest text-white/25 font-light w-1/4">Consideration</th>
                <th className="py-5 px-6 text-left text-[11px] uppercase tracking-widest text-white/25 font-light w-[37.5%]">
                  Standard AST Tenancy
                </th>
                <th className="py-5 px-6 text-left text-[11px] uppercase tracking-widest text-white/50 font-medium w-[37.5%] bg-white/[0.02]">
                  Svnteen Commercial Lease
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className={`border-b border-white/[0.04] transition-colors duration-200 hover:bg-white/[0.02]`} data-testid={`row-comparison-${i}`}>
                  <td className="py-4 px-6 text-[11px] text-white/30 font-medium uppercase tracking-wide">
                    {row.category}
                  </td>
                  <td className="py-4 px-6 text-[13px] text-white/40">
                    <div className="flex items-start gap-2.5">
                      <X className="w-3.5 h-3.5 text-[#e05555]/70 mt-0.5 flex-shrink-0" />
                      <span>{row.ast}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] bg-white/[0.02]">
                    <div className="flex items-start gap-2.5">
                      {row.svnteenWins ? (
                        <Check className="w-3.5 h-3.5 text-[#52B788]/80 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Minus className="w-3.5 h-3.5 text-[#f4a01c]/70 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={row.svnteenWins ? 'text-white/70' : 'text-white/40'}>
                        {row.svnteen}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-white/[0.02]">
                <td colSpan={3} className="py-4 px-6 text-[11px] text-white/20 text-center">
                  ~ Indicates a trade-off. Svnteen offers slightly below-market rent in exchange for institutional-grade reliability.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

function R2SASection() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" data-testid="section-r2sa">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>How R2SA Works</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-16">
          The three-party structure<br />explained
        </SectionHeading></Reveal>

        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 w-full md:w-56"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                <Home className="w-8 h-8 text-white/40" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm">The Landlord</p>
                <p className="text-white/30 text-xs mt-1">Owns the property</p>
              </div>
              <div className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-2">
                {[
                  'Signs commercial lease',
                  'Receives fixed yield monthly',
                  'Zero management duties',
                  'No void exposure',
                  'Property maintained to standard',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#52B788]/70 mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] text-white/45">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-1 rotate-90 md:rotate-0">
              <div className="h-16 w-px md:w-24 md:h-px bg-white/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] px-2 py-1 whitespace-nowrap">
                  <p className="text-white/60 text-[10px] font-mono uppercase tracking-wider">Commercial Lease</p>
                  <p className="text-white/25 text-[9px] text-center">Fixed monthly yield</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#FFFFFF] rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-3 w-full md:w-64"
            >
              <div className="w-24 h-24 rounded-2xl bg-white/[0.05] border-2 border-white/20 flex items-center justify-center">
                <SvnteenLogo className="h-10 w-auto" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">Svnteen The Residency</p>
                <p className="text-white/30 text-xs mt-1">The commercial tenant</p>
              </div>
              <div className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl p-4 space-y-2">
                {[
                  'Manages the property entirely',
                  'Furnishes to hotel standard',
                  'Lists on Airbnb / Booking.com',
                  'Handles all guests and cleaning',
                  'Pays landlord from operating budget',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-white/40 mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] text-white/45">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-1 rotate-90 md:rotate-0">
              <div className="h-16 w-px md:w-24 md:h-px bg-[#52B788] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] px-2 py-1 whitespace-nowrap">
                  <p className="text-[#52B788] text-[10px] font-mono uppercase tracking-wider">SA Revenue</p>
                  <p className="text-[#8A8078] text-[9px] text-center">Per-night bookings</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#52B788] rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-3 w-full md:w-56"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                <Luggage className="w-8 h-8 text-white/40" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm">Short-Stay Guests</p>
                <p className="text-white/30 text-xs mt-1">Corporate & leisure travellers</p>
              </div>
              <div className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-2">
                {[
                  'Book via Airbnb / Booking.com',
                  'Stay 1-30 nights',
                  'Self check-in, keybox access',
                  'Leave reviews, build reputation',
                  'Pay nightly rate to Svnteen',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-white/25 mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] text-white/45">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
            <p className="text-[14px] text-white/50 leading-relaxed">
              <span className="text-white font-semibold">The critical point: </span>
              You have <span className="text-white font-semibold">one tenant</span> — Svnteen Residency Ltd — a registered UK company.
              The revolving door of guests never involves you. They have no residential rights in your property.
              Your agreement is entirely with us.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              concern: '"What about HMO licensing?"',
              answer: 'R2SA is not an HMO. Guests are transient — no single guest has exclusive occupation. No HMO licence is required.',
              icon: Landmark,
            },
            {
              concern: '"What if I need the property back?"',
              answer: 'Your commercial break clause allows you to end the arrangement with appropriate notice. We structure these to protect both parties.',
              icon: Lock,
            },
            {
              concern: '"Is this legal?"',
              answer: 'Completely. Commercial leases have been used in property for decades. We recommend all landlords take independent legal advice before signing.',
              icon: Scale,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
              data-testid={`card-concern-${i}`}
            >
              <item.icon className="w-5 h-5 text-white/40 mb-4" />
              <p className="text-sm text-white font-semibold mb-2">{item.concern}</p>
              <p className="text-[13px] text-white/40 leading-relaxed">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeAreSection() {
  const credentials = [
    { icon: Building2, label: 'Registered in England & Wales' },
    { icon: FileText, label: 'Commercial Lease Structure' },
    { icon: Shield, label: 'Professional Indemnity Cover' },
    { icon: Award, label: 'Public Liability Insurance' },
  ];

  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" data-testid="section-who-we-are">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>About Svnteen The Residency</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-14">
          Who we are
        </SectionHeading></Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-[14px] text-white/45 leading-[1.8]">
              We are a UK-based short-let management company operating under commercial leases across multiple UK cities. We manage properties to five-star serviced apartment standard and have an active presence on Airbnb, Booking.com, and VRBO.
            </p>
            <p className="text-[14px] text-white/45 leading-[1.8]">
              Our promise to landlords is simple: we treat your property as if it were our own — because our business reputation depends on it.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {credentials.map((cred, i) => {
                const Icon = cred.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.04]">
                    <Icon className="w-4 h-4 text-white/40 flex-shrink-0" />
                    <span className="text-[12px] text-white/45">{cred.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden h-52">
              <img
                src={apartmentHero}
                alt="Svnteen serviced apartment interior"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] uppercase tracking-widest text-white/60 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  What our properties look like
                </span>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-[11px] uppercase tracking-widest text-white/25 mb-5">Our Standards</p>
              {[
                { icon: Star, label: 'Five-star serviced apartment standard' },
                { icon: Users, label: 'Professional guest management team' },
                { icon: MapPin, label: 'Active across multiple UK cities' },
                { icon: Shield, label: 'Full commercial insurance coverage' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/[0.04] last:border-0">
                    <Icon className="w-4 h-4 text-white/35" />
                    <span className="text-[13px] text-white/50">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    category: 'Legal & Structure',
    q: 'Is this legal? How is it different from subletting?',
    a: 'This is a completely legal commercial arrangement. We enter into a Commercial Lease as a corporate tenant — Svnteen Residency Ltd — a registered UK company. This is fundamentally different from subletting: you know exactly what the property is being used for, it is stated in the lease, and you have signed your informed consent. We strongly recommend all landlords obtain independent legal advice before signing any lease. We welcome and encourage this.',
  },
  {
    category: 'Legal & Structure',
    q: 'Does my mortgage lender need to approve this?',
    a: 'Yes — if your property has a residential mortgage, you must seek consent from your lender for commercial use. Many specialist buy-to-let lenders do permit serviced accommodation use, particularly where you notify them in writing. Some landlords choose to explore short-term commercial mortgage or bridging products. We do not advise on mortgage products, but we can explain exactly what use class the property falls under to support your lender enquiry.',
  },
  {
    category: 'Legal & Structure',
    q: 'What does the Commercial Lease actually say?',
    a: 'The lease sets out: the fixed monthly payment, the lease term (typically 3 years), the permitted use (short-let serviced accommodation), our responsibilities (maintenance, insurance, guest management), your rights (break clause, property access with notice, lease expiry reversion), and both parties\' exit conditions. You receive the full draft lease before any commitment is required.',
  },
  {
    category: 'Legal & Structure',
    q: 'Can I get my property back if I need it?',
    a: 'Yes. Every commercial lease we sign includes a mutual break clause — typically exercisable after the first year with 2-3 months written notice. If you need to sell, move back in, or simply end the arrangement, the break clause exists precisely for this situation. We negotiate this individually with each landlord so the terms suit your circumstances.',
  },
  {
    category: 'Legal & Structure',
    q: 'Is this affected by the Renters Reform Act 2024?',
    a: 'No. The Renters (Reform) Act applies specifically to assured shorthold tenancies (ASTs) and private residential tenancies. A commercial lease to a corporate entity is governed by the Landlord and Tenant Act 1954 (commercial version) and is entirely outside the scope of the new residential legislation. This is one of the most significant advantages of our structure in the current legislative environment.',
  },
  {
    category: 'Financial',
    q: 'What rent will you pay me?',
    a: 'We aim to pay 70-90% of the market rental rate for the area. This is slightly below what a standard tenant might pay, but the trade-off is institutional-grade payment reliability — paid from our corporate operating budget regardless of occupancy. We also cover all bills, maintenance, and management costs, which a standard tenancy would not.',
  },
  {
    category: 'Financial',
    q: 'What if Svnteen cannot pay one month?',
    a: 'We operate from a corporate operating budget — not a personal paycheck. Our income comes from multiple properties and multiple booking channels simultaneously, which means no single slow month at any one property affects our ability to pay. In the unlikely event of business disruption, the commercial lease would be subject to standard UK commercial contract law — the same protections that govern any B2B agreement.',
  },
  {
    category: 'Financial',
    q: 'Who pays the bills?',
    a: 'We do. Council tax, electricity, gas, water, and broadband are all transferred into our name for the duration of the lease. You receive a clean, fixed yield with zero utility exposure.',
  },
  {
    category: 'Financial',
    q: 'What about my tax position?',
    a: 'Rental income from a commercial lease is treated as property income for tax purposes in the same way as standard AST income. We recommend speaking with your accountant about the specifics of your situation. We can provide a full copy of the proposed commercial lease to assist with that conversation.',
  },
  {
    category: 'Property & Management',
    q: 'What will you do to my property?',
    a: 'We furnish the property to a high standard — professional-grade furniture, hotel-quality linen, and a full photographic shoot. This is our capital investment. At the end of the lease, all furniture is removed and the property is returned to you in the condition it was received (fair wear and tear accepted, as per the lease terms).',
  },
  {
    category: 'Property & Management',
    q: 'Who looks after the property day-to-day?',
    a: 'We manage everything: guest check-in and check-out, professional cleaning between every stay, minor maintenance (we cover this up to an agreed threshold, typically 150-200 per instance), and any guest issues. You will not receive calls at 2am. That is our responsibility.',
  },
  {
    category: 'Property & Management',
    q: 'What types of guests will stay in my property?',
    a: 'We primarily host corporate travellers (contractors, consultants, NHS staff, business professionals), families on extended stays, and leisure guests. All guests are vetted through the Airbnb and Booking.com identity verification systems. Every stay is tracked, and we can provide occupancy reports on request.',
  },
  {
    category: 'Property & Management',
    q: 'What if a guest damages the property?',
    a: 'We carry commercial property insurance and are covered for guest damage. We also hold security deposits through the booking platforms. Any damage beyond fair wear and tear is our liability — not yours. This is written into the commercial lease.',
  },
  {
    category: 'Property & Management',
    q: 'Do you need to make any structural changes?',
    a: 'No structural changes. We install a keybox for self-check-in access, and we may request permission to add smart locks or minor additions such as a welcome board or fire safety notices (all legally required for short-let properties). Everything is removable.',
  },
  {
    category: 'For Letting Agents',
    q: 'I manage this property on behalf of the landlord. Can we still do this?',
    a: 'Absolutely. We regularly work with letting agents. We are happy to present this proposal directly to the landlord with you present, or to provide you with all documentation to present on our behalf. If the landlord proceeds, we can structure a referral fee or ongoing management override depending on the arrangement. We respect existing agency relationships entirely.',
  },
  {
    category: 'For Letting Agents',
    q: "Won't this take the property out of your management?",
    a: 'Yes — the day-to-day management transfers to us under the commercial lease. However, many agents see this as an opportunity: they can offer landlords on their books a premium service (corporate lease placement) as an added-value product, and earn a placement fee without carrying ongoing management liability. We are open to partnership arrangements.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" id="faqs" data-testid="section-faqs">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>Frequently Asked Questions</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-10">
          What landlords ask us most
        </SectionHeading></Reveal>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`px-4 py-2.5 rounded-full text-[12px] font-medium transition-all duration-300 border
                ${activeCategory === cat
                  ? 'bg-white text-[#0A0A0A] border-white'
                  : 'bg-white/[0.03] text-white/35 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/50'
                }
              `}
              data-testid={`button-faq-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((faq, i) => {
            const globalIndex = faqs.indexOf(faq);
            const isOpen = openIndex === globalIndex;
            return (
              <motion.div
                key={globalIndex}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="border border-white/[0.06] rounded-xl transition-colors duration-200 hover:border-white/[0.1]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  data-testid={`button-faq-${globalIndex}`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-[10px] text-white/30 bg-white/[0.05] px-2.5 py-1 rounded-full flex-shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-[14px] text-white/80 font-medium">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/25 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="pl-0 md:pl-[calc(0.625rem+0.75rem+0.5rem)] border-t border-white/[0.04] pt-4">
                          <p className="text-[14px] text-white/40 leading-[1.8]">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "I was sceptical at first — I'd heard the 'guaranteed rent' pitch before and dismissed it. What made the difference was the commercial lease. It's a proper B2B arrangement, not a tenancy agreement with a promise stapled on.",
    name: "Portfolio Landlord",
    location: "Manchester — 2-bed property",
    duration: "18 months into 3-year lease",
    verified: true,
  },
  {
    quote: "My letting agent actually introduced me to this. I was facing void periods between students and didn't want the hassle of AST management under the new rules. The fixed monthly payment lands without fail.",
    name: "Buy-to-Let Investor",
    location: "Leeds — 3-bed property",
    duration: "12 months into 3-year lease",
    verified: true,
  },
  {
    quote: "What impressed me most was that they told me upfront there's no such thing as guaranteed rent. Any company can default. What they gave me instead was logic — corporate budgets, commercial structures, and a break clause. I respected the honesty.",
    name: "Private Landlord",
    location: "Birmingham — 2-bed apartment",
    duration: "6 months into 3-year lease",
    verified: true,
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>Landlord Perspectives</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-14">
          What landlords say about<br />the arrangement
        </SectionHeading></Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-white/50 fill-white/50" />
                ))}
              </div>
              <p className="text-[14px] text-white/50 leading-[1.8] italic flex-1">
                "{t.quote}"
              </p>
              <div className="mt-7 pt-5 border-t border-white/[0.04]">
                <p className="text-sm text-white font-semibold">{t.name}</p>
                <p className="text-[12px] text-white/25 mt-1">{t.location}</p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[12px] text-white/25">{t.duration}</span>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#52B788]/70">
                      <Check className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 bg-[#0A0A0A]" id="contact" data-testid="section-contact">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal><SectionLabel>Ready to Find Out More?</SectionLabel></Reveal>
        <Reveal delay={1}><SectionHeading className="mb-6">
          Speak to us directly
        </SectionHeading></Reveal>
        <p className="text-white/40 text-[14px] leading-[1.8] mb-12 max-w-xl mx-auto">
          No forms, no waiting lists, no sales pressure. Message our team on WhatsApp and get straight answers about how a commercial lease could work for your property.
        </p>

        <a
          href={WHATSAPP_URL_FULL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center gap-6 p-12 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/[0.03] transition-all duration-300 group hover:bg-[#25D366]/[0.08] hover:border-[#25D366]/50 hover:scale-[1.01] w-full max-w-md mx-auto"
          data-testid="link-whatsapp-cta"
          aria-label="Contact us on WhatsApp"
        >
          <div className="w-20 h-20 rounded-2xl bg-[#25D366] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <WhatsAppIcon className="w-12 h-12 text-white" />
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-xl">WhatsApp Our Team</p>
            <p className="text-white/40 text-sm mt-2">No forms, no waiting — just message us</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-[#25D366]/80 text-sm font-medium">Usually responds within 2 hours</span>
          </div>
          <div className="px-8 py-4 rounded-lg bg-[#25D366] text-white font-semibold uppercase tracking-wider text-sm w-full text-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#25D366]/20">
            Open WhatsApp
          </div>
        </a>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.04] py-16 px-5 sm:px-8 lg:px-10" data-testid="section-footer" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-sm">
            <SvnteenLogo className="h-7 w-auto mb-5" />
            <p className="text-white/25 text-[13px] leading-relaxed">
              Corporate Lease Division — Commercial property arrangements for landlords seeking fixed-yield, management-free income.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-white/50 font-medium mb-4 uppercase tracking-wider text-[11px]">This Page</p>
              {[
                { label: 'The Challenge', href: '#the-challenge' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'The Comparison', href: '#the-comparison' },
                { label: 'FAQs', href: '#faqs' },
                { label: 'Contact Us', href: '#contact' },
              ].map(item => (
                <a key={item.label} href={item.href} className="block text-white/20 py-1.5 transition-colors duration-200 hover:text-white/50 text-[13px]" data-testid={`link-footer-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <p className="text-white/50 font-medium mb-4 uppercase tracking-wider text-[11px]">Platform</p>
              {[
                { label: 'The Marketplace', href: '/marketplace' },
                { label: 'Deal Analyser', href: '/deal-analyser' },
                { label: 'Deal of the Day', href: '/deal-of-the-day' },
                { label: 'For Investors', href: '/signup' },
                { label: 'For Sourcers', href: '/signup' },
              ].map(item => (
                <a key={item.label} href={item.href} className="block text-white/20 py-1.5 transition-colors duration-200 hover:text-white/50 text-[13px]" data-testid={`link-footer-platform-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <p className="text-white/50 font-medium mb-4 uppercase tracking-wider text-[11px]">Contact</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366]/70 py-1.5 transition-colors duration-200 hover:text-[#25D366] text-[13px]"
                data-testid="link-footer-whatsapp"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04]">
          <p className="text-white/10 text-[11px] leading-relaxed">
            2026 Svnteen The Residency. All rights reserved. This page is for information purposes only and does not constitute financial, legal, or tax advice. All commercial lease arrangements are subject to individual negotiation and we strongly recommend all landlords obtain independent legal and financial advice before entering any agreement. Svnteen The Residency is not authorised by the Financial Conduct Authority. Mortgage consent requirements apply — please verify with your lender before proceeding.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function LandlordsPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');

    if (utmSource || utmCampaign) {
      fetch('/api/analytics/landlord-page-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    document.title = 'Corporate Lease Information for Landlords | Svnteen The Residency';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Svnteen The Residency offers landlords fixed-yield commercial leases. Zero void exposure, no residential legislation risk, fully passive income.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Svnteen The Residency offers landlords fixed-yield commercial leases. Zero void exposure, no residential legislation risk, fully passive income.';
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]" style={{ fontFamily: "var(--font-body)" }}>
      <StickyNav />
      <HeroSection />
      <ReformBillSection />
      <ValueAnglesSection />
      <ProcessSection />
      <ComparisonSection />
      <R2SASection />
      <WhoWeAreSection />
      <FAQSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
