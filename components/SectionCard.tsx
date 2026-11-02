'use client'
import { useIris } from '@/utils/IrisProvider';
import Reveal from '@/utils/Reveal';
import { MdArrowOutward } from "react-icons/md";

interface props { route: string, title: string, desc: string }
const SectionCard = ({ route, title, desc }: props) => {
  const navigate = useIris()
  return (
    <Reveal className="relative h-full w-full overflow-hidden" motionClassName="h-full">
      <div onClick={(e) => navigate(`/${route}`, e)}
        role='button' className='h-full p-2 sm:p-4 border border-slate-200/40 hover:bg-slate-200 group transition-colors duration-500 cursor-pointer tablet:p-2'>
        <div className="flex flex-col justify-between">
          <div className="flex items-center-safe justify-between">
            <h1 className="text-xl font-bold tracking-tight text-slate-200 group-hover:text-zinc-800 sm:text-2xl tablet:text-xl">{title}</h1>
            <div className="">
              <MdArrowOutward
                className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-zinc-800 sm:h-6 sm:w-6 tablet:h-4 tablet:w-4"
              /></div>
          </div>
          <h4 className="mt-3 sm:mt-4 text-xs font-medium tracking-normal leading-[1.2] text-slate-300 group-hover:text-zinc-700 sm:text-sm group-hover:font-serif group-hover:italic group-hover:text-md tablet:mt-3 tablet:text-xs">{desc}</h4>
        </div>
      </div>
    </Reveal>
  )
}

export default SectionCard