'use client';
import { motion } from "framer-motion";

const credentials = [
  "ADF — Académie Dentaire de France",
  "20 ans d'expérience clinique",
  "+2 000 patients traités",
  "Société Française d'Orthodontie",
  "Invisalign Certified Provider",
  "Attaches Linguales — Incognito",
  "Diplôme d'État · Paris",
  "Cabinet Privé · Madeleine & Reuilly",
];

const TrustStrip = () => {
  const items = [...credentials, ...credentials];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden border-y border-[rgba(250,250,250,0.06)] py-4 bg-[#0D0D0E]"
      data-testid="trust-strip"
    >
      <div className="flex whitespace-nowrap marquee-track">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-8">
            <span className="text-[#D4AF37]/40 text-xs select-none">✦</span>
            <span className="text-xs font-light tracking-[0.22em] uppercase text-white/40">
              {item}
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustStrip;
