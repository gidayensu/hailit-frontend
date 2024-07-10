'use client'
import { useEffect, useState } from "react";
import { useTheme, } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
export type CurrentTheme = string | undefined;

export const useSetTheme = ()=> {


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
  return {handleThemeChange, theme }
  }