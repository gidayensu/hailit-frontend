"use client";

import dynamic from 'next/dynamic';
import { Map, Marker } from "pigeon-maps";
import { FaMapPin } from "react-icons/fa";
import { Button } from "../ui/button";
import SearchResults from "./SearchResults";

const MapModal = dynamic(() => import("./MapModal"), { ssr: false })

import type { Point } from "pigeon-maps";
import Loader from "../Shared/Loader";
import { LocationType, useMap } from "./hooks/useMap";
import LocationSearch from "./LocationSearch";

export type UserLocation = Point | undefined;

export default function MainMap({ locationType }: { locationType: LocationType }) {
  const {
    handleSelectedLocation,
    setMapBoundaryChanged,
    zoom,
    dispatch,
    setZoom,
    userLocation,
    mapBoundaryChanged,
    loading,
    openMapModal,
    closeMapModal,
    mapModalRef,
    mapTilerProvider,
    mapLocationName,
    mapLoading,
    setUserLocation
  } = useMap(locationType);

  
  return (
    <div className="flex justify-center relative">
      <div className="absolute flex justify-center flex-col gap-3">
        <LocationSearch />
        <MapModal closeModal={closeMapModal} handleSelectedLocation={handleSelectedLocation} loading={loading} modalRef={mapModalRef} locationType={locationType} />
        <SearchResults  />
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
                center={userLocation}
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
                  dispatch(setUserLocation(center));
                  setZoom(zoom);
                }}
                onClick={openMapModal}
              >
              </Map>
              <Marker
                anchor={userLocation}
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
                              { mapLocationName ?? "Location name could not be loaded"}
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
                    <FaMapPin className="text-3xl text-slate-800 dark:text-green-400 animate-bounce relative xl:mt-56 md:mt-72" />
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
