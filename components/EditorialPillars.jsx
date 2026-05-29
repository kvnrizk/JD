'use client';
import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

const pillars = [
  {
    num: "I",
    title: "Qu'est-ce qu'un alignement d'excellence ?",
    body: "L'alignement d'excellence n'est pas seulement dentaire. C'est une harmonie globale du visage — synergie millimétrée entre esthétique faciale, occlusion parfaite et équilibre structurel. Chaque mâchoire, chaque axe, chaque sourire est étudié comme une composition architecturale.",
  },
  {
    num: "II",
    title: "Qu'est-ce qu'un orthodontiste d'exception ?",
    body: "Une précision quasi-chirurgicale, la maîtrise absolue des technologies invisibles de pointe — aligneurs sur-mesure, attaches linguales, scanners 3D, modélisation prédictive — et une approche radicalement personnalisée. Zéro traitement standardisé.",
  },
  {
    num: "III",
    title: "Pourquoi nous choisir ?",
    body: "Une expérience ultra-personnalisée, la discrétion absolue d'un cabinet privé, le confort haut de gamme de nos infrastructures, et un accompagnement d'élite à chaque étape. Le sourire que vous portez n'appartient qu'à vous — il mérite une signature.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      delay: i * 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const EditorialPillars = () => (
  <section
    id="art"
    className="relative py-28 md:py-44 border-t border-[rgba(26,21,10,0.06)] bg-[#FAF7F2]"
    data-testid="editorial-section"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12">

      <FadeIn className="mb-20 md:mb-28">
        <div className="overline-dark mb-6">— Vision · Manifeste</div>
        <h2 className="font-serif-display text-4xl md:text-6xl text-[#1C150A] leading-[1.05] tracking-tight max-w-3xl">
          L'Art de l'Orthodontie <em className="italic text-[#9A7B1A]">Élite.</em>
        </h2>
      </FadeIn>

      <div className="space-y-0">
        {pillars.map((p, i) => (
          <motion.div
            key={p.num}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={itemVariants}
            className="group border-t border-[rgba(26,21,10,0.08)] py-10 md:py-14 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-12 items-start hover:bg-[#EDE5D6] transition-colors duration-700 px-0 md:px-2"
            data-testid={`pillar-${i + 1}`}
          >
            {/* Number */}
            <div className="font-serif-display italic text-[#D4AF37]/50 text-5xl md:text-6xl leading-none pt-1">
              {p.num}.
            </div>

            {/* Title */}
            <h3 className="font-serif-display text-2xl md:text-3xl text-[#1C150A] leading-snug group-hover:text-[#9A7B1A] transition-colors duration-500 pt-1">
              {p.title}
            </h3>

            {/* Body */}
            <p className="text-sm md:text-base text-[#6B5D4A] font-light leading-[1.85]">
              {p.body}
            </p>
          </motion.div>
        ))}
        <div className="border-t border-[rgba(26,21,10,0.08)]" />
      </div>

    </div>
  </section>
);

export default EditorialPillars;
