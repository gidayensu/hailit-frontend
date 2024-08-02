import { Map, Marker, ZoomControl } from "pigeon-maps";
import { useTripMap } from "./hooks/useTripMap";

import type { Point } from "pigeon-maps";
import { useTrackOrderItem } from "../Order/TrackOrder/hooks/useTrackOrderItem";

export type UserLocation = Point | undefined;

export default function TripMap() {
  const {
    distance,
    dropOffLocation,
    pickUpLocation,
    midPoint
  } = useTrackOrderItem();
  
  const { mapTilerProvider, zoom } = useTripMap({ distance });
  
  return (
      <Map
        height={310}
        zoom={zoom}
        center={midPoint}
        mouseEvents={true}
        touchEvents={true}
        provider={mapTilerProvider}
        twoFingerDrag = {true}
        twoFingerDragWarning="Move the map with two fingers "
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
        <ZoomControl />
      </Map>
    
  );
}
