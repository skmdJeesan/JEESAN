"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const MIN_TIME = 1800; // ms, so it never flashes too quickly
const INTRO_STORAGE_KEY = "seen-intro-v2";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  // Wait for BOTH: the page fully loaded and the minimum time passed
  useEffect(() => {
    if (localStorage.getItem(INTRO_STORAGE_KEY)) return;

    queueMicrotask(() => setLoading(true));
    const minTime = new Promise((r) => setTimeout(r, MIN_TIME));
    const pageLoaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });
    Promise.all([minTime, pageLoaded]).then(() => {
      localStorage.setItem(INTRO_STORAGE_KEY, "true");
      setLoading(false);
    });
  }, []);

  // Counter 0 -> 100 over MIN_TIME
  useEffect(() => {
    if (!loading) return;

    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / MIN_TIME, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loading]);

  // Lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const text = "Hello, World:)"

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-zinc-950 text-white"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl font-serif italic font-semibold tracking-tight sm:text-2xl"
            >
              {text}
            </motion.h1>

            {/* Progress bar */}
            <div className="mt-2 h-0.5 w-40 overflow-hidden rounded-full bg-white/20 sm:w-56">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${count}%` }}
              />
            </div>

            <span className="absolute bottom-6 right-6 text-5xl font-light tabular-nums sm:bottom-10 sm:right-10 sm:text-7xl">
              {count}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}