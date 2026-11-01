// components/MusicToggle.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SRC = "/myeyes.mp3";
const KEY = "music-enabled";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;

    // Keep UI state in sync with the real audio state
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Resume if the visitor had music on last time
    const resume = (e: Event) => {
      window.removeEventListener("pointerdown", resume);
      // if they tapped the toggle itself, let its own click handler decide
      if ((e.target as HTMLElement).closest("[data-music-toggle]")) return;
      audio.play().catch(() => {});
    };

    if (localStorage.getItem(KEY) === "1") {
      audio.play().catch(() => {
        // autoplay blocked -> wait for the first interaction
        window.addEventListener("pointerdown", resume);
      });
    }

    return () => {
      window.removeEventListener("pointerdown", resume);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      localStorage.setItem(KEY, "1");
    } else {
      audio.pause();
      localStorage.setItem(KEY, "0");
    }
  };

  return (
    <motion.button
      data-music-toggle
      data-no-sound
      onClick={toggle}
      aria-label={playing ? "Turn music off" : "Turn music on"}
      aria-pressed={playing}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="fixed bottom-5 right-5 z-50 grid size-9 place-items-center rounded-full border border-white/10 bg-zinc-900 text-slate-200 shadow-lg backdrop-blur-md sm:bottom-6 sm:right-6"
    >
      {playing ? <Equalizer /> : <MutedIcon />}
    </motion.button>
  );
}

/* Animated bars while music is playing */
function Equalizer() {
  return (
    <div className="flex h-3 items-end gap-0.75" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-white"
          animate={{ height: ["30%", "100%", "50%", "90%", "30%"] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

/* Speaker with a slash when music is off */
function MutedIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}