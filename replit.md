# Svnteen — Creative Agency & Landlord Platform

## Overview
A multi-page site for Svnteen creative agency (svnteenhq.co.uk) with a premium landlord marketing page and creative programme pages. Built with an obsidian dark aesthetic with white/silver accents and cinematic typography.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion + Lenis (smooth scroll)
- **Backend**: Express.js
- **Routing**: wouter (client-side), Express (server-side API + SEO)
- **SEO**: Server-side meta tag injection via `server/seo.ts`

## Key Pages
- `/` and `/landlords` — Landlord information page (13 sections)
- `/about` — About the agency (mission, team, approach)
- `/programme` — Creative development programme details (4 phases)
- `/apply` — Application page with requirements and email CTA
- `/blog` — Blog index with article previews

## Key Files
- `client/src/pages/landlords.tsx` — Main landlord page with all 13 sections
- `client/src/pages/about.tsx` — About page
- `client/src/pages/programme.tsx` — Programme page
- `client/src/pages/apply.tsx` — Apply page
- `client/src/pages/blog.tsx` — Blog page
- `client/src/pages/not-found.tsx` — Custom 404 page with navigation
- `client/src/App.tsx` — App shell with routing, Lenis smooth scroll, AnimatePresence
- `client/src/index.css` — CSS variables for fonts, typography scale, and global styles
- `client/index.html` — Google Fonts, default meta tags
- `server/routes.ts` — API routes, robots.txt, sitemap.xml
- `server/seo.ts` — SEO meta tag injection (OG, Twitter, JSON-LD, canonical URLs)
- `server/vite.ts` — Vite dev server with SSR meta tag injection
- `server/static.ts` — Production static file serving with meta tag injection

## SEO Infrastructure
- **robots.txt** — Served at `/robots.txt` via Express, allows crawling, blocks /api/
- **sitemap.xml** — Served at `/sitemap.xml` via Express, lists all 6 pages
- **Meta tags** — Injected server-side per route: title, description, canonical, robots
- **Open Graph** — Full OG tags per page (title, description, image, url, locale)
- **Twitter Cards** — summary_large_image cards per page
- **JSON-LD** — Structured data per page (Organization, AboutPage, EducationalOccupationalProgram, Blog, WebPage, BreadcrumbList)
- **Canonical URLs** — Self-referencing canonicals on all pages using svnteenhq.co.uk domain

## API Endpoints
- `GET /robots.txt` — Search engine crawl directives
- `GET /sitemap.xml` — XML sitemap for all pages
- `POST /api/analytics/landlord-page-visit` — Logs UTM tracking data

## Environment Variables
- `GITHUB_TOKEN` — GitHub personal access token for repo push
- `WHATSAPP_NUMBER` — WhatsApp contact number for CTA buttons

## Design System
- Background: #0A0A0A (obsidian) for agency pages, #EDE6D0 for landlord page
- Text primary: #F5F0E8 (warm white)
- Text muted: rgba(255,255,255, 0.25-0.50)
- Card bg: bg-white/[0.02-0.05]
- Border: border-white/[0.06-0.1]
- WhatsApp green: #25D366

## Font System (CSS Variables)
- `--font-display`: Cormorant Garamond — h1/h2 headings
- `--font-body`: DM Sans — body text
- `--font-mono`: DM Mono — labels, stats, micro text
- `--text-hero`: clamp(2.8rem, 6vw, 5.5rem)
- `--text-display`: clamp(2rem, 4vw, 3.5rem)

## Dependencies
- framer-motion — Animations
- lucide-react — Icons
- lenis — Smooth scroll
- react-icons — Company logos (WhatsApp via si)
- wouter — Client-side routing
