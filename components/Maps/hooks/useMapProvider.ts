"use client";

import { useSetTheme } from "@/components/Dashboard/Nav/hooks/useSetTheme";

export const useMapProvider = () => {
  const { theme, systemTheme } = useSetTheme();

  let MAP_ID = "streets-v2";
  theme === "dark" || (systemTheme === "dark" && theme === "system")
    ? (MAP_ID = "streets-v2-dark")
    : "";

  const MAPTILER_ACCESS_TOKEN = "cH018vwISkZA6x3z4RSw";

  function mapTilerProvider(
    x: number,
    y: number,
    z: number,
    dpr: number | undefined
  ) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
      dpr && dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
  }
  
  return { mapTilerProvider };
};
