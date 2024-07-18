"use client";

import { useSetTheme } from "@/components/Dashboard/Nav/hook/useSetTheme";

import { useEffect, useState } from "react";

import type { Point } from "pigeon-maps";

export type UserLocation = Point | undefined;

export const useTripMap = ({ distance }: { distance: number }) => {
  const [zoom, setZoom] = useState<number>(10);

  const { theme, systemTheme } = useSetTheme();

  let MAP_ID = "streets-v2";
  theme === "dark" || (systemTheme === "dark" && theme === "dark")
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

  useEffect(() => {
    if (distance > 30) {
      setZoom(7);
    } else if (distance > 20) {
      setZoom(9);
    } else if (distance > 11) {
      setZoom(10);
    } else if (distance > 5) {
      setZoom(11);
    } else {
      setZoom(15);
    }
  }, [distance, setZoom]);

  return { mapTilerProvider, zoom };
};
