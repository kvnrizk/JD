'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";

const FALLBACK_CLINICS = [
  {
    id: "madeleine",
    name: "Cabinet Madeleine",
    city: "Madeleine",
    address: "8 Boulevard de la Madeleine, 75009 Paris",
    phone: "01 XX XX XX XX",
    doctolib_url: "https://www.doctolib.fr/orthodontiste/paris/joseph-dardas",
    map_url: "https://maps.google.com/maps?q=8+Boulevard+de+la+Madeleine+75009+Paris&output=embed",
  },
  {
    id: "reuilly",
    name: "Cabinet Reuilly",
    city: "Reuilly",
    address: "44 Boulevard de Reuilly, 75012 Paris",
    phone: "01 XX XX XX XX",
    doctolib_url: "https://www.doctolib.fr/orthodontiste/paris/joseph-dardas",
    map_url: "https://maps.google.com/maps?q=44+Boulevard+de+Reuilly+75012+Paris&output=embed",
  },
];

const ClinicsSection = () => {
  const [clinics, setClinics] = useState(FALLBACK_CLINICS);

  useEffect(() => {
    api.get("/clinics").then((res) => { if (res.data?.length) setClinics(res.data); }).catch(() => {});
  }, []);

  return (
    <section
      id="cliniques"
      className="relative py-28 md:py-44 border-t border-[rgba(26,21,10,0.06)] bg-[#FAF7F2]"
      data-testid="clinics-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <div className="overline-dark mb-6">— Adresses</div>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#1C150A] leading-[1.05] tracking-tight">
            Deux maisons. <em className="italic text-[#9A7B1A]">Une même exigence.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {clinics.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border border-[rgba(26,21,10,0.1)] bg-white overflow-hidden hover:border-[#D4AF37]/60 transition-colors duration-700"
              data-testid={`clinic-card-${c.city.toLowerCase()}`}
            >
              {/* Map */}
              <div className="aspect-[16/9] w-full overflow-hidden relative">
                {c.map_url ? (
                  <iframe
                    src={c.map_url}
                    title={`Carte ${c.city}`}
                    className="w-full h-full"
                    loading="lazy"
                    style={{ border: 0, filter: "sepia(0.15) contrast(0.95) brightness(1.02)" }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#EDE5D6] to-[#FAF7F2]"></div>
                )}
                <div className="absolute top-4 right-4 overline-dark px-3 py-2 bg-white/80 backdrop-blur-sm border border-[rgba(26,21,10,0.1)]">
                  · {c.city}
                </div>
              </div>

              <div className="p-8 md:p-10">
                <h3 className="font-serif-display text-3xl md:text-4xl text-[#1C150A] mb-6">{c.name}</h3>
                <div className="space-y-3 text-[#6B5D4A] font-light">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-[#D4AF37] mt-0.5">◆</span>
                    <span>{c.address}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-[#D4AF37] mt-0.5">☎</span>
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="link-underline" data-testid={`clinic-phone-${c.city.toLowerCase()}`}>
                      {c.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-[rgba(26,21,10,0.08)]">
                  <a
                    href={c.doctolib_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full justify-center"
                    data-testid={`clinic-doctolib-${c.city.toLowerCase()}`}
                  >
                    Prendre RDV — {c.city}
                    <span className="text-base">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicsSection;
