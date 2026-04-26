import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://www.etude-luciani.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const LEGAL_SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Étude Luciani",
  alternateName: "Cabinet d'Avocats Tom Luciani",
  description:
    "Cabinet d'avocats généraliste fondé en 2014 à Dudelange, Grand-Duché de Luxembourg. Spécialisé en droit civil, droit pénal, droit commercial et droit administratif.",
  url: SITE_URL,
  telephone: "+35220331456",
  faxNumber: "+35226521034",
  email: "info@etude-luciani.com",
  foundingDate: "2014-11",
  logo: `${SITE_URL}/favicon.svg`,
  image: OG_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "40, rue du Commerce",
    addressLocality: "Dudelange",
    postalCode: "L-3450",
    addressRegion: "Esch-sur-Alzette",
    addressCountry: "LU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.481,
    longitude: 6.0869,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  availableLanguage: [
    { "@type": "Language", name: "Luxembourgish", alternateName: "lb" },
    { "@type": "Language", name: "French", alternateName: "fr" },
    { "@type": "Language", name: "German", alternateName: "de" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
  areaServed: { "@type": "Country", name: "Luxembourg" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Domaines d'expertise",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Droit Civil" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Droit Pénal" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Droit Commercial" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Droit Administratif et Immigration" },
      },
    ],
  },
  member: {
    "@type": "Person",
    name: "Tom Luciani",
    jobTitle: "Avocat à la Cour",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Université Robert Schumann",
      address: { "@type": "PostalAddress", addressLocality: "Strasbourg", addressCountry: "FR" },
    },
    memberOf: { "@type": "Organization", name: "Barreau de Luxembourg" },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "8",
    bestRating: "5",
  },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
      {
        title:
          "Avocat Dudelange — Étude Luciani | Cabinet d'Avocats Luxembourg",
      },
      {
        name: "description",
        content:
          "Maître Tom Luciani, avocat à Dudelange au Grand-Duché de Luxembourg. Droit civil, pénal, commercial et administratif. Consultations en luxembourgeois, français, allemand et anglais. Tél. 20 33 14 56.",
      },
      {
        name: "keywords",
        content:
          "avocat Dudelange, avocat Luxembourg, cabinet d'avocats Luxembourg, droit pénal Luxembourg, droit civil Luxembourg, droit du travail Luxembourg, successions Luxembourg, Tom Luciani, étude Luciani",
      },
      { name: "author", content: "Étude Luciani" },
      {
        name: "robots",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "theme-color", content: "#ffffff" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      {
        property: "og:title",
        content:
          "Avocat Dudelange — Étude Luciani | Cabinet d'Avocats Luxembourg",
      },
      {
        property: "og:description",
        content:
          "Maître Tom Luciani, avocat à Dudelange. Droit civil, pénal, commercial et administratif au Grand-Duché de Luxembourg. Consultations en 4 langues.",
      },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Étude Luciani — Cabinet d'avocats à Dudelange, Luxembourg",
      },
      { property: "og:locale", content: "fr_LU" },
      { property: "og:site_name", content: "Étude Luciani" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Avocat Dudelange — Étude Luciani" },
      {
        name: "twitter:description",
        content:
          "Cabinet d'avocats à Dudelange, Luxembourg. Droit civil, pénal, commercial, administratif.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      // Self-hosted font preloads (no Google Fonts)
      {
        rel: "preload",
        href: "/fonts/cormorant-garamond-300.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/inter-400.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/inter-500.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // Hero image preconnect (Unsplash CDN)
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "preconnect", href: "https://source.unsplash.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LEGAL_SERVICE_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
