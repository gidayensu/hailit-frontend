'use client'
import { useTheme, } from "next-themes";

export const useSetTheme = ()=> {
  
    const { theme, setTheme, systemTheme } = useTheme();
    
  
    const handleThemeChange = () => {
      
      setTheme(theme === "dark" ? "light" : "dark");
    };
  return {handleThemeChange, theme, systemTheme }
  }