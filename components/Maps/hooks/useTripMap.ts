"use client";

import { useMapProvider } from "./useMapProvider";

import { useEffect, useState } from "react";

import type { Point } from "pigeon-maps";

export type UserLocation = Point | undefined;

export const useTripMap = ({ distance }: { distance: number }) => {

  const [zoom, setZoom] = useState<number>(10);

  const {mapTilerProvider} = useMapProvider()



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
