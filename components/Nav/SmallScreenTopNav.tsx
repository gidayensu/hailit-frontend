"use client";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

import Link from "next/link";



export default function SmallScreenTopNav() {

  const iconsAndTextDivClass =
    "flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md";
  const iconsAndTextSpanClass =
    "flex items-center justify-center gap-2 relative";

  return (
    <nav
      className={`md:hidden flex  w-6/6 left-0 right-0 top-auto z-40 justify-center items-center p-4 md:h-20 h-16 shadow-md gap-10 w-full bg-white dark:bg-primary-dark font-bold`}
    >
      <section className="w-full text-2xl ml-10 cursor-pointer">
        <Link href={"/"}>
          <p>Hailit</p>
        </Link>
      </section>

      <section className="ml-8 md:ml-0  w-full relative">
       
      </section>

      <section className="flex gap-2 justify-end items-center w-full ">
        

        <div className={`#{iconsAndTextDivClass} hidden md:block`}>
          <span className={iconsAndTextSpanClass}>
            
          </span>
        </div>
        <div
          className={`-ml-4 md:-ml-0 ${iconsAndTextDivClass}`}
          
        >
          <span className={iconsAndTextSpanClass}>
            <ThemeToggle />
          </span>
        </div>
      </section>
    </nav>
  );
}
