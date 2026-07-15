"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children, className = "", delay = 0, y = 28 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HeroImageMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.045]);
  return <motion.div ref={ref} style={{ y, scale }} className="absolute inset-0 will-change-transform">{children}</motion.div>;
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return;
    const start = performance.now();
    const duration = 1250;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return <span ref={ref}>{(reduce ? value : display).toLocaleString("en-GB")}{suffix}</span>;
}

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -8, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const content = [...items, ...items];
  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <motion.div
        className="marquee-track"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {content.map((item, i) => <span key={`${item}-${i}`}><i />{item}</span>)}
      </motion.div>
    </div>
  );
}
