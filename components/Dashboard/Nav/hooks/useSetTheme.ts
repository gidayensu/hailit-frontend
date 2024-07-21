"use client";
import { useTheme } from "next-themes";

export const useSetTheme = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(
      theme === "dark" || (theme === "system" && systemTheme === "dark")
        ? "light"
        : (theme === "light"  || (theme === "system" && systemTheme === "light"))
        ? "dark"
        : ''
    );
  };
  return { handleThemeChange, theme, systemTheme };
};
