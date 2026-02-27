import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function SvnteenLogo({ className = "h-7 w-auto" }: { className?: string }) {
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
      <rect x="80" y="100" width="240" height="360" rx="4" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4 2" />
      {windows.map((w) => (
        <rect key={w.key} x={w.x} y={w.y} width="35" height="28" rx="2"
          fill={w.filled ? '#C9A84C' : 'none'}
          stroke="#C9A84C" strokeWidth="0.5"
          opacity={w.opacity}
        />
      ))}
      <line x1="80" y1="200" x2="0" y2="200" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
      <line x1="320" y1="300" x2="400" y2="300" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
      {[[80,100],[320,100],[80,460],[320,460]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="#C9A84C" opacity="0.6" />
          <circle cx={x} cy={y} r="8" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}
      <text x="30" y="180" fill="#C9A84C" fontSize="10" opacity="0.5" fontFamily="monospace">YIELD: FIXED</text>
      <text x="340" y="280" fill="#C9A84C" fontSize="10" opacity="0.5" fontFamily="monospace">VOID: 0%</text>
      <text x="340" y="310" fill="#C9A84C" fontSize="8" opacity="0.3" fontFamily="monospace">LEASE: COMMERCIAL</text>
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
      <line x1="45" y1="75" x2="275" y2="75" stroke="#C9A84C" strokeWidth="2.5" />
      {[55, 80, 105, 130, 155, 180, 205, 230, 255].map((x, i) => (
        <circle key={i} cx={x + 9} cy="75" r="3" fill="#C9A84C" />
      ))}
      <text x="45" y="170" fill="#5A5040" fontSize="9" fontFamily="monospace">Month 1</text>
      <text x="240" y="170" fill="#5A5040" fontSize="9" fontFamily="monospace">Month 12</text>
      <text x="250" y="78" fill="#C9A84C" fontSize="9" fontFamily="monospace">Svnteen</text>
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
      <text x="40" y="25" fill="#5A5040" fontSize="10" fontFamily="monospace" textAnchor="middle">INDIVIDUAL TENANT</text>
      {chainLabels.map((label, i) => (
        <g key={i}>
          <rect x="10" y={40 + i * 32} width="60" height="22" rx="11"
            fill="#1C1C1C" stroke={i === 1 ? '#e05555' : '#3A3A3A'} strokeWidth={i === 1 ? 1.5 : 0.5}
          />
          <text x="40" y={55 + i * 32} fill={i === 1 ? '#e05555' : '#5A5040'} fontSize="8" textAnchor="middle" fontFamily="monospace">
            {label}
          </text>
          {i < 3 && <line x1="40" y1={62 + i * 32} x2="40" y2={72 + i * 32} stroke={i === 1 ? '#e05555' : '#3A3A3A'} strokeWidth={i === 1 ? 1.5 : 0.5} strokeDasharray={i === 1 ? '3 2' : '0'} />}
        </g>
      ))}
      <text x="80" y="82" fill="#e05555" fontSize="8" fontFamily="monospace">BREAK</text>
      <text x="230" y="25" fill="#C9A84C" fontSize="10" fontFamily="monospace" textAnchor="middle">SVNTEEN RESIDENCY</text>
      <rect x="175" y="40" width="110" height="140" rx="4" fill="#141414" stroke="#C9A84C" strokeWidth="1.5" />
      {corpLabels.map((label, i) => (
        <g key={i}>
          <rect x="185" y={52 + i * 30} width="90" height="20" rx="3" fill="#1C1C1C" stroke="#2A2A2A" strokeWidth="0.5" />
          <text x="230" y={66 + i * 30} fill="#A09880" fontSize="7.5" textAnchor="middle" fontFamily="monospace">{label}</text>
        </g>
      ))}
      <text x="230" y="195" fill="#C9A84C" fontSize="9" textAnchor="middle" fontFamily="monospace">PROTECTED</text>
      <line x1="155" y1="30" x2="155" y2="175" stroke="#2A2A2A" strokeWidth="0.5" strokeDasharray="4 2" />
    </svg>
  );
}

function VoidIllustration() {
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const voidMonths = [0, 6, 7];
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-xs opacity-80">
      <text x="60" y="20" fill="#5A5040" fontSize="9" textAnchor="middle" fontFamily="monospace">STANDARD AST</text>
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
      <text x="220" y="20" fill="#C9A84C" fontSize="9" textAnchor="middle" fontFamily="monospace">SVNTEEN LEASE</text>
      {months.map((m, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <g key={`sv-${i}`}>
            <rect x={150 + col * 28} y={30 + row * 32} width="24" height="24" rx="3"
              fill="#1A1200" stroke="#C9A84C" strokeWidth="0.8"
            />
            <text x={162 + col * 28} y={46 + row * 32} fill="#C9A84C"
              fontSize="8" textAnchor="middle" fontFamily="monospace"
            >{m}</text>
          </g>
        );
      })}
      <text x="220" y="140" fill="#C9A84C" fontSize="8" textAnchor="middle" fontFamily="monospace">12/12 MONTHS PAID</text>
    </svg>
  );
}

function StickyNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[999] border-b border-[#2A2A2A]"
      style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(16px)' }}
      data-testid="nav-sticky"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4 flex-wrap">
        <SvnteenLogo />
        <span className="hidden md:block text-xs uppercase tracking-[0.2em] text-[#5A5040]">
          Corporate Lease Information — Landlords & Agents
        </span>
        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#25D366] text-[#25D366] text-sm font-medium transition-all"
            data-testid="link-whatsapp-nav"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>
          <a
            href="#download"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-[#0A0A0A] text-sm font-bold"
            data-testid="link-brochure-nav"
          >
            <FileText className="w-4 h-4" />
            <span>Brochure</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const stats = [
    '3-year fixed commercial leases',
    'Zero void exposure',
    'No new tenancy legislation risk',
    'Monthly corporate yield',
  ];
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      data-testid="section-hero"
    >
      <img
        src={apartmentHero}
        alt="Premium serviced apartment — Svnteen The Residency"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center center' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.88) 100%)'
        }}
      />
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        <div className="h-full flex items-center justify-end max-w-7xl mx-auto px-4 md:px-8">
          <BuildingIllustration />
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full py-20">
        <div className="max-w-2xl space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] font-medium"
          >
            A Message to Landlords & Letting Agents
          </motion.p>
          <div className="w-16 h-px bg-[#C9A84C] opacity-40" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            data-testid="text-hero-headline"
          >
            The rental market is about to change more dramatically than it has in 30 years.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed max-w-lg"
          >
            The question isn't whether you should act. It's whether you act before the bill lands or after the damage is done. We've built a commercial structure that removes your exposure to the new legislation entirely.
          </motion.p>
          <div className="w-full h-px bg-white/10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-[#0A0A0A] font-bold text-sm"
              data-testid="link-how-it-works"
            >
              Read How It Works
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md border border-[#25D366] text-[#25D366] font-medium text-sm transition-all backdrop-blur-sm bg-black/20"
              data-testid="link-whatsapp-hero"
            >
              <WhatsAppIcon />
              Speak to Us on WhatsApp
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {stats.map((stat, idx) => (
              <span
                key={stat}
                className="flex items-center gap-2 text-xs text-white/80 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full"
                data-testid={`stat-pill-${idx}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                {stat}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
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
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" id="the-challenge" data-testid="section-reform-bill">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-[#f4a01c]" />
          <h2 className="text-[#f4a01c] text-lg font-bold uppercase tracking-wider">
            The Renters Reform Bill Is Now Law
          </h2>
        </div>
        <p className="text-[#A09880] text-sm mb-10">
          What it means for landlords with standard AST tenancies
        </p>
        <div className="w-full h-px bg-[#2A2A2A] mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reformCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-md bg-[#141414] border border-[#2A2A2A]"
                data-testid={`card-reform-${i}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-5 h-5 text-[#e05555]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#e05555] font-mono bg-[#1F0A0A] px-2 py-0.5 rounded-full">
                    {card.status}
                  </span>
                </div>
                <h3 className="text-[#F5F0E8] font-semibold text-sm mb-2">{card.title}</h3>
                <p className="text-xs text-[#A09880] leading-relaxed">{card.body}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-md border border-[#C9A84C33] bg-[#C9A84C0A]">
          <p className="text-center text-[#F5F0E8] text-lg font-semibold leading-relaxed">
            Commercial leases fall outside the scope of the Renters Reform Act.<br />
            <span className="text-[#C9A84C]">When your tenant is a company, not a person, the rules change entirely.</span>
          </p>
        </div>

        <p className="text-[10px] text-[#3A3020] text-center mt-4">
          Source: Renters (Reform) Bill 2024, UK Parliament
        </p>
      </div>
    </section>
  );
}

const valueAngles = [
  {
    number: '01',
    angle: 'FIXED CORPORATE YIELD',
    sub: 'The Financial Angle',
    illustration: 'yield' as const,
    content: "Unlike a standard residential AST where your income fluctuates with void periods and tenant arrears, we sign a Commercial Lease. This provides you with a Fixed Corporate Yield every month for the next 3 years. It transforms your property from a volatile rental asset into a stable, fixed-income asset.",
    bullets: [
      'Fixed monthly payment — same amount every month',
      'Commercial contract — not governed by residential law',
      '3-year term with structured break clauses',
      'No arrears — corporate entity with operating budget',
    ],
  },
  {
    number: '02',
    angle: 'CORPORATE OPERATING BUDGET',
    sub: 'The Reliability Angle',
    illustration: 'reliability' as const,
    content: "If a normal tenant loses their job or becomes ill, your rent stops. With Svnteen Residency, your income isn't reliant on one person's paycheck. The lease is underwritten by our corporate operating budget — diversified across multiple properties and booking channels.",
    bullets: [
      'Income from corporate budget, not personal salary',
      'Diversified across multiple properties',
      'Multiple booking channels reduce risk',
      'Business insurance and institutional backing',
    ],
  },
  {
    number: '03',
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
];

function ValueAnglesSection() {
  const illustrationMap = {
    yield: <YieldIllustration />,
    reliability: <ReliabilityIllustration />,
    void: <VoidIllustration />,
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" id="how-it-works" data-testid="section-value-angles">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">Why Landlords Choose a Corporate Lease</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">Three reasons this outperforms a standard tenancy</h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-12" />

        <div className="space-y-16">
          {valueAngles.map((angle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-md bg-[#141414] border border-[#2A2A2A]`}
              data-testid={`card-value-${i}`}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#C9A84C] text-2xl font-mono font-light">{angle.number}</span>
                  <div className="w-px h-6 bg-[#2A2A2A]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#5A5040]">{angle.sub}</span>
                </div>
                <h3 className="text-xl font-bold text-[#F5F0E8] mb-4">{angle.angle}</h3>
                <p className="text-sm text-[#A09880] leading-relaxed mb-6">{angle.content}</p>
                <div className="space-y-2">
                  {angle.bullets.map((bullet, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#52B788] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#A09880]">{bullet}</span>
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
    body: 'Your Fixed Corporate Yield lands on day 1 of each calendar month. Whether the property has 2 guests or 30, your commercial lease payment is identical and unconditional.',
    timeline: 'Ongoing',
    icon: DollarSign,
    highlight: true,
  },
];

function ProcessSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" data-testid="section-process">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">The Process</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">
          From enquiry to lease signed in 7-14 working days
        </h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-12" />

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#2A2A2A] -translate-x-1/2" />
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
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2
                      ${step.highlight ? 'border-[#C9A84C] bg-[#1A1200]' : 'border-[#2A2A2A] bg-[#141414]'}
                    `}>
                      <Icon className={`w-5 h-5 ${step.highlight ? 'text-[#C9A84C]' : 'text-[#5A5040]'}`} />
                    </div>
                  </div>
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-32px)] p-5 rounded-md border bg-[#141414]
                    ${step.highlight ? 'border-[#C9A84C33]' : 'border-[#2A2A2A]'}
                    ${i % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}
                  `}>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="text-[#C9A84C] text-xs font-mono opacity-60">{step.number}</span>
                      <span className="text-xs text-[#5A5040] bg-[#1C1C1C] px-2 py-0.5 rounded-full">
                        {step.timeline}
                      </span>
                    </div>
                    <h4 className={`font-semibold mb-2 ${step.highlight ? 'text-[#C9A84C]' : 'text-[#F5F0E8]'}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-[#A09880] leading-relaxed">{step.body}</p>
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
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" id="the-comparison" data-testid="section-comparison">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">The Comparison</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">
          Standard AST vs Svnteen Commercial Lease
        </h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-12" />

        <div className="overflow-x-auto rounded-md border border-[#2A2A2A]">
          <table className="w-full min-w-[640px]" data-testid="table-comparison">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="py-4 px-5 text-left text-xs uppercase tracking-widest text-[#5A5040] w-1/4">Consideration</th>
                <th className="py-4 px-5 text-left text-xs uppercase tracking-widest text-[#5A5040] w-[37.5%]">
                  Standard AST Tenancy
                </th>
                <th className="py-4 px-5 text-left text-xs uppercase tracking-widest text-[#C9A84C] w-[37.5%] bg-[#C9A84C0A]">
                  Svnteen Commercial Lease
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className={`border-b border-[#1C1C1C] ${i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#0D0D0D]'}`} data-testid={`row-comparison-${i}`}>
                  <td className="py-4 px-5 text-xs text-[#5A5040] font-medium uppercase tracking-wide">
                    {row.category}
                  </td>
                  <td className="py-4 px-5 text-sm text-[#A09880]">
                    <div className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-[#e05555] mt-0.5 flex-shrink-0" />
                      <span>{row.ast}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm bg-[#C9A84C06]">
                    <div className="flex items-start gap-2">
                      {row.svnteenWins ? (
                        <Check className="w-3.5 h-3.5 text-[#52B788] mt-0.5 flex-shrink-0" />
                      ) : (
                        <Minus className="w-3.5 h-3.5 text-[#f4a01c] mt-0.5 flex-shrink-0" />
                      )}
                      <span className={row.svnteenWins ? 'text-[#F5F0E8]' : 'text-[#A09880]'}>
                        {row.svnteen}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#141414]">
                <td colSpan={3} className="py-3 px-5 text-xs text-[#5A5040] text-center">
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
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" data-testid="section-r2sa">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">How R2SA Works</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">
          The three-party structure explained
        </h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-12" />

        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 w-full md:w-56"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#141414] border border-[#2A2A2A] flex items-center justify-center">
                <Home className="w-8 h-8 text-[#A09880]" />
              </div>
              <div className="text-center">
                <p className="text-[#F5F0E8] font-semibold text-sm">The Landlord</p>
                <p className="text-[#5A5040] text-xs mt-1">Owns the property</p>
              </div>
              <div className="w-full bg-[#141414] border border-[#2A2A2A] rounded-md p-3 space-y-1.5">
                {[
                  'Signs commercial lease',
                  'Receives fixed yield monthly',
                  'Zero management duties',
                  'No void exposure',
                  'Property maintained to standard',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-[#52B788] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#A09880]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-1 rotate-90 md:rotate-0">
              <div className="h-16 w-px md:w-24 md:h-px bg-[#C9A84C] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] px-2 py-1 whitespace-nowrap">
                  <p className="text-[#C9A84C] text-[10px] font-mono uppercase tracking-wider">Commercial Lease</p>
                  <p className="text-[#5A5040] text-[9px] text-center">Fixed monthly yield</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C9A84C] rotate-90 md:rotate-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-3 w-full md:w-64"
            >
              <div className="w-24 h-24 rounded-2xl bg-[#1A1200] border-2 border-[#C9A84C] flex items-center justify-center">
                <SvnteenLogo className="h-10 w-auto" />
              </div>
              <div className="text-center">
                <p className="text-[#C9A84C] font-bold text-sm">Svnteen The Residency</p>
                <p className="text-[#5A5040] text-xs mt-1">The commercial tenant</p>
              </div>
              <div className="w-full bg-[#1A1200] border border-[#C9A84C33] rounded-md p-3 space-y-1.5">
                {[
                  'Manages the property entirely',
                  'Furnishes to hotel standard',
                  'Lists on Airbnb / Booking.com',
                  'Handles all guests and cleaning',
                  'Pays landlord from operating budget',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <ArrowRight className="w-3 h-3 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#A09880]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-1 rotate-90 md:rotate-0">
              <div className="h-16 w-px md:w-24 md:h-px bg-[#52B788] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] px-2 py-1 whitespace-nowrap">
                  <p className="text-[#52B788] text-[10px] font-mono uppercase tracking-wider">SA Revenue</p>
                  <p className="text-[#5A5040] text-[9px] text-center">Per-night bookings</p>
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
              <div className="w-20 h-20 rounded-2xl bg-[#141414] border border-[#2A2A2A] flex items-center justify-center">
                <Luggage className="w-8 h-8 text-[#A09880]" />
              </div>
              <div className="text-center">
                <p className="text-[#F5F0E8] font-semibold text-sm">Short-Stay Guests</p>
                <p className="text-[#5A5040] text-xs mt-1">Corporate & leisure travellers</p>
              </div>
              <div className="w-full bg-[#141414] border border-[#2A2A2A] rounded-md p-3 space-y-1.5">
                {[
                  'Book via Airbnb / Booking.com',
                  'Stay 1-30 nights',
                  'Self check-in, keybox access',
                  'Leave reviews, build reputation',
                  'Pay nightly rate to Svnteen',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <ArrowRight className="w-3 h-3 text-[#5A5040] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#A09880]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 p-4 rounded-md bg-[#141414] border border-[#2A2A2A] text-center">
            <p className="text-sm text-[#A09880]">
              <span className="text-[#F5F0E8] font-semibold">The critical point: </span>
              You have <span className="text-[#C9A84C] font-semibold">one tenant</span> — Svnteen Residency Ltd — a registered UK company.
              The revolving door of guests never involves you. They have no residential rights in your property.
              Your agreement is entirely with us.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div key={i} className="p-4 rounded-md bg-[#141414] border border-[#2A2A2A]" data-testid={`card-concern-${i}`}>
              <item.icon className="w-6 h-6 text-[#C9A84C] mb-3" />
              <p className="text-sm text-[#C9A84C] font-semibold mb-1.5">{item.concern}</p>
              <p className="text-xs text-[#A09880] leading-relaxed">{item.answer}</p>
            </div>
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
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" data-testid="section-who-we-are">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">About Svnteen The Residency</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">
          Who we are
        </h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-[#A09880] leading-relaxed">
              We are a UK-based short-let management company operating under commercial leases across multiple UK cities. We manage properties to five-star serviced apartment standard and have an active presence on Airbnb, Booking.com, and VRBO.
            </p>
            <p className="text-[#A09880] leading-relaxed">
              Our promise to landlords is simple: we treat your property as if it were our own — because our business reputation depends on it.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {credentials.map((cred, i) => {
                const Icon = cred.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-[#141414] border border-[#2A2A2A]">
                    <Icon className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                    <span className="text-xs text-[#A09880]">{cred.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative rounded-md overflow-hidden h-48 mb-4">
              <img
                src={apartmentHero}
                alt="Svnteen serviced apartment interior"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] uppercase tracking-widest text-white/70 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  What our properties look like
                </span>
              </div>
            </div>
            <div className="p-6 rounded-md bg-[#141414] border border-[#2A2A2A]">
              <p className="text-xs uppercase tracking-widest text-[#5A5040] mb-4">Our Standards</p>
              {[
                { icon: Star, label: 'Five-star serviced apartment standard' },
                { icon: Users, label: 'Professional guest management team' },
                { icon: MapPin, label: 'Active across multiple UK cities' },
                { icon: Shield, label: 'Full commercial insurance coverage' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#1C1C1C] last:border-0">
                    <Icon className="w-4 h-4 text-[#C9A84C]" />
                    <span className="text-sm text-[#A09880]">{item.label}</span>
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
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" id="faqs" data-testid="section-faqs">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">Frequently Asked Questions</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">
          What landlords ask us most
        </h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-8" />

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border
                ${activeCategory === cat
                  ? 'bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]'
                  : 'bg-[#141414] text-[#5A5040] border-[#2A2A2A]'
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border border-[#2A2A2A] rounded-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                  data-testid={`button-faq-${globalIndex}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-[10px] text-[#5A5040] bg-[#1C1C1C] px-2 py-0.5 rounded-full flex-shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-sm text-[#F5F0E8] font-medium">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#5A5040] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0">
                        <div className="pl-0 md:pl-[calc(0.625rem+0.75rem+0.5rem)] border-t border-[#1C1C1C] pt-3">
                          <p className="text-sm text-[#A09880] leading-relaxed">{faq.a}</p>
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
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">Landlord Perspectives</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">
          What landlords say about the arrangement
        </h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-md bg-[#141414] border border-[#2A2A2A] flex flex-col"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-[#C9A84C] fill-[#C9A84C]" />
                ))}
              </div>
              <p className="text-sm text-[#A09880] leading-relaxed italic flex-1">
                "{t.quote}"
              </p>
              <div className="mt-6 pt-4 border-t border-[#1C1C1C]">
                <p className="text-sm text-[#F5F0E8] font-semibold">{t.name}</p>
                <p className="text-xs text-[#5A5040] mt-1">{t.location}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#5A5040]">{t.duration}</span>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#52B788]">
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

function DownloadSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#0A0A0A]" id="download" data-testid="section-download">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-3">Ready to Find Out More?</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-4">
          Download the brochure or speak to us directly
        </h2>
        <div className="w-16 h-px bg-[#C9A84C] opacity-40 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/api/landlords/brochure"
            download="Svnteen-Landlord-Brochure.pdf"
            className="flex flex-col items-center gap-4 p-8 rounded-md border-2 border-[#C9A84C] bg-[#C9A84C08] transition-all group"
            data-testid="link-download-brochure"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#1A1200] border border-[#C9A84C] flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <div className="text-center">
              <p className="text-[#F5F0E8] font-bold text-lg">Download the Brochure</p>
              <p className="text-[#A09880] text-sm mt-1">5-page PDF — commercial lease overview, FAQs, and process guide</p>
            </div>
            <div className="text-[#5A5040] text-xs text-center">
              PDF · 5 pages · No email required
            </div>
            <div className="px-8 py-3 rounded-md bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-[#0A0A0A] font-bold uppercase tracking-wider text-sm w-full text-center">
              Download Free PDF
            </div>
          </a>

          <a
            href={WHATSAPP_URL_FULL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 p-8 rounded-md border-2 border-[#25D366] bg-[#25D36608] transition-all group"
            data-testid="link-whatsapp-cta"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center">
              <WhatsAppIcon className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <p className="text-[#F5F0E8] font-bold text-lg">Speak to Us Directly</p>
              <p className="text-[#A09880] text-sm mt-1">WhatsApp our team — no forms, no waiting</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[#25D366] text-sm font-medium">Usually responds within 2 hours</span>
            </div>
            <div className="px-8 py-3 rounded-md bg-[#25D366] text-white font-bold uppercase tracking-wider text-sm w-full text-center">
              Open WhatsApp
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] py-12 px-6" data-testid="section-footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="max-w-sm">
            <SvnteenLogo className="h-7 w-auto mb-4" />
            <p className="text-[#5A5040] text-sm leading-relaxed">
              Corporate Lease Division — Commercial property arrangements for landlords seeking fixed-yield, management-free income.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-[#A09880] font-semibold mb-3 uppercase tracking-wider text-xs">This Page</p>
              {[
                { label: 'The Challenge', href: '#the-challenge' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'The Comparison', href: '#the-comparison' },
                { label: 'FAQs', href: '#faqs' },
                { label: 'Download Brochure', href: '#download' },
              ].map(item => (
                <a key={item.label} href={item.href} className="block text-[#5A5040] py-1 transition-colors" data-testid={`link-footer-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <p className="text-[#A09880] font-semibold mb-3 uppercase tracking-wider text-xs">Platform</p>
              {[
                { label: 'The Marketplace', href: '/marketplace' },
                { label: 'Deal Analyser', href: '/deal-analyser' },
                { label: 'Deal of the Day', href: '/deal-of-the-day' },
                { label: 'For Investors', href: '/signup' },
                { label: 'For Sourcers', href: '/signup' },
              ].map(item => (
                <a key={item.label} href={item.href} className="block text-[#5A5040] py-1 transition-colors" data-testid={`link-footer-platform-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <p className="text-[#A09880] font-semibold mb-3 uppercase tracking-wider text-xs">Contact</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] py-1 transition-opacity"
                data-testid="link-footer-whatsapp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1C1C1C]">
          <p className="text-[#3A3020] text-xs leading-relaxed">
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]" style={{ fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif" }}>
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
      <DownloadSection />
      <FooterSection />
    </div>
  );
}
