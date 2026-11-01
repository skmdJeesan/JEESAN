'use client'
import Reveal from '@/utils/Reveal';
import { Globe, Globe2 } from 'lucide-react'
import { MdDone } from 'react-icons/md';
import { TfiArrowTopRight } from "react-icons/tfi";
import ProjectImageCard from '@/components/ProjectImageCard'

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
    <div className='flex flex-col md:flex-row items-start gap-4 sm:gap-10 hover:bg-zinc-800/30 p-0 sm:p-2 transition-colors duration-500 group'>
      <div className="flex flex-col gap-3 sm:gap-4">
        <Reveal>
          <ProjectImageCard project={project}/>
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

      <div className="space-y-2 sm:space-y-4">
        <Reveal>
          <div className="flex items-start sm:items-center gap-4 w-full pr-2">
            <h1 className="capitalize text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h1>
            <TfiArrowTopRight className='h-7 w-7 mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-normal duration-500' />
          </div>
        </Reveal>
        <Reveal>
          <div className="">
            <h2 className="text-sm sm:text-base text-slate-300 font-medium leading-[1.3]">{project.description}</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex flex-col gap-0.5">
            {project.features.map((feature, i) => (
              <p className="flex items-center gap-2 text-sm text-slate-300 font-medium leading-[1.3]" key={i}>
                <MdDone className='w-6 h-6' />
                {feature}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="flex items-center gap-2 flex-wrap text-sm sm:text-base">
            {project.technologies.map((tech, i) => (
              <div className="border border-slate-200/40 p-1 sm:px-2 sm:py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500" key={i}>{tech}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default ProjectCard