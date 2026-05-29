'use client';
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    api.get("/clinics").then((res) => setClinics(res.data)).catch(() => {});
  }, []);

  const navItems = [
    { label: "Philosophie", href: "#philosophie" },
    { label: "L'Art", href: "#art" },
    { label: "Services", href: "#traitements" },
    { label: "Résultats", href: "#resultats" },
    { label: "Témoignages", href: "#temoignages" },
    { label: "Cliniques", href: "#cliniques" },
  ];

  const textColor = "text-[#1C150A]/70 hover:text-[#1C150A]";
  const brandColor = "text-[#1C150A]";
  const lineColor = "bg-[#1C150A]";

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 backdrop-blur-xl bg-[#FAF7F2]/90 ${
          scrolled ? "border-b border-[rgba(26,21,10,0.08)] shadow-sm" : "border-b border-transparent"
        }`}
        data-testid="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-3" data-testid="brand-link">
            <span className={`font-serif-display text-2xl tracking-tight transition-colors duration-500 ${brandColor}`}>
              Dr Joseph Dardas
            </span>
            <span
              className="hidden md:inline overline"
              style={{ color: "#8B6914" }}
            >
              Orthodontiste · Madeleine · Reuilly
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`link-underline text-xs tracking-wider transition-colors duration-500 ${textColor}`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="xl:hidden p-2"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            <div className={`w-6 h-px mb-1.5 transition-colors duration-500 ${lineColor}`}></div>
            <div className={`w-6 h-px mb-1.5 transition-colors duration-500 ${lineColor}`}></div>
            <div className={`w-4 h-px ml-auto transition-colors duration-500 ${lineColor}`}></div>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden border-t border-[rgba(26,21,10,0.08)] bg-[#FAF7F2]"
            >
              <div className="px-6 py-8 space-y-5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif-display text-2xl text-[#1C150A]/90"
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating Double CTA */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 md:gap-3 backdrop-blur-xl bg-[#0B0B0C]/70 border border-[rgba(212,175,55,0.25)] p-2 rounded-full"
        data-testid="floating-cta"
      >
        {clinics.map((c) => (
          <a
            key={c.id}
            href={c.doctolib_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full bg-transparent text-white text-[11px] md:text-xs tracking-[0.18em] uppercase font-medium hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all duration-500"
            data-testid={`cta-rdv-${c.city.toLowerCase()}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover:bg-[#0B0B0C] transition-colors"></span>
            RDV · {c.city}
          </a>
        ))}
      </motion.div>
    </>
  );
};

export default Navigation;
