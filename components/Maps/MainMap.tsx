"use client";

import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { FaMapPin } from "react-icons/fa";
import { Button } from "../ui/button";
import SearchResults from "./SearchResults";
import dynamic from 'next/dynamic'
import { useSetTheme } from "../Dashboard/Nav/hook/useSetTheme";
const MapModal = dynamic(() => import("./MapModal"), { ssr: false })

import { LocationType, useMap } from "./hook/useMap";
import Loader from "../Shared/Loader";
import LocationSearch from "./LocationSearch";
import type { Point } from "pigeon-maps";

export type UserLocation = Point | undefined;

export default function MainMap({ locationType }: { locationType: LocationType }) {
  const {
    handleSelectedLocation,
    setMapBoundaryChanged,
    zoom,
    setZoom,
    userLocation,
    dropOffLocation,
    dropOffLocationName,
    setDropOffLocation,
    pickUpLocation,
    pickUpLocationName,
    setPickUpLocation,
    dispatch,
    mapBoundaryChanged,
    loading,
    openModal,
    closeModal,
    modalRef
  } = useMap(locationType);

  const {theme} = useSetTheme();

  const [mapLoading, setMapLoading] = useState(true);

  let MAP_ID = 'streets-v2';
   theme === "dark" ? MAP_ID =  'streets-v2-dark' : '';

   console.log({theme, MAP_ID})
  const MAPTILER_ACCESS_TOKEN = 'cH018vwISkZA6x3z4RSw';

  function mapTilerProvider (x:number, y:number, z:number, dpr:number|undefined) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr && dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`
  }

  let location = dropOffLocation;
  if (locationType === "pickup") {
    location = pickUpLocation;
  }

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center relative">
      <div className="absolute flex justify-center flex-col gap-3">
        <LocationSearch />
        <MapModal closeModal={closeModal} handleSelectedLocation={handleSelectedLocation} loading={loading} modalRef={modalRef} locationType={locationType} />
        <SearchResults locationType={locationType} />
      </div>

      <div className="relative w-full h-full">
        {mapLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loader color="text-primary-color"/>
          </div>
        ) : (
          userLocation && locationType && (
            <>
              <Map
                height={800}
                center={location}
                minZoom={1}
                maxZoom={18}
                zoom={zoom}
                touchEvents={true}
                animate={true}
                onAnimationStart={() => setMapBoundaryChanged(true)}
                onAnimationStop={() => setMapBoundaryChanged(false)}
                provider = {mapTilerProvider}
                // twoFingerDrag={true}
                // twoFingerDragWarning="Move the map with two fingers. Tap to use the location"
                onBoundsChanged={({ center, zoom }) => {
                  locationType === "drop off" ? dispatch(setDropOffLocation(center)) : dispatch(setPickUpLocation(center));
                  setZoom(zoom);
                }}
                onClick={openModal}
              >
              </Map>
              <Marker
                anchor={location}
                onMouseOver={() => setMapBoundaryChanged(true)}
                onMouseOut={() => setMapBoundaryChanged(true)}
              >
                <>
                  <div className="flex flex-col items-center justify-center gap-2 fixed top-0 right-0 left-0 bottom-0">
                    <div className="flex flex-col items-center justify-center gap-2 fixed top-0 right-0 left-0 bottom-0">
                      {!mapBoundaryChanged && (
                        <div className="absolute flex items-center justify-center h-auto w-44 bg-white shadow-md text-center text-[10px] mb-36 lg:mt-30 xl:mt-32 md:mt-72 xl:mb-0 rounded-lg p-2">
                          <span className="flex flex-col gap-1 text-slate-800 text-[10px] font-bold">
                            <p className="line-clamp-2">
                              {locationType === "drop off" ? dropOffLocationName : pickUpLocationName || "Location name could not be loaded"}
                            </p>
                            <Button
                              variant="empty"
                              className="text-[10px] font-bold bg-primary-medium h-6 text-white cursor-pointer"
                            >
                              {loading ? (
                                <Loader />
                              ) : (
                                "Use this location"
                              )}
                            </Button>
                          </span>
                        </div>
                      )}
                    </div>
                    <FaMapPin className="text-3xl text-slate-800 animate-bounce relative xl:mt-56 md:mt-72" />
                  </div>
                </>
              </Marker>
            </>
          )
        )}
      </div>
    </div>
  );
}
