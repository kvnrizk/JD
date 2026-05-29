'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

const stats = [
  { value: "2 000+", label: "Sourires sculptés" },
  { value: "2", label: "Cabinets parisiens" },
  { value: "100%", label: "Sur-mesure" },
];

const PhilosophySection = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="philosophie"
      className="relative py-24 md:py-36 border-t border-[rgba(26,21,10,0.06)] bg-[#FAF7F2]"
      data-testid="philosophy-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — framed portrait */}
        <FadeIn delay={0.05}>
          <div>
            <div className="relative border border-[rgba(26,21,10,0.12)] p-1">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE5D6]">
                {imgError ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif-display italic text-8xl text-[#D4AF37]/20">JD</span>
                  </div>
                ) : (
                  <img
                    src="/images/dr-portrait.webp"
                    alt="Dr Joseph Dardas"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                    data-testid="dr-portrait"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/20 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between px-1">
              <div>
                <div className="overline-dark text-[0.65rem] mb-1">Dr Joseph Dardas</div>
                <div className="font-serif-display italic text-[#6B5D4A] text-base">Orthodontiste d'élite</div>
              </div>
              <div className="font-serif-display italic text-[#D4AF37] text-xl">— 20 ans</div>
            </div>
          </div>
        </FadeIn>

        {/* Right — editorial content */}
        <div className="space-y-8">
          <FadeIn>
            <div className="overline-dark mb-6">— Histoire · Philosophie</div>
            <h2 className="font-serif-display text-4xl md:text-5xl xl:text-6xl text-[#1C150A] leading-[1.05] tracking-tight">
              Concevoir le sourire<br />
              comme un <em className="italic text-[#9A7B1A]">art de haute<br />précision.</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-5 max-w-2xl">
              <p className="text-[#6B5D4A] font-light text-sm md:text-base leading-[1.9]">
                Formé à Paris, Dr Joseph Dardas a passé deux décennies à affiner sa lecture du
                sourire. Il considère l'orthodontie comme une discipline architecturale : une
                lecture rigoureuse des volumes, une compréhension des forces, et un sens aigu
                de la proportion.
              </p>
              <p className="text-[#6B5D4A] font-light text-sm md:text-base leading-[1.9]">
                Son cabinet ne reçoit qu'une poignée de patients par jour. Cette rareté est
                délibérée : elle permet une écoute totale, une analyse millimétrée, et un suivi
                sans compromis. Chaque traitement est un protocole unique, conçu sur-mesure
                — jamais répliqué.
              </p>
              <p className="text-[#6B5D4A] font-light text-sm md:text-base leading-[1.9]">
                Du diagnostic numérique 3D aux aligneurs invisibles haut de gamme, Dr Dardas
                s'entoure des technologies les plus avancées pour offrir une expérience où la
                discrétion, le confort et l'excellence sont les seules variables non négociables.
              </p>
            </div>
          </FadeIn>

          {/* Stats strip */}
          <FadeIn delay={0.18}>
            <div className="flex items-center gap-6 md:gap-12 pt-8 border-t border-[rgba(26,21,10,0.08)]">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif-display text-3xl md:text-4xl text-[#9A7B1A] tracking-tight">{s.value}</div>
                  <div className="overline-dark mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
