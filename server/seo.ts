interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: string;
  jsonLd: object;
  noindex?: boolean;
}

const SITE_URL = "https://svnteenhq.co.uk";
const SITE_NAME = "Svnteen";

const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "Svnteen | Creative Agency & Programme — svnteenhq.co.uk",
    description:
      "Svnteen is a forward-thinking creative agency and programme empowering the next generation of creative talent. Explore our work, apply, and get involved.",
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/og-image-home.jpg`,
    ogImageAlt: "Svnteen Creative Agency",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Svnteen",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "Svnteen is a forward-thinking creative agency and programme empowering the next generation of creative talent.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
      },
      sameAs: [],
    },
  },
  "/about": {
    title: "About Svnteen | Who We Are — Creative Agency",
    description:
      "Learn about Svnteen, our mission, our team, and the story behind the creative agency and programme shaping the next generation of creative professionals in the UK.",
    canonical: `${SITE_URL}/about`,
    ogImage: `${SITE_URL}/og-image-about.jpg`,
    ogImageAlt: "About Svnteen Creative Agency",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Svnteen",
      description:
        "Learn about Svnteen, our mission, our team, and the story behind the creative agency and programme.",
      url: `${SITE_URL}/about`,
      isPartOf: {
        "@type": "WebSite",
        name: "Svnteen",
        url: SITE_URL,
      },
    },
  },
  "/programme": {
    title: "The Svnteen Programme | Creative Development & Opportunities",
    description:
      "Discover the Svnteen Programme — a unique creative development experience for emerging talent in the UK. Find out what we offer, who it is for, and how to get involved.",
    canonical: `${SITE_URL}/programme`,
    ogImage: `${SITE_URL}/og-image-programme.jpg`,
    ogImageAlt: "The Svnteen Programme",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      name: "The Svnteen Programme",
      description:
        "A unique creative development experience for emerging talent in the UK.",
      url: `${SITE_URL}/programme`,
      provider: {
        "@type": "Organization",
        name: "Svnteen",
        url: SITE_URL,
      },
      applicationDeadline: "2026-12-31",
      occupationalCredentialAwarded: "Creative Programme Certificate",
      timeToComplete: "P6M",
      inLanguage: "en-GB",
      offers: {
        "@type": "Offer",
        category: "Creative Development",
      },
    },
  },
  "/apply": {
    title: "Apply to Svnteen | Join the Creative Programme",
    description:
      "Ready to apply? Join the Svnteen creative programme and be part of the next generation of creative professionals. Applications are open — apply now at svnteenhq.co.uk.",
    canonical: `${SITE_URL}/apply`,
    ogImage: `${SITE_URL}/og-image-apply.jpg`,
    ogImageAlt: "Apply to the Svnteen Programme",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Apply to Svnteen",
      description: "Application page for the Svnteen creative programme.",
      url: `${SITE_URL}/apply`,
      isPartOf: {
        "@type": "WebSite",
        name: "Svnteen",
        url: SITE_URL,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Apply",
            item: `${SITE_URL}/apply`,
          },
        ],
      },
    },
  },
  "/blog": {
    title: "Svnteen Blog | Creative Insights, News & Stories",
    description:
      "Read the latest from Svnteen — insights, news, creative stories, and updates from the programme and team. Your source for creative industry perspectives from svnteenhq.co.uk.",
    canonical: `${SITE_URL}/blog`,
    ogImage: `${SITE_URL}/og-image-blog.jpg`,
    ogImageAlt: "Svnteen Blog",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Svnteen Blog",
      description:
        "Creative insights, news, and stories from the Svnteen programme and team.",
      url: `${SITE_URL}/blog`,
      publisher: {
        "@type": "Organization",
        name: "Svnteen",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
      },
      inLanguage: "en-GB",
      isPartOf: {
        "@type": "WebSite",
        name: "Svnteen",
        url: SITE_URL,
      },
    },
  },
  "/landlords": {
    title: "Corporate Lease Information for Landlords | Svnteen The Residency",
    description:
      "Svnteen The Residency offers landlords fixed-yield commercial leases. Zero void exposure, no residential legislation risk, fully passive income.",
    canonical: `${SITE_URL}/landlords`,
    ogImage: `${SITE_URL}/og-image-home.jpg`,
    ogImageAlt: "Svnteen The Residency — Landlord Information",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Corporate Lease Information for Landlords",
      description:
        "Svnteen The Residency offers landlords fixed-yield commercial leases with zero void exposure.",
      url: `${SITE_URL}/landlords`,
      isPartOf: {
        "@type": "WebSite",
        name: "Svnteen",
        url: SITE_URL,
      },
    },
  },
};

const notFoundMeta: PageMeta = {
  title: "404 — Page Not Found | Svnteen",
  description: "The page you are looking for cannot be found. Return to the Svnteen homepage.",
  canonical: SITE_URL,
  ogImage: `${SITE_URL}/og-image-home.jpg`,
  ogImageAlt: "Svnteen",
  ogType: "website",
  noindex: true,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Page Not Found",
    url: SITE_URL,
  },
};

export function getMetaForPath(path: string): PageMeta {
  const cleanPath = path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return pageMeta[cleanPath] || notFoundMeta;
}

export function isKnownRoute(path: string): boolean {
  const cleanPath = path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return cleanPath in pageMeta;
}

export function injectMetaTags(html: string, path: string): string {
  const meta = getMetaForPath(path);
  const robotsContent = meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let result = html;
  result = result.replace(/<title>[^<]*<\/title>/g, "");
  result = result.replace(/<meta\s+name="description"[^>]*>/g, "");
  result = result.replace(/<meta\s+name="robots"[^>]*>/g, "");

  const metaTags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="robots" content="${robotsContent}" />
    <link rel="canonical" href="${meta.canonical}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:type" content="${meta.ogType}" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${meta.ogImageAlt}" />
    <meta property="og:locale" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${meta.ogImage}" />
    <script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>
  `;

  return result.replace("</head>", `${metaTags}</head>`);
}

export const ROBOTS_TXT = `User-agent: *
Allow: /

User-agent: *
Disallow: /api/
Disallow: /private/

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/programme</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/apply</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/landlords</loc>
    <lastmod>2026-03-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
