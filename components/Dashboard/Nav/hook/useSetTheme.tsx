'use client'
import { useTheme, } from "next-themes";

export const useSetTheme = ()=> {
  
    const { theme, setTheme, } = useTheme();
    
  
    const handleThemeChange = () => {
      
      setTheme(theme === "dark" ? "light" : "dark");
    };
  return {handleThemeChange, theme }
  }