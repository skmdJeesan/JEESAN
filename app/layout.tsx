import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Spotlight from "@/components/Spotlight";
import IrisProvider from "@/utils/IrisProvider";
import ClickSound from "@/utils/CickSound";
import MusicToggle from "@/utils/MusicToggle";
import Preloader from "@/components/Preloader";

const inter = Inter({subsets: ["latin"],});
const poppins = Inter({subsets: ["latin"],});

export const metadata: Metadata = {
  title: "Jeesan | Fullstack Developer",
  description: "Hi, I'm a fullstack developer based on India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className}`}
    >
      <body className="bg-zinc-900 text-slate-200 antialiased">
        <div className="relative">
          <Spotlight />
          <ClickSound />
          <MusicToggle />
          <IrisProvider>
            <Preloader>{children}</Preloader>
          </IrisProvider>
        </div>
      </body>
    </html>
  );
}
