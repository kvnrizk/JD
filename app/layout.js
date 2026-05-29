import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  metadataBase: new URL("https://www.drdardas.fr"),
  title: {
    default: "Dr Joseph Dardas — Orthodontiste à Paris | Invisalign · Bagues Linguales · Madeleine & Reuilly",
    template: "%s | Dr Joseph Dardas Orthodontiste Paris",
  },
  description:
    "Dr Joseph Dardas, orthodontiste d'exception à Paris (75009 & 75012). Spécialiste Invisalign, aligneurs invisibles, bagues linguales et orthodontie adulte. Cabinet privé à la Madeleine et à Reuilly. Sur rendez-vous.",
  keywords: [
    "orthodontiste Paris",
    "orthodontiste Paris 9",
    "orthodontiste Paris 12",
    "Invisalign Paris",
    "aligneurs invisibles Paris",
    "bagues linguales Paris",
    "orthodontie adulte Paris",
    "orthodontie invisible Paris",
    "meilleur orthodontiste Paris",
    "orthopédie dento-faciale Paris",
    "orthodontiste Madeleine Paris",
    "orthodontiste Reuilly Paris",
    "aligneurs dentaires Paris",
    "traitement orthodontique adulte",
    "cabinet orthodontie Paris haut de gamme",
    "Dr Joseph Dardas",
    "orthodontiste privé Paris",
    "Invisalign certifié Paris",
    "attaches linguales Paris",
    "gouttières invisibles Paris",
  ],
  authors: [{ name: "Dr Joseph Dardas" }],
  creator: "Dr Joseph Dardas",
  publisher: "Cabinet Dardas",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://www.drdardas.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.drdardas.fr",
    siteName: "Dr Joseph Dardas — Orthodontiste Paris",
    title: "Dr Joseph Dardas — Orthodontiste à Paris | Invisalign & Orthodontie Invisible",
    description:
      "Orthodontiste d'exception à Paris — Invisalign, aligneurs invisibles, bagues linguales, orthodontie adulte. Cabinets Madeleine (75009) & Reuilly (75012). 20 ans d'expertise.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Joseph Dardas — Orthodontiste Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Joseph Dardas — Orthodontiste Paris | Invisalign & Bagues Linguales",
    description:
      "Orthodontiste d'exception à Paris. Invisalign, aligneurs invisibles, bagues linguales. Cabinets Madeleine & Reuilly.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full grain" style={{ background: "#0B0B0C" }} suppressHydrationWarning>
        {children}
        <Toaster theme="dark" position="top-right" />
      </body>
    </html>
  );
}
