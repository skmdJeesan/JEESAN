'use client'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import GithubStats from './GithubStats'
import LeetCodeStats from './LeetCodeStats'
import Reveal from '@/utils/Reveal'
import { useIris } from '@/utils/IrisProvider'

const Activity = () => {
  const navigate = useIris()
  return (
    <section className="flex flex-col items-center p-4">
      <div className="flex gap-1 items-center mb-4 text-sm">
        <Reveal>
          <button onClick={(e) => navigate(`/`, e)}
            className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
            <FiArrowLeft size={18} />
            Home
          </button>
        </Reveal>
        <Reveal>
          <button onClick={(e) => navigate(`/projects`, e)}
            className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
            <FiArrowLeft size={18} />
            <p className="hidden sm:block">Back to Projects</p>
          </button>
        </Reveal>
        <Reveal>
          <button onClick={(e) => navigate(`/acheivements`, e)}
            className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
            <p className="hidden sm:block">My Acheivements</p>
            <FiArrowRight size={18} />
          </button>
        </Reveal>
      </div>
      <Reveal className="relative mb-8 w-full text-center">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            GitHub <span className="font-serif italic text-slate-300">Activity</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            A snapshot of my consistency, contribution streaks, and recent work across GitHub.
          </p>
        </div>
      </Reveal>
      <div className="w-full max-w-6xl">
        <GithubStats username="skmdJeesan" />
        <div className="mt-8 sm:mt-12">
          <LeetCodeStats username="Jeesan" />
        </div>
      </div>
    </section>
  )
}

export default Activity