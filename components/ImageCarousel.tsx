import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.92 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.92 }),
};

const SWIPE_POWER = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export default function ImageCarousel({ images }: { images: string[] }) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const index = ((page % images.length) + images.length) % images.length; // wrap around

  const paginate = (dir: number) => setPage([page + dir, dir]);
  const goTo = (i: number) => setPage([i, i > index ? 1 : -1]);

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const power = swipePower(offset.x, velocity.x);
    if (power < -SWIPE_POWER) paginate(1);
    else if (power > SWIPE_POWER) paginate(-1);
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[index]}
          alt={`Project image ${index + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.3 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={onDragEnd}
          className="absolute inset-0 h-full w-full object-contain select-none"
          draggable={false}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-50 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-slate-200/50 text-black hover:bg-slate-200/70"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-50 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-slate-200/50 cursor-pointer text-black hover:bg-slate-200/70"
          >
            <FaArrowRight />
          </button>

          {/* Dots */}
          <div className="absolute -bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to image ${i + 1}`} className="p-1">
                <motion.span
                  className="block h-2 rounded-full bg-white"
                  animate={{ width: i === index ? 20 : 8, opacity: i === index ? 1 : 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}