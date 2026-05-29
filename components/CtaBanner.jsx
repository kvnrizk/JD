'use client';
import React from "react";
import { motion } from "framer-motion";

const DOCTOLIB_URL = "https://www.doctolib.fr/orthodontiste/paris/joseph-dardas";

const CtaBanner = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className="relative py-20 md:py-24 bg-[#D4AF37] overflow-hidden"
    data-testid="cta-banner"
  >
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-[#0B0B0C] leading-[1.05] tracking-tight">
          Votre sourire mérite<br />
          <em className="italic font-light">l'excellence.</em>
        </div>
      </motion.div>
      <motion.a
        href={DOCTOLIB_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0 inline-flex items-center gap-3 px-8 py-5 bg-[#0B0B0C] text-white text-xs font-medium tracking-[0.22em] uppercase transition-transform duration-500 hover:-translate-y-1"
      >
        Prendre rendez-vous
        <span className="text-[#D4AF37] text-base">→</span>
      </motion.a>
    </div>
  </motion.section>
);

export default CtaBanner;
