'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";

const treatments = [
  {
    num: "I",
    title: "Alignement dentaire invisible",
    body: "Aligneurs sur-mesure, discrets et amovibles. Conçu avec scan iTero 3D pour un résultat millimétré sans contrainte visible.",
    photo: "https://images.unsplash.com/photo-1609840113929-b130355987e1?auto=format&fit=crop&w=700&q=80",
    position: "50% 30%",
  },
  {
    num: "II",
    title: "Chirurgie dentaire",
    body: "Interventions maxillo-faciales de précision, menées en collaboration avec des chirurgiens partenaires de référence à Paris.",
    photo: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=700&q=80",
    position: "50% 20%",
  },
  {
    num: "III",
    title: "Orthodontie pour adulte",
    body: "Il n'existe pas d'âge pour un sourire d'exception. Protocoles discrets et efficaces adaptés aux exigences de vie des adultes.",
    photo: "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&w=700&q=80",
    position: "50% 25%",
  },
  {
    num: "IV",
    title: "Orthopédie dento-faciale",
    body: "Traitement global de l'harmonie faciale — équilibre squelettique, occlusion et esthétique réunis dans un protocole unique.",
    photo: "https://images.unsplash.com/photo-1667133295308-9ef24f71952e?auto=format&fit=crop&w=700&q=80",
    position: "50% 20%",
  },
  {
    num: "V",
    title: "Technique linguale",
    body: "Attaches positionnées à l'intérieur des dents. Totalement invisibles de face — l'orthodontie de l'exigence absolue.",
    photo: "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=700&q=80",
    position: "50% 50%",
  },
  {
    num: "VI",
    title: "Diagnostic 3D iTero",
    body: "Scan numérique iTero, modélisation prédictive et visualisation du résultat final avant le premier rendez-vous de traitement.",
    photo: "https://images.unsplash.com/photo-1667133295311-e6911e6e22db?auto=format&fit=crop&w=700&q=80",
    position: "50% 30%",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: (i % 3) * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const TreatmentCard = ({ t, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardVariants}
      className="group bg-white flex flex-col overflow-hidden border border-[rgba(26,21,10,0.07)] hover:shadow-lg transition-shadow duration-700"
      data-testid={`treatment-${index + 1}`}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE5D6] shrink-0">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#EDE5D6] to-[#D4C5A9]">
            <span className="font-serif-display italic text-7xl text-[#D4AF37]/30 leading-none">{t.num}</span>
          </div>
        ) : (
          <img
            src={t.photo}
            alt={t.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ objectPosition: t.position }}
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4 font-serif-display italic text-white/80 text-sm tracking-widest drop-shadow">
          {t.num}.
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7 md:p-8">
        <div className="w-8 h-px bg-[#D4AF37] mb-5 group-hover:w-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        <h3 className="font-serif-display text-xl md:text-2xl text-[#1C150A] mb-3 leading-snug">
          {t.title}
        </h3>
        <p className="text-sm text-[#6B5D4A] font-light leading-[1.8] flex-1 mb-6">
          {t.body}
        </p>
        <a
          href="https://www.doctolib.fr/orthodontiste/paris/joseph-dardas"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#8B6914] text-xs font-medium tracking-widest uppercase hover:gap-3 transition-all duration-300"
        >
          En savoir plus <span>→</span>
        </a>
      </div>
    </motion.article>
  );
};

const TreatmentsGrid = () => (
  <section
    id="traitements"
    className="relative py-28 md:py-44 border-t border-[rgba(26,21,10,0.06)] bg-[#FAF7F2]"
    data-testid="treatments-section"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
      >
        <div>
          <div className="overline-dark mb-5">— Spécialités · Traitements</div>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#1C150A] leading-[1.05] tracking-tight">
            Six disciplines. <em className="italic text-[#9A7B1A]">Une signature.</em>
          </h2>
        </div>
        <a
          href="https://www.doctolib.fr/orthodontiste/paris/joseph-dardas"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-dark shrink-0"
        >
          Prendre rendez-vous
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {treatments.map((t, i) => (
          <TreatmentCard key={t.num} t={t} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default TreatmentsGrid;
