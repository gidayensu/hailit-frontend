"use client";

import { useSetTheme } from "../Dashboard/Nav/hook/useSetTheme";

import {
  MdDarkMode,
  MdLightMode,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";

export function ThemeToggle({children}:{children?:React.ReactNode}) {
  
  const { handleThemeChange, theme, systemTheme} = useSetTheme();
  

  
  
  const iconOutlineClass = "text-2xl group-hover:opacity-0";
  const iconFillClass =
    "text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100";

  

  return (
    <div className="flex items-center justify-center gap-2" onClick={handleThemeChange}>

    <span  >
      {(theme === "light" || (systemTheme === "light" && theme==="light")) && (
        <>
          <MdOutlineDarkMode className={iconOutlineClass} />
          <MdDarkMode className={iconFillClass} />
        </>
      )}

      {(theme === "dark" || (systemTheme === "dark" && theme==="dark")) && (
        <>
          <MdOutlineLightMode className={iconOutlineClass} />
          <MdLightMode className={iconFillClass} />
        </>
      )}
    </span>
    {children}
    </div>
  );
}
