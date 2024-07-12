"use client";

import { useSetTheme } from "../Dashboard/Nav/hook/useSetTheme";

import {
  MdDarkMode,
  MdLightMode,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";

export function ThemeToggle() {
  
  const { handleThemeChange, theme} = useSetTheme();
  

  
  
  const iconOutlineClass = "text-2xl group-hover:opacity-0";
  const iconFillClass =
    "text-2xl opacity-0 absolute top-0 left-0  group-hover:opacity-100";

  

  return (
    <span onClick={handleThemeChange}>
      {theme !== "dark" && (
        <>
          <MdOutlineDarkMode className={iconOutlineClass} />
          <MdDarkMode className={iconFillClass} />
        </>
      )}

      {theme === "dark" && (
        <>
          <MdOutlineLightMode className={iconOutlineClass} />
          <MdLightMode className={iconFillClass} />
        </>
      )}
    </span>
  );
}
