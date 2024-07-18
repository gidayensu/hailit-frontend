"use client";

import { Map, Marker } from "pigeon-maps";
import { maptiler } from 'pigeon-maps/providers'
import { useSetTheme } from "../Dashboard/Nav/hook/useSetTheme";

import { useEffect, useState } from "react";


import type { Point } from "pigeon-maps";

export type UserLocation = Point | undefined;

export default function TripMap({ dropOffLocation, pickUpLocation, distance }: { dropOffLocation: [number, number], pickUpLocation: [number, number], distance: number }) {
  

  const [zoom, setZoom ] = useState<number>(10);
  
  const {theme} = useSetTheme();

  let MAP_ID = 'streets-v2';
  theme === "dark" ? MAP_ID =  'streets-v2-dark' : '';

   console.log({theme, MAP_ID})

  const MAPTILER_ACCESS_TOKEN = 'cH018vwISkZA6x3z4RSw';

  function mapTilerProvider (x:number, y:number, z:number, dpr:number|undefined) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr && dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}` 
  }


  

  
  useEffect(() => {
    if(distance > 30) {
      setZoom(7)
    } else if(distance <30  && distance >11  ) {
      setZoom(9)
    
    } else if(distance >5  && distance <11  ) {
      setZoom(11)
    } else {
      setZoom(13)
    }

  }, []);

  

  return (
    <div className=" rounded-xl w-full content-normal overflow-hidden flex items-center justify-center border border-slate-200 dark:border-opacity-20">
      <Map
        height={310}
        zoom={zoom}
        center={pickUpLocation}
        mouseEvents={false}
        touchEvents={false}
        provider = {mapTilerProvider}
      >
        <Marker
          width={50}
          anchor={pickUpLocation}
          color={"hsl(42, 100%, 50%)"}
        />
        <Marker
          width={50}
          anchor={dropOffLocation}
          color={"hsl(135, 73%, 55%)"}
        ></Marker>
      </Map>
    </div>
  );
}
