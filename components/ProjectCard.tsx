'use client'
import Reveal from '@/utils/Reveal';
import { Globe, Globe2 } from 'lucide-react'
import { MdDone } from 'react-icons/md';
import { TfiArrowTopRight } from "react-icons/tfi";

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

const ProjectCard = ({ key, project }: { key: number, project: ProjectType }) => {
  return (
    <div className='flex flex-col md:flex-row items-start gap-10 hover:bg-zinc-800/30 p-2 transition-colors duration-500 group'>
      <div className="flex flex-col gap-4">
        <Reveal>
          <div className="images flex items-center gap-2">
            {/* {project.images.map((img, i) => (
            <div className="w-40 h-40 overflow-hidden" key={i}>
              <img src={img} alt="project image" className="w-full h-full object-cover" />
            </div>
          ))} */}
            <div className="w-70 h-38 overflow-hidden border border-slate-200/20 rounded-lg cursor-pointer">
              <img src={project.images[0]} alt="project image" className="w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex items-center gap-4 text-sm text-slate-200 font-medium tracking-tight">
            <a href={project.liveUrl} className="border border-slate-200/40 px-2 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500">
              <TfiArrowTopRight size={16} />
              <p className="">Live Demo</p>
            </a>
            <a href={project.githubUrl} className="border border-slate-200/40 px-2 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500">
              <Globe size={16} />
              <p className="">Source Code</p>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="space-y-4">
        <Reveal>
          <div className="flex items-center gap-4 w-full pr-2">
            <h1 className="capitalize text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
            <TfiArrowTopRight size={22} className='mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-normal duration-500' />
          </div>
        </Reveal>
        <Reveal>
          <div className="">
            <h2 className="text-xl font-medium leading-[1.2]">{project.description}</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex flex-col gap-1">
            {project.features.map((feature, i) => (

              <p className="flex items-center gap-1 text-base font-medium leading-[1.2] tracking-tight" key={i}>
                <MdDone size={16} />
                {feature}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="flex items-center gap-2 flex-wrap">
            {project.technologies.map((tech, i) => (
              <div className="border border-slate-200/40 px-2 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500" key={i}>{tech}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default ProjectCard