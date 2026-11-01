'use client'
import { experiences } from "@/constants"
import { useIris } from "@/utils/IrisProvider"
import Reveal from "@/utils/Reveal"
import { FaApple } from "react-icons/fa"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

const page = () => {
  const navigate = useIris()
  const quote = `
    Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy people who are crazy enough to think they can change the world, are the ones who do.
  `
  return (
    <>
      <div className='p-4 sm:px-15 sm:py-9'>
        <div className="space-y-3 p-1 w-full">
          <div className="">
            <Reveal>
              <img alt="Personal Info" loading="lazy" width="52" height="61" decoding="async" data-nimg="1"
                src="experience_img.svg"
              />
            </Reveal>
          </div>

          <div className="mb-3 sm:mb-9 w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
            <Reveal><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Experiences</h1></Reveal>
            <div className="flex gap-1 items-center mt-3 text-sm">
              <Reveal>
                <button onClick={(e) => navigate(`/`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <FiArrowLeft size={18} />
                  Home
                </button>
              </Reveal>
              <Reveal>
                <button onClick={(e) => navigate(`/activity`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <FiArrowLeft size={18} />
                  <p className="hidden sm:block">Back to Activity</p>
                </button>
              </Reveal>
              <Reveal>
                <button onClick={(e) => navigate(`/contact`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <p className="hidden sm:block">Let&apos;s Connect</p>
                  <FiArrowRight size={18} />
                </button>
              </Reveal>
            </div>
          </div>

          <div className="mt-0 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {experiences.map((item) => (
              <Reveal key={item.title}>
                <article className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold leading-snug text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 font-serif italic text-base sm:text-lg leading-snug text-slate-300">
                    {item.org}
                  </p>

                  <p className="mt-2 text-xs sm:text-sm italic text-slate-400">
                    {item.date}
                  </p>

                  <div className="mt-3 space-y-2 text-sm sm:text-base leading-[1.2] text-slate-300">
                    {item.description.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white text-neutral-900 mt-0 sm:mt-7">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3 md:gap-10 md:px-6 md:py-10">
          {/* Left: heading + attribution */}
          <div className="md:col-span-1">
            <Reveal>
              <h2 className="font-semibold text-xl leading-snug md:text-base lg:text-lg">
                Stay <em className="font-normal">Hungry</em> Stay{" "}
                <em className="font-normal">Foolish</em> —
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-2 flex flex-wrap items-center gap-x-1.5 font-serif italic text-neutral-800">
                <FaApple className="shrink-0 text-lg not-italic" aria-hidden />
                <span className="font-bold">Steve Jobs</span>
                <span>, Ex CEO of Apple Inc.</span>
              </p>
            </Reveal>
          </div>

          {/* Right: quote body */}
          <Reveal className="text-base leading-relaxed text-neutral-700 md:col-span-2 md:text-[15px] lg:text-base">
            <p>{quote}</p>
          </Reveal>
        </div>
      </section>

    </>
  )
}

export default page