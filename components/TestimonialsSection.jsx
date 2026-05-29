'use client';
import React from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";

// Replace with real patient testimonials provided by Dr. Dardas
const testimonials = [
  {
    quote:
      "Une précision et une écoute que je n'ai trouvées nulle part ailleurs. Mon traitement s'est déroulé avec une fluidité remarquable — résultat parfait en 14 mois.",
    name: "Sophie M.",
    treatment: "Aligneurs Invisalign",
    initials: "SM",
  },
  {
    quote:
      "Le Dr Dardas a transformé mon sourire en 18 mois. Une expérience discrète, précise, irréprochable. Je ne recommanderais personne d'autre pour ce type de traitement.",
    name: "Alexandre T.",
    treatment: "Attaches linguales",
    initials: "AT",
  },
  {
    quote:
      "J'ai confié le traitement de ma fille entre ses mains. Suivi impeccable, résultat dépassant toutes nos attentes. Un professionnel d'une autre dimension.",
    name: "Marie-Claire B.",
    treatment: "Orthodontie enfant",
    initials: "MB",
  },
];

const TestimonialsSection = () => (
  <section
    id="temoignages"
    className="relative py-28 md:py-44 border-t border-[rgba(26,21,10,0.06)] bg-[#FAF7F2]"
    data-testid="testimonials-section"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <FadeIn className="mb-20 md:mb-28">
        <div className="overline-dark mb-6">— Témoignages · Patients</div>
        <h2 className="font-serif-display text-4xl md:text-6xl text-[#1C150A] leading-[1.05] tracking-tight max-w-2xl">
          Ce qu'ils <em className="italic text-[#9A7B1A]">vivent.</em>
        </h2>
      </FadeIn>

      <Stagger className="grid grid-cols-1 lg:grid-cols-3 border border-[rgba(26,21,10,0.08)]">
        {testimonials.map((t, i) => (
          <StaggerItem
            key={i}
            className="flex flex-col p-10 md:p-14
                       border-b border-[rgba(26,21,10,0.08)] lg:border-b-0
                       lg:border-r last:lg:border-r-0
                       hover:bg-[#EDE5D6] transition-colors duration-700"
            data-testid={`testimonial-${i + 1}`}
          >
            <div className="font-serif-display italic text-[#D4AF37] text-5xl leading-none mb-8 select-none">
              "
            </div>
            <p className="text-[#6B5D4A] font-light leading-[1.9] text-sm mb-10">
              {t.quote}
            </p>
            <div className="flex items-center gap-4 pt-8 mt-auto border-t border-[rgba(26,21,10,0.08)]">
              <div className="w-10 h-10 rounded-full bg-[#EDE5D6] border border-[rgba(212,175,55,0.4)] flex items-center justify-center shrink-0">
                <span className="font-serif-display italic text-sm text-[#8B6914]">
                  {t.initials}
                </span>
              </div>
              <div>
                <div className="text-[#1C150A] text-sm font-light">{t.name}</div>
                <div className="overline-dark mt-1">{t.treatment}</div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

export default TestimonialsSection;
