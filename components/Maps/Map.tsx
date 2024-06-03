'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaMapPin } from "react-icons/fa";
import {  reverseMapSearch, getSpecificName } from "@/lib/utils";



import { setChosenLocation, setChosenLocationName } from "@/lib/store/slice/mapSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import LocationSearch from "./LocationSearch";
export type UserLocation = [number, number] | null;
type UserLocationName = any;
type MapBoundaryChange = boolean;

export default function LocationMap() {

  const dispatch = useAppDispatch();
  const { searchData, chosenLocation, chosenLocationName } = useAppSelector(state=>state.map)
  const [userLocation, setUserLocation] = useState<UserLocation>(null); // Initialize as null
  const [userLocationName, setUserLocationName] =
    useState<UserLocationName>(null);
  const [mapBoundaryChanged, setMapBoundaryChanged] =
    useState<MapBoundaryChange>(false);
  
  
  const [zoom, setZoom] = useState(18);
  
  let nameOfLocation: string | undefined = '';
  const locationNameData = async (
    latitude: string | number,
    longitude: string | number
  ) => {
    const locationData = await reverseMapSearch(latitude, longitude);

    const locationName = locationData?.displayName;
    
    let specificName: string | undefined = ''
    if (locationName) {
      specificName = getSpecificName(locationName)
    }
    
    return specificName;
  };

  let windowHeight;
  if (typeof window !== "undefined") {
    windowHeight = window.innerHeight;
  } //determine the height of the screen/window

  //get the current location point of the user and determine the name of the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation([latitude, longitude]);

        // setUserLocationName(locationNameData(latitude, longitude));
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  }, []);

  //set the user's location as the marker point
  
  useEffect(() => {
    if (userLocation) {
      dispatch(setChosenLocation(userLocation))
      
    }
  }, [userLocation]);

  

  useEffect(() => {
    if (chosenLocation) {
      const locationName = locationNameData(chosenLocation[0], chosenLocation[1])
      dispatch(setChosenLocationName(locationName));
    }
  }, [chosenLocation]);

  
  const selectedLocationHandler = (selectedLocation: UserLocation) => {
    //push this to store or state
    dispatch(setChosenLocation(selectedLocation))
  };
console.log(nameOfLocation)
  return (
    <div className="flex justify-center relative">
      <div className="absolute flex justify-center flex-col gap-3">
        <LocationSearch
          
        />
         {/* <Link href={'/map/search-location'} className="flex items-center justify-center font-normal h-10 sm:h-12 w-60 md:w-96 text-center text-slate-300 bg-white z-50 mt-5 shadow-lg rounded-full">
        <Button
          variant={'empty'}
          className=" font-normal h-10 sm:h-12 w-60 md:w-96 text-center text-slate-300 bg-white z-50  rounded-full"        
        >
          Search your location
        </Button>
        </Link> */}
        
      </div>
      

      <div className="relative w-full h-full">
        {userLocation && chosenLocation && (
          <>
            <Map
              height={800}
              center={chosenLocation}
              minZoom={1}
              maxZoom={18}
              zoom={zoom}
              touchEvents = {true}

              animate={true}
              onAnimationStart={() => setMapBoundaryChanged(true)}
              onAnimationStop={() => setMapBoundaryChanged(false)}
              onBoundsChanged={({ center, zoom }) => {
                dispatch(setChosenLocation(center));
                setZoom(zoom);
              }}
            >
              {/* <Marker
          anchor={selectedLocation}
           >
          
            
              <FaMapPin className="text-3xl text-red-800 animate-bounce relative"/>
            
          
          
          
        </Marker>   */}
            </Map>
            <Marker
              anchor={chosenLocation}
              onMouseOver={() => setMapBoundaryChanged(true)}
              onMouseOut={() => setMapBoundaryChanged(true)}
            >
              <div className="flex flex-col items-center justify-center gap-2 fixed top-0 right-0 left-0 bottom-0">
                {!mapBoundaryChanged && (
                  <div className="absolute flex items-center justify-center h-auto w-44 bg-white shadow-md text-center text-[10px] mb-36 rounded-lg p-2">
                    <span className="flex flex-col gap-1 text-slate-800 text-[10px] font-bold ">
                      <p className="line-clamp-2">
                        {chosenLocationName || "Name could not be loaded"}
                      </p>
                      <Link href={"/"}>
                        <Button
                          variant="empty"
                          onClick={() =>
                            selectedLocationHandler(chosenLocation)
                          }
                          className="text-[10px] font-bold bg-primary-medium h-6 text-white"
                        >
                          Use this location
                        </Button>
                      </Link>
                    </span>
                  </div>
                )}
                <FaMapPin className="text-3xl text-slate-800 animate-bounce relative mb-8" />
              </div>
            </Marker>
          </>
        )}
      </div>
    </div>
  );
}
