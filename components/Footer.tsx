import { useIris } from "@/utils/IrisProvider";
import Reveal from "@/utils/Reveal";
import React from "react";

const Footer = () => {
  // const navigate = useIris()
  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:gap-6 md:flex-row mt-2 sm:mt-0 w-full">
      <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:gap-8">
        <div className="flex flex-col items-start gap-0.5">
          <Reveal><div>Crafted By</div></Reveal>
          <Reveal className="text-sm">
            <a href="/"
              // onClick={(e) => navigate(`/`, e)}
              className="border-b-2 border-zinc-800 font-serif  font-normal italic"
            >
              Sk Md Jeesan
            </a>
          </Reveal>
        </div>
        <div className="flex flex-col items-start gap-0.5">
          <Reveal><div>Crafted Using</div></Reveal>
          <Reveal>
            <div className="font-serif text-sm  font-normal italic flex items-center gap-2.5">
              <a
                href="https://https://nextjs.org/"
                className="border-b-2 border-zinc-800 font-normal"
                target="_blank"
                rel="noreferrer"
              >
                Next.js
              </a>
              <a
                href="https://www.typescriptlang.org/"
                className="border-b-2 border-zinc-800 font-normal  hover:border-brand-purple"
                target="_blank"
                rel="noreferrer"
              >
                TypeScript
              </a>
              <a
                href="https://tailwindcss.com/"
                className="border-b-2 border-zinc-800 font-normal  hover:border-brand-purple"
                target="_blank"
                rel="noreferrer"
              >
                Tailwind CSS
              </a>
              <a
                href="https://motion.dev/"
                className="border-b-2 border-zinc-800 font-normal  hover:border-brand-purple"
                target="_blank"
                rel="noreferrer"
              >
                Motion
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700 md:max-w-fit mb-2"
        >
          <div className="">Proudly Hosted on </div>
          <img
            alt="Vercel" loading="lazy"
            width="20" height="10"
            decoding="async" data-nimg="1"
            style={{ color: "transparent" }}
            src="vercel.svg"
          />
        </a>
      </Reveal>
    </div>
  );
};

export default Footer;
