"use client";
import type { CurrentTheme } from "@/app/profile/page";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

import { useAppSelector } from "@/lib/store/hooks";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";



export default function SmallScreenTopNav() {
  
  

  
  const {last_name, first_name} = useAppSelector(state=>state.user)
  const { theme, setTheme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>("system"); // Default theme

  //setting current theme. Not using useEffect result in hydration errors
  useEffect(() => {
    const preferredTheme: CurrentTheme =
      localStorage.getItem("theme") || systemTheme || theme;
    setCurrentTheme(preferredTheme);
  }, [currentTheme]);

  const handleThemeChange = () => {
    setCurrentTheme(theme === "dark" ? "light" : "dark");
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const path = usePathname();

  const iconsAndTextDivClass =
    "flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md";
  const iconsAndTextSpanClass =
    "flex items-center justify-center gap-2 relative";

  

  return (
    <nav
      className={`flex  w-6/6 left-0 right-0 top-auto z-40 justify-center items-center p-4 md:h-20 h-16 shadow-md gap-10 w-full bg-white dark:bg-primary-dark font-bold`}
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
            {/* <RiNotification3Line className="text-2xl"/> */}
          </span>
        </div>
        <div
          className={`-ml-4 md:-ml-0 ${iconsAndTextDivClass}`}
          onClick={handleThemeChange}
        >
          <span className={iconsAndTextSpanClass}>
            <ThemeToggle />
          </span>
        </div>
      </section>
    </nav>
  );
}
