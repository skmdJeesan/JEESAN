'use client'
import { useState } from "react"
import { technologies } from "@/constants"
import { useIris } from "@/utils/IrisProvider"
import Reveal from "@/utils/Reveal"
import { FiArrowUpLeft, FiArrowRight, FiArrowLeft } from "react-icons/fi"

// key must match the values used in `type` inside constants.ts
const categories = [
  { key: 'frontend', label: 'frontend' },
  { key: 'backend', label: 'backend' },
  { key: 'database', label: 'database' },
  { key: 'devops', label: 'devops' },
  { key: 'cloud', label: 'cloud' },
  { key: 'gen_ai', label: 'gen ai' },
  { key: 'others', label: 'others' },
] as const

type CategoryKey = (typeof categories)[number]['key']

const SkillsPage = () => {
  const navigate = useIris()
  const [active, setActive] = useState<CategoryKey | null>(null)

  return (
    <div className='min-h-screen p-4 sm:p-8 lg:px-12 lg:py-11'>
      <div className="space-y-3 p-1 w-ful">
        <div className="">
          <Reveal>
            <img alt="Personal Info" loading="lazy" width="52" height="61" decoding="async" data-nimg="1"
              src="skills_img.svg"
            />
          </Reveal>
        </div>
        <div className="">
          <Reveal><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Skills</h1></Reveal>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start w-full gap-3">

          <div className="w-full sm:w-[37%] flex flex-col justify-between gap-3">
            <Reveal>
              <h1 className="text-2xl font-semibold leading-[1.2]">
                I build things for the people<br></br>
                <span className="font-serif italic font-normal tracking-tight">{' '}I can Design, Develop, Deploy</span>
              </h1>
            </Reveal>
            <div className="flex gap-1 items-center mt-1 text-sm">
              <Reveal>
                <button onClick={(e) => navigate(`/`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <FiArrowLeft size={18} />
                  Home
                </button>
              </Reveal>
              <Reveal>
                <button onClick={(e) => navigate(`/about`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <FiArrowLeft size={18} />
                  <p className="hidden lg:block">About</p>
                </button>
              </Reveal>
              <Reveal>
                <button onClick={(e) => navigate(`/projects`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <p className="hidden lg:block">Projects</p>
                  <FiArrowRight size={18} />
                </button>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full sm:w-[55%]">
            <div className="space-y-3">
              <Reveal>
                <h2 className="font-medium text-slate-300 tracking-tight leading-[1.3]">
                  My go-to stack is Next JS (With TypeScript & Tailwind CSS), which was previously known as the MERN Stack for web-based solutions. I have collaborated with developers to create a variety of open-source solutions.
                </h2>
              </Reveal>
              <Reveal>
                <h2 className="font-medium text-slate-300 tracking-tight leading-[1.4]">
                  Beyond frontend development, I enjoy building robust backend systems, integrating AI capabilities, and designing scalable architectures. I'm also familiar with technologies like Docker, AWS, Redis, and CI/CD pipelines, which help me take applications from development to deployment.
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start lg:items-center mt-6 sm:mt-10 w-full gap-3">
          <div className="flex items-center gap-6 w-full sm:w-[37%]">
            <Reveal><h2 className="text-xl font-semibold">Skills</h2></Reveal>
            <Reveal><FiArrowRight size={20} /></Reveal>
          </div>
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 w-full sm:w-[55%]">
            {categories.map(({ key, label }) => (
              <Reveal key={key}>
                <button
                  type="button"
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(key)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(null)}
                  onClick={() => setActive(key)}
                  onFocus={() => setActive(key)}
                  onBlur={() => setActive(null)}
                  className={`capitalize border px-2 py-1 cursor-pointer flex items-center gap-2 w-fit transition-colors duration-500 text-sm
                    ${active === key
                      ? 'bg-slate-200 text-zinc-900 border-slate-200'
                      : 'border-slate-200/40'}`}
                >
                  {label}
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start mt-8 w-full gap-3">
          <div className="flex items-center gap-6 w-full sm:w-[37%]">
            <Reveal><h2 className="text-xl font-semibold">Work Stack</h2></Reveal>
            <Reveal><FiArrowRight size={20} /></Reveal>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5 w-full sm:w-fit">
            {technologies.map((tech, i) => {
              const Icon = tech.logo
              const isMatch = active !== null && tech.type.includes(active)
              const isDimmed = active !== null && !isMatch

              return (
                <Reveal key={i}>
                  <div
                    className={`flex max-w-fit px-1 cursor-pointer items-center gap-2 border-b-4 border-transparent
                      transition-all duration-300 motion-reduce:transition-none
                      ${isDimmed ? 'opacity-20' : 'opacity-100'}
                      ${isMatch ? 'translate-x-1 text-slate-200' : 'text-slate-300 hover:text-slate-200'}`}
                  >
                    <Icon size={18} />
                    <p className="text-xs">{tech.name}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsPage