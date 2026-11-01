'use client'
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/constants"
import Reveal from "@/utils/Reveal"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useIris } from "@/utils/IrisProvider";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const page = () => {
  const navigate = useIris()
  return (
    <div className='min-h-screen p-4 sm:px-12 sm:py-11'>
      <div className="space-y-3 sm:p-1 w-full">
        <div className="">
          <Reveal>
            <img alt="Personal Info" loading="lazy" width="52" height="61" decoding="async" data-nimg="1"
              src="projects_img.svg"
            />
          </Reveal>
        </div>
        <div className="mb-3 sm:mb-9 w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
          <Reveal><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1></Reveal>
          <div className="flex gap-1 items-center mt-3 text-sm">
            <Reveal>
              <button onClick={(e) => navigate(`/`, e)}
                className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                <FiArrowLeft size={18} />
                Home
              </button>
            </Reveal>
            <Reveal>
              <button onClick={(e) => navigate(`/skills`, e)}
                className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                <FiArrowLeft size={18} />
                <p className="hidden sm:block">Back to Skills</p>
              </button>
            </Reveal>
            <Reveal>
              <button onClick={(e) => navigate(`/activity`, e)}
                className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                <p className="hidden sm:block">See My Activity</p>
                <FiArrowRight size={18} />
              </button>
            </Reveal>
          </div>
        </div>

        <div className="projects flex flex-col gap-15 w-full">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>

        <Reveal>
          <a href="https://github.com/skmdJeesan?tab=repositories" target="_blank" className="flex items-center gap-4 group cursor-pointer mt-7 w-full">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl group-hover:border-b group-hover:border-b-slate-200/30 transition-colors duration-500">View More Projects</h2>
            <FaArrowRight size={18} className="group-hover:translate-x-0.5 transition-all duration-500" />
          </a>
        </Reveal>
      </div>
    </div>
  )
}

export default page