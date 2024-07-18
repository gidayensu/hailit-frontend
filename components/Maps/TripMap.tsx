import { Map, Marker } from "pigeon-maps";
import { useTripMap } from "./hooks/useTripMap";


import type { Point } from "pigeon-maps";

export type UserLocation = Point | undefined;

export default function TripMap({ dropOffLocation, pickUpLocation, distance }: { dropOffLocation: [number, number], pickUpLocation: [number, number], distance: number }) {
  
  
  const { mapTilerProvider, zoom } = useTripMap({distance});

  

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
