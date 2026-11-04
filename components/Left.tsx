'use client'
import Typewriter from "typewriter-effect";
import { Download } from "lucide-react";
import Reveal from "@/utils/Reveal";
import { useIris } from "@/utils/IrisProvider";
import { socials } from "@/constants";

const Left = () => {
  const messages = [
    "I engineer scalable, full-stack applications with modern technologies.",
    "I build AI-driven applications that simplify workflows and solve business challenges.",
    "I design & craft beautiful websites for users.",
  ]

  const quick_links = ['about', 'skills', 'projects', 'activity']
  const navigate = useIris()

  return (
    <div className="w-full lg:w-[30%] sm:border-r sm:border-r-white/20 flex flex-col justify-between">
      <div className="top p-1 sm:px-2 sm:py-4">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            <a href="/">Jeesan</a>
          </h1>
        </Reveal>
        <Reveal>
          <h2 className="mt-2 text-lg font-medium tracking-tight sm:text-xl">
            Fullstack Developer
          </h2>
        </Reveal>
        <Reveal>
          <div className="mt-2 h-10 mb-2 text-base font-medium tracking-tight leading-[1.1] text-slate-300 sm:text-md font-serif italic">
            <Typewriter
              options={{
                strings: messages,
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 40,
                cursor: "_",
              }}
            />
        </div>
        </Reveal>
        <Reveal>
          <a href="resume.pdf" download="resume.pdf"
            className="mt-4 border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500"
          >
            <Download size={16} />
            Resume
          </a>
        </Reveal>
      </div>

      <div className="middle hidden md:block px-6 h-[40%]">
        <nav className="" aria-label="In-page jump links">
          <ul className="w-full">
            {quick_links.map((link, i) => (
              <Reveal key={i}>
                <li onClick={(e) => navigate(`/${link}`, e)}>
                  <a className="group flex items-center py-3 active" href={`#${link}`}>
                    <span className="nav-indicator mr-4 h-px w-7 bg-slate-300 transition-all group-hover:w-14 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-base font-bold uppercase tracking-wider text-slate-300 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 ">0{i+1}</span>
                        {link}
                      </div>
                    </span>
                  </a>
              </li>
              </Reveal>
            ))}
          </ul>
        </nav>
      </div>

      <div className="bottom w-full px-2 py-6">
        <ul className="flex flex-wrap items-center gap-3">
          {socials.map(({ name, href, Icon }) => (
            <Reveal key={name}>
              <li>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="flex h-6 sm:h-8 w-6 sm:w-8 items-center justify-center rounded-md border border-slate-200/20 bg-white/5 text-slate-200 transition-colors duration-400 hover:border-slate-200/50 hover:bg-slate-200 hover:text-zinc-800"
                >
                  <Icon className="w-4 h-4" />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Left