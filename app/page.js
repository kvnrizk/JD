import Navigation from "@/components/Navigation";
import HeroAnimated from "@/components/HeroAnimated";
import TrustStrip from "@/components/TrustStrip";
import PhilosophySection from "@/components/PhilosophySection";
import EditorialPillars from "@/components/EditorialPillars";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import CtaBanner from "@/components/CtaBanner";
import BeforeAfterCurator from "@/components/BeforeAfterCurator";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClinicsSection from "@/components/ClinicsSection";
import Footer from "@/components/Footer";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr Joseph Dardas",
    url: "https://www.drdardas.fr",
    image: "https://www.drdardas.fr/images/dr-portrait.webp",
    description:
      "Orthodontiste d'exception à Paris spécialisé en Invisalign, aligneurs invisibles, bagues linguales et orthodontie adulte.",
    medicalSpecialty: "Orthodontie",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "8 Boulevard de la Madeleine",
        addressLocality: "Paris",
        postalCode: "75009",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "44 Boulevard de Reuilly",
        addressLocality: "Paris",
        postalCode: "75012",
        addressCountry: "FR",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "11:00",
        closes: "17:00",
      },
    ],
    sameAs: ["https://www.instagram.com/drjosephdardas/", "https://www.doctolib.fr/orthodontiste/paris/joseph-dardas"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Traitements orthodontiques",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Alignement dentaire invisible (Invisalign)" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Technique linguale (bagues linguales)" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Orthodontie pour adulte" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Orthopédie dento-faciale" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Chirurgie dentaire" } },
        { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Diagnostic 3D iTero" } },
      ],
    },
    paymentAccepted: "Chèques, espèces, carte bancaire",
    currenciesAccepted: "EUR",
    priceRange: "€€€€",
    areaServed: { "@type": "City", name: "Paris" },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Cabinet Dardas — Orthodontiste Paris",
    url: "https://www.drdardas.fr",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8 Boulevard de la Madeleine",
      addressLocality: "Paris",
      postalCode: "75009",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 48.8698, longitude: 2.3275 },
    openingHours: ["Mo-Fr 09:00-19:00", "Sa 11:00-17:00"],
    priceRange: "€€€€",
    image: "https://www.drdardas.fr/images/dr-portrait.webp",
    sameAs: ["https://www.doctolib.fr/orthodontiste/paris/joseph-dardas"],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quels sont les moyens de paiement acceptés par Dr Joseph Dardas ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dr Joseph Dardas accepte les chèques, espèces et carte bancaire. La carte Vitale est également acceptée.",
        },
      },
      {
        "@type": "Question",
        name: "Où se trouvent les cabinets du Dr Joseph Dardas à Paris ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dr Joseph Dardas reçoit ses patients dans deux cabinets parisiens : 8 Boulevard de la Madeleine, Paris 75009 et 44 Boulevard de Reuilly, Paris 75012.",
        },
      },
      {
        "@type": "Question",
        name: "Dr Joseph Dardas propose-t-il Invisalign et les aligneurs invisibles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, Dr Joseph Dardas est spécialiste de l'alignement dentaire invisible, incluant les gouttières Invisalign, les aligneurs sur-mesure et les bagues linguales.",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        {/* Hero is sticky z-0 — subsequent sections slide over it */}
        <HeroAnimated />

        {/* z-10 wrapper ensures all sections cover the sticky hero */}
        <div className="relative z-10">
          <TrustStrip />
          <PhilosophySection />
          <EditorialPillars />
          <TreatmentsGrid />
          <CtaBanner />
          <BeforeAfterCurator />
          <TestimonialsSection />
          <ClinicsSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
