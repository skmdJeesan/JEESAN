"use client";
import { useEffect } from "react";

export default function ClickSound() {
  useEffect(() => {
    const audio = new Audio("/click.wav");
    audio.preload = "auto";
    audio.volume = 0.8;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // only react to buttons, links, or anything marked as a button
      if (!target.closest("button, a, [role='button'], div")) return;

      audio.currentTime = 0; // restart so rapid clicks still play
      audio.play().catch(() => {}); // ignore blocked-play errors
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}