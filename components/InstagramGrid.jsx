'use client';
import React from "react";
import { motion } from "framer-motion";

const InstagramGrid = () => (
  <section
    id="journal"
    className="relative border-t border-[rgba(250,250,250,0.06)] bg-[#0B0B0C] overflow-hidden"
    data-testid="instagram-section"
  >
    {/* Decorative large handle */}
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <span className="font-serif-display italic text-white/[0.03] whitespace-nowrap"
        style={{ fontSize: "clamp(6rem, 18vw, 18rem)", lineHeight: 1 }}>
        @drjosephdardas
      </span>
    </div>

    <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center gap-10"
      >
        <div className="overline">— Journal · Instagram</div>

        <h2 className="font-serif-display text-5xl md:text-7xl xl:text-8xl text-white leading-[1.0] tracking-tight max-w-4xl">
          Les coulisses<br />
          <em className="italic text-[#D4AF37]">d'une signature.</em>
        </h2>

        <p className="text-white/45 font-light text-base md:text-lg max-w-md leading-relaxed">
          Découvrez les transformations, les coulisses du cabinet et l'expertise
          du Dr Dardas au quotidien — sur Instagram.
        </p>

        <div className="flex items-center gap-2 text-white/30 text-sm tracking-widest uppercase font-medium">
          <span className="w-8 h-px bg-[#D4AF37]/40" />
          @drjosephdardas
          <span className="w-8 h-px bg-[#D4AF37]/40" />
        </div>

        <motion.a
          href="https://www.instagram.com/drjosephdardas/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="instagram-follow"
          className="btn-gold text-sm px-10 py-4"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          Suivre @drjosephdardas →
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default InstagramGrid;
