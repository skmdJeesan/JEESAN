'use client'
import { useIris } from "@/utils/IrisProvider"
import Reveal from "@/utils/Reveal"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

const page = () => {
  const navigate = useIris()
  return (
    <div className='min-h-screen p-4 sm:px-14 sm:py-11'>
      <div className="space-y-3 p-1 w-full">
        <div className="flex gap-1 items-center mb-4 text-sm">
        <Reveal>
          <button onClick={(e) => navigate(`/`, e)}
            className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
            <FiArrowLeft size={18} />
            <p className="block">Home</p>
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
    </div>
  )
}

export default page