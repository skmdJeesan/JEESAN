// ProjectModal.tsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ImageCarousel from "./ImageCarousel";

interface ProjectType {
  slug: string,
  title: string,
  description: string,
  images: string[],
  technologies: string[],
  liveUrl: string,
  githubUrl: string,
  features: string[]
}

type Props = { project: ProjectType; open: boolean; onClose: () => void };

export default function ProjectModal({ project, open, onClose }: Props) {
  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Centering layer (doesn't block backdrop clicks) */}
          <div className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              layoutId={`card-${project.slug}`}
              className="pointer-events-auto w-full max-w-4xl overflow-hidden bg-white dark:bg-zinc-800 shadow-2xl"
              style={{ borderRadius: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ImageCarousel images={project.images} />

              {/* Content fades in after the expand */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <h2 className="text-2xl font-semibold text-slate-200">{project.title}</h2>
                <p className="mt-1 text-base text-slate-400 tracling-tight leading-[1.1]">{project.description}</p>
              </motion.div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-6 top-6 cursor-pointer hover:bg-slate-200 z-10 grid size-8 place-items-center rounded-full bg-slate-200/80 text-black"
              >
                ✕
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}