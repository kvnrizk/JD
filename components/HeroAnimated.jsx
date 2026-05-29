'use client';
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Replace with a real patient smile photo from Dr. Dardas
const SMILE_IMAGE = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=85";

const HeroAnimated = () => {
  const { scrollY } = useScroll();

  // Parallax: photo drifts upward slower than scroll
  const imageY = useTransform(scrollY, [0, 800], [0, 90]);

  // Content: text panel fades and lifts as user scrolls
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const contentY = useTransform(scrollY, [0, 380], [0, -48]);

  return (
    <section
      id="hero"
      className="sticky top-0 h-screen flex flex-col lg:flex-row overflow-hidden z-0"
      data-testid="hero-section"
    >
      {/* Left — cream content panel */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col justify-center lg:w-[46%] xl:w-[44%] shrink-0 bg-[#FAF7F2] px-8 md:px-14 xl:px-20 py-32 lg:py-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overline-dark mb-6"
          data-testid="hero-overline"
        >
          — Orthodontie d'exception · Paris
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-5xl md:text-6xl xl:text-7xl leading-[1.0] tracking-tight text-[#1C150A]"
          data-testid="hero-title"
        >
          L'Architecture<br />
          <em className="italic font-light text-[#9A7B1A]">d'un Sourire.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base text-[#6B5D4A] font-light leading-relaxed max-w-sm"
        >
          Une orthodontie pensée comme une discipline d'architecture — précision chirurgicale,
          harmonie faciale, exigence absolue. Madeleine & Reuilly, Paris.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-start gap-3"
        >
          <a
            href="https://www.doctolib.fr/orthodontiste/paris/joseph-dardas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Prendre rendez-vous →
          </a>
          <a href="#philosophie" className="btn-ghost-dark">
            Découvrir
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-8 border-t border-[rgba(26,21,10,0.08)] flex items-center gap-6 md:gap-10"
        >
          {[
            { value: "2 000+", label: "Patients" },
            { value: "20 ans", label: "Expérience" },
            { value: "2", label: "Cabinets" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif-display text-2xl text-[#D4AF37]">{s.value}</div>
              <div className="overline-dark mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right — full-bleed smile photo with parallax */}
      <div className="relative flex-1 min-h-[45vh] lg:min-h-0 overflow-hidden">
        <motion.img
          src={SMILE_IMAGE}
          alt="Sourire d'exception"
          style={{ y: imageY, top: "-5%", height: "110%", objectPosition: "50% 30%" }}
          className="absolute inset-x-0 w-full object-cover"
        />
        {/* Subtle left-edge fade into cream */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FAF7F2] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroAnimated;
