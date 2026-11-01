'use client'
import { socials } from "@/constants"
import { useIris } from "@/utils/IrisProvider";
import Reveal from "@/utils/Reveal"
import { School } from "lucide-react";
import { FiArrowLeft, FiArrowRight, FiArrowUpLeft } from "react-icons/fi";

const page = () => {
  const navigate = useIris()
  return (
    <div className='min-h-screen p-4 sm:px-14 sm:py-11 w-screen'>
      <div className="space-y-3 p-1 w-full">
        <div className="">
          <Reveal>
            <img alt="Personal Info" loading="lazy" width="52" height="61" decoding="async" data-nimg="1"
              src="about_img.svg"
            />
          </Reveal>
        </div>
        <div className="">
          <Reveal><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h1></Reveal>
        </div>
        <div className="mt-2 sm:mt-8 flex flex-col gap-3 sm:flex-row items-start w-full">

          <div className="w-full sm:w-[37%] flex flex-col gap-3">
            <Reveal>
              <h1 className="text-2xl font-semibold leading-[1.2]">
                My approach to the work is<br></br>
                <span className="font-serif italic font-normal tracking-tight">{' '}logic, consistency, and rationality.</span>
              </h1>
            </Reveal>
            <div className="flex gap-1 items-center mt-1 text-sm">
              <Reveal>
                <button onClick={(e) => navigate(`/`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <FiArrowLeft size={18} />
                  Back to Home
                </button>
              </Reveal>
              <Reveal>
                <button onClick={(e) => navigate(`/skills`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  My Skills
                  <FiArrowRight size={18} />
                </button>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full sm:w-[55%]">
            <div className="space-y-3">
              <Reveal>
                <h2 className="font-medium text-slate-300 tracking-tight leading-[1.3]">
                  Hello I'm Jeesan a fullstack developer based in Kolkata, India. I'm passionate about a wide range of topics including development, design, finance, and anime. Currently, I'm looking for a position in Development & Design / Dev Rel where I can continue creating user-friendly and appealing solutions.
                </h2>
              </Reveal>
              <Reveal>
                <h2 className="font-medium text-slate-300 tracking-tight leading-[1.4]">
                  I enjoy exploring new technologies, solving challenging problems, and turning ideas into real-world products. From developing full-stack applications to working with microservices, AI agents, and cloud deployment, I'm always looking to learn, build, and grow as a developer.
                </h2>
              </Reveal>
              <Reveal>
                <h2 className="font-medium text-slate-300 tracking-tight leading-[1.4]">
                  Beyond the world of technology, I enjoy playing football and cricket, which keep me active and competitive. I'm also fascinated by philosophy and love exploring different schools of thought, ideas, and perspectives that challenge the way I think about life.
                </h2>
              </Reveal>
            </div>
            <div className="socials w-full">
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
        </div>
        <div className="mt-6 md:mt-10 flex flex-col gap-7">
          <div className="flex items-center gap-6 w-full">
            <Reveal><h2 className="text-xl sm:text-2xl font-semibold">My Education</h2></Reveal>
            <Reveal><FiArrowRight size={20} /></Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full sm:w-[75%] gap-6 sm:gap-0">
            <div className="flex items-start gap-4">
              <Reveal>
                <div className="w-15 sm:w-20 h-15 sm:h-20 rounded-full overflow-hidden">
                  <img src="ju.png" alt="ju" className="w-full h-full object-cover" />
                </div>
              </Reveal>
              <Reveal>
                <div className=" text-slate-300">
                  <p className="text-xl sm:text-2xl font-semibold tracking-tight">Jadavpur University</p>
                  <p className="text-sm sm:text-md font-medium tracking-tight">Bachelor of Engineering in Electrical</p>
                  <p className="text-md font-medium tracking-tight">September 2023 - Present</p>
                  <p className="text-sm sm:text-md font-medium tracking-tight">Current CGPA is 7.4/10</p>
                </div>
              </Reveal>
            </div>
            <div className="flex items-start gap-4">
              <Reveal>
                <div className="w-15 sm:w-20 h-15 sm:h-20 rounded-full overflow-hidden bg-zinc-800/50 flex item-center justify-center p-3">
                  {/* <img src="" alt="" className="w-full h-full object-cover" /> */}
                  <School className="w-[90%] h-[90%]" />
                </div>
              </Reveal>
              <Reveal>
                <div className="text-slate-300">
                  <p className="text-xl sm:text-2xl font-semibold tracking-tight">Pratappur High School</p>
                  <p className="text-sm sm:text-md font-medium tracking-tight">Secondary and Higher Secondary(PCM) Education</p>
                  <p className="text-sm sm:text-md font-medium tracking-tight">Till 2021</p>
                  <p className="text-sm sm:text-md font-medium tracking-tight">Scored 84% in 10th Board and 80% in 12th Board Exam</p>
                </div>
              </Reveal>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page