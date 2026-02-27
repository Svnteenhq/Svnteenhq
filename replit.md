# Svnteen The Residency — Landlord Information Page

## Overview
A standalone, premium marketing page at `/landlords` designed to convert landlords and letting agents into commercial lease partners. Built with an obsidian dark aesthetic with gold accents.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Express.js
- **Routing**: wouter

## Key Pages
- `/` and `/landlords` — The landlord information page (12 sections)

## Key Files
- `client/src/pages/landlords.tsx` — Main landlord page with all 12 sections
- `server/landlordBrochure.ts` — PDF brochure generator using PDFKit
- `server/routes.ts` — API routes including brochure download and analytics

## API Endpoints
- `GET /api/landlords/brochure` — Downloads a 5-page PDF brochure
- `POST /api/analytics/landlord-page-visit` — Logs UTM tracking data

## Environment Variables
- `WHATSAPP_NUMBER` — WhatsApp contact number for CTA buttons

## Page Sections
1. Sticky navigation bar (logo + WhatsApp + Brochure CTAs)
2. Hero section with apartment photo background, gradient overlay, and animated building SVG
3. Renters Reform Bill warning (6-card grid)
4. Three value angles (yield, reliability, void protection) with SVG illustrations
5. Process timeline (5-step)
6. AST vs Svnteen comparison table
7. R2SA flow diagram (3-party structure)
8. Who We Are (credentials + standards)
9. FAQs (16 questions, filterable by category)
10. Testimonials (3 cards)
11. Download brochure + WhatsApp CTA
12. Footer with legal disclaimer

## Design System
- Background: #0A0A0A (obsidian)
- Accent: #FFFFFF / #C8C0B8 (clean white / warm silver for labels)
- Text primary: #F5F0E8
- Text secondary: #B8B0A8
- Text muted: #8A8078
- Card bg: #141414
- Border: #2A2A2A
- Red (negative): #e05555
- Green (positive): #52B788
- WhatsApp green: #25D366

## Assets
- `@assets/svnteen-logo-white_1772226325057.png` — White logo (uses mixBlendMode: screen on dark bg)
- `@assets/svnteen-apartment-hero_1772226325057.png` — Apartment interior hero photo

## Dependencies
- pdfkit — PDF generation for brochure
- framer-motion — Animations
- lucide-react — Icons
