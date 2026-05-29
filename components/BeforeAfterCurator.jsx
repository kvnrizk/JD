'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from "react-compare-slider";
import api from "@/lib/api";

const BeforeAfterCurator = () => {
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    api.get("/results").then((res) => setResults(res.data)).catch(() => {});
  }, []);

  const current = results[active];

  return (
    <section
      id="resultats"
      className="relative py-28 md:py-44 border-t border-[rgba(250,250,250,0.06)] bg-[#0B0B0C]"
      data-testid="before-after-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-8"
        >
          <div>
            <div className="overline mb-6">— Curateur Avant / Après</div>
            <h2 className="font-serif-display text-4xl md:text-6xl text-white leading-[1.05] tracking-tight max-w-2xl">
              La preuve, <em className="italic text-[#E8D5A0]">millimètre par millimètre.</em>
            </h2>
          </div>
          <div className="text-white/50 text-sm font-light max-w-sm">
            Glissez le curseur sur le portrait pour révéler la transition. Chaque cas est documenté
            par notre cabinet et reproduit la précision réelle du traitement.
          </div>
        </motion.div>

        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            data-testid="before-after-active"
          >
            <div className="before-after-container relative aspect-[16/10] md:aspect-[21/10] w-full overflow-hidden">
              <ReactCompareSlider
                position={50}
                onPositionChange={setSliderPos}
                handle={<ReactCompareSliderHandle buttonStyle={{ backdropFilter: "none", background: "#0B0B0C", border: "1px solid #D4AF37", boxShadow: "0 0 0 6px rgba(212,175,55,0.15)", width: 56, height: 56, color: "#D4AF37" }} linesStyle={{ background: "#D4AF37", width: 1 }} />}
                itemOne={
                  <ReactCompareSliderImage
                    src={current.before_url}
                    alt="Avant"
                    style={{ objectFit: "cover" }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={current.after_url}
                    alt="Après"
                    style={{ objectFit: "cover" }}
                  />
                }
              />
              <div
                className="absolute top-6 left-6 z-10 overline px-3 py-2 bg-black/40 backdrop-blur-sm border border-white/10 transition-opacity duration-300"
                style={{ opacity: sliderPos < 10 ? 0 : 1 }}
              >Avant</div>
              <div
                className="absolute top-6 right-6 z-10 overline px-3 py-2 bg-black/40 backdrop-blur-sm border border-[#D4AF37]/40 text-[#E8D5A0] transition-opacity duration-300"
                style={{ opacity: sliderPos > 90 ? 0 : 1 }}
              >Après</div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="font-serif-display text-2xl text-white">{current.patient_label}</div>
                <div className="text-sm text-white/45 mt-1">
                  {current.treatment_type} · {current.date}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                {results.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => { setActive(i); setSliderPos(50); }}
                    className={`h-14 w-14 md:h-20 md:w-20 overflow-hidden border transition-all duration-500 ${
                      i === active ? "border-[#D4AF37]" : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                    data-testid={`before-after-thumb-${i}`}
                  >
                    <img src={r.after_url} alt={r.patient_label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {!results.length && (
          <div className="text-white/40 text-center py-20 border border-dashed border-white/10">
            Galerie en cours de préparation.
          </div>
        )}
      </div>
    </section>
  );
};

export default BeforeAfterCurator;
