'use client';
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Single element fade-in on scroll
export const FadeIn = ({ children, delay = 0, y = 55, duration = 1.1, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

// Parent — triggers children one by one
export const Stagger = ({ children, className = "", stagger = 0.14, delayChildren = 0.05 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-20px" }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren } } }}
    className={className}
  >
    {children}
  </motion.div>
);

// Child — used inside <Stagger>
export const StaggerItem = ({ children, y = 55, className = "", as = "div" }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 1.15, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
};
