'use client'
import { MdArrowDownward } from "react-icons/md";
import Footer from "./Footer";
import SectionCard from "./SectionCard";
import Reveal from "@/utils/Reveal";

const Right = () => {
  const sections = [
    { route: 'about', title: 'About Me', desc: 'Get to know my journey, background, and passion for technology.' },
    { route: 'skills', title: 'My Skills', desc: 'Explore the technologies and tools I use to build modern applications.' },
    { route: 'projects', title: 'Projects', desc: 'Discover the projects I have built and the problems they solve.' },
    { route: 'activity', title: 'Live Activity', desc: 'See what I am currently learning, building, and contributing to.' },
    { route: 'acheivements', title: 'Achievements', desc: 'A glimpse of my milestones, accomplishments, and coding journey.' },
    { route: 'contact', title: 'Contact', desc: 'Have an idea or opportunity? Let’s connect and make it happen.' },
  ];
  return (
    <div className="w-full sm:w-[75%] p-1 sm:pl-16 sm:pr-10 sm:py-4 flex flex-col justify-between">
      <div className="hidden sm:block">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-transparent [-webkit-text-stroke:0.5px_var(--color-slate-400)] sm:text-5xl hover:text-slate-400 transition-colors duration-500">
            Explore my{' '}
            <span className="font-serif italic">portfolio</span>{' '}
            by clicking the sections below
          </h1>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 w-full">
        {sections.map(({ route, title, desc }) => (
          <SectionCard key={route} route={route} title={title} desc={desc} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Right