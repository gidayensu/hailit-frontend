"use client";
import {
  fetchDropOffLocationName,
  fetchPickUpLocationName,
} from "@/lib/store/actions";
import { getSpecificName, reverseMapSearch } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setDropOffLocation,
  setPickUpLocation,
} from "@/lib/store/slice/mapSlice";
import { UserLocation } from "../MainMap";
import { useSetTheme } from "@/components/Dashboard/Nav/hook/useSetTheme";

type MapBoundaryChange = boolean;
export type LocationType = "pickup" | "drop off";

export const useMap = (locationType: LocationType) => {
  
  const [mapLoading, setMapLoading] = useState(true);
  
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const modal = modalRef.current;
  const openModal = () => {
    modal?.showModal();
  };
  const closeModal = () => {
    modal?.close();
  };
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    dropOffLocation,
    dropOffLocationName,
    pickUpLocation,
    pickUpLocationName,
  } = useAppSelector((state) => state.map);

  const [userLocation, setUserLocation] = useState<UserLocation>([5.5663846170585645, -0.23610680052490807  ]); 

  const [mapBoundaryChanged, setMapBoundaryChanged] =
    useState<MapBoundaryChange>(false);

  const [zoom, setZoom] = useState(18);


  const locationNameData = async (
    latitude: string | number,
    longitude: string | number
  ) => {
    const locationData = await reverseMapSearch(latitude, longitude);
    
    const locationName = locationData?.displayName;
    
    let specificName: string | undefined = "";
    if (locationName) {
      specificName = getSpecificName(locationName);
    }

    return specificName;
  };

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
      locationType === "drop off"
        ? dispatch(setDropOffLocation(userLocation))
        : "";
      locationType === "pickup"
        ? dispatch(setPickUpLocation(userLocation))
        : "";
    }
  }, [userLocation]);

  useEffect(() => {
    if (dropOffLocation && locationType === "drop off") {
      const setLocationName = async (): Promise<string> => {
        const locationName = locationNameData(
          dropOffLocation[0],
          dropOffLocation[1]
        );

        return locationName;
      };

      dispatch(fetchDropOffLocationName(setLocationName));
    }
    if (pickUpLocation && locationType === "pickup") {
      const setLocationName = async (): Promise<string> => {
        const locationName = locationNameData(
          pickUpLocation[0],
          pickUpLocation[1]
        );

        return locationName;
      };

      dispatch(fetchPickUpLocationName(setLocationName));
    }
  }, [dispatch, dropOffLocation, pickUpLocation]);
  // useEffect(() => {
  //   if (dropOffLocation) {
  //     const locationName = locationNameData(dropOffLocation[0], dropOffLocation[1])
  //     dispatch(setDropOffLocationName(locationName));
  //   }
  // }, [dropOffLocation]);

  //redirect either to new order or dashboard depending on where the map is being accessed.
  const handleSelectedLocation = () => {
    setLoading(true);
    locationType === "drop off"
      ? dispatch(setDropOffLocation(dropOffLocation))
      : "";
    locationType === "pickup"
      ? dispatch(setPickUpLocation(pickUpLocation))
      : "";
    router.back();
  };



  const {theme, systemTheme} = useSetTheme();


  let MAP_ID = 'streets-v2';
  theme === "dark" || (systemTheme === "dark" && theme==="dark")  ? MAP_ID =  'streets-v2-dark' : '';

   
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


  return {
    handleSelectedLocation,
    locationNameData,
    zoom,
    setZoom,
    dropOffLocation,
    setPickUpLocation,
    setMapBoundaryChanged,
    dropOffLocationName,
    pickUpLocation,
    pickUpLocationName,
    userLocation,
    setDropOffLocation,
    dispatch,
    mapBoundaryChanged,
    loading,
    openModal,
    closeModal,
    modalRef,
    mapTilerProvider,
    location,
    mapLoading
  };
};
