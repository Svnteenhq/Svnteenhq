# Svnteen The Residency — Landlord Information Page

## Overview
A standalone, premium marketing page at `/landlords` designed to convert landlords and letting agents into commercial lease partners. Built with an obsidian dark aesthetic with white/silver accents and cinematic typography.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion + Lenis (smooth scroll)
- **Backend**: Express.js
- **Routing**: wouter

## Key Pages
- `/` and `/landlords` — The landlord information page (13 sections)

## Key Files
- `client/src/pages/landlords.tsx` — Main landlord page with all 13 sections
- `client/src/App.tsx` — App shell with Lenis smooth scroll and AnimatePresence page transitions
- `client/src/index.css` — CSS variables for fonts, typography scale, and global styles
- `client/index.html` — Google Fonts (Cormorant Garamond, DM Sans, DM Mono)
- `server/routes.ts` — API routes including analytics

## API Endpoints
- `POST /api/analytics/landlord-page-visit` — Logs UTM tracking data

## Environment Variables
- `WHATSAPP_NUMBER` — WhatsApp contact number for CTA buttons (currently 447700000000)

## Page Sections
1. Sticky navigation bar (logo only, h-12)
2. Cinematic hero section (fullscreen parallax, word-by-word animated headline, GoldParticles canvas, scroll indicator)
3. Renters Reform Bill warning (6-card grid)
4. Three value angles (yield, reliability, void protection) with SVG illustrations
5. Yield Calculator (interactive slider comparing AST vs Svnteen annual yield)
6. Process timeline (5-step)
7. AST vs Svnteen comparison table
8. R2SA flow diagram (3-party structure)
9. Concerns addressed (6-card grid)
10. Who We Are (credentials + standards)
11. FAQs (16 questions, filterable by category)
12. Testimonials (3 cards)
13. Contact section (WhatsApp CTA only, no brochure)
14. Footer with legal disclaimer

## Design System
- Background: #0A0A0A (obsidian)
- Text primary: #F5F0E8 (warm white)
- Text muted: rgba(255,255,255, 0.25-0.50)
- Card bg: bg-white/[0.02-0.05]
- Border: border-white/[0.06-0.1]
- WhatsApp green: #25D366

## Font System (CSS Variables)
- `--font-display`: Cormorant Garamond — used on h1/h2 headings via `SectionHeading` component
- `--font-body`: DM Sans — body text
- `--font-mono`: DM Mono — labels, stats, micro text via `SectionLabel` component
- `--text-hero`: clamp(2.8rem, 6vw, 5.5rem)
- `--text-display`: clamp(2rem, 4vw, 3.5rem)

## Animation System
- `Reveal` component — scroll-triggered fade+slide with staggered delays
- `CountUp` component — animated number counter using framer-motion spring
- `AnimatedHeadline` — word-by-word reveal for hero
- `GoldParticles` — canvas-based floating white particles in hero (desktop only)
- Lenis smooth scroll (duration 1.2, custom easing)
- AnimatePresence page transitions (opacity+y, 0.28s)

## Assets
- `@assets/svnteen-logo-white_1772226325057.png` — White logo
- `@assets/svnteen-apartment-hero_1772226325057.png` — Apartment interior hero photo

## Dependencies
- framer-motion — Animations
- lucide-react — Icons
- lenis — Smooth scroll
- react-icons — Company logos (WhatsApp via si)
