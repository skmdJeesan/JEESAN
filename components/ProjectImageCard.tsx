import { useState } from "react";
import { motion } from "motion/react";
import ProjectModal from "./ProjectModal";

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

export default function ProjectCard({ project }: { project: ProjectType }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative pt-4 overflow-visible">
        <motion.div
          layoutId={`card-${project.slug}`}
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative w-70 aspect-video cursor-pointer"
          style={{ borderRadius: 8 }}
        >
          {project.images.map((img, i) => (
            <div
              key={i}
              className="absolute left-0 w-full aspect-video overflow-hidden rounded-lg border border-slate-300/30"
              style={{ top: `${-i * 2}px`, zIndex: project.images.length - i }}
            >
              <img src={img} alt={`Project image ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={project} open={open} onClose={() => setOpen(false)} />
    </>
  );
}