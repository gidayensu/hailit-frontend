"use client";
import { fetchMapLocationName } from "@/lib/store/actions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setDropOffLocation,
  setDropOffLocationName,
  setPickUpLocation,
  setPickUpLocationName,
  setMapLocationName,
} from "@/lib/store/slice/mapSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UserLocation } from "../MainMap";
import { useGetLocationName } from "./useGetLocationName";
import { useMapProvider } from "./useMapProvider";

type MapBoundaryChange = boolean;
export type LocationType = "pickup" | "drop off";

export const useMap = (locationType: LocationType) => {
  //states
  const [zoom, setZoom] = useState(18);
  const [mapLoading, setMapLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation>([
    5.5663846170585645, -0.23610680052490807,
  ]);

  const [mapBoundaryChanged, setMapBoundaryChanged] =
    useState<MapBoundaryChange>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // next/redux hooks/state
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    dropOffLocation,
    dropOffLocationName,
    pickUpLocation,
    pickUpLocationName,
    mapLocationName,
  } = useAppSelector((state) => state.map);

  //custom hooks
  const { locationNameData } = useGetLocationName();
  const { mapTilerProvider } = useMapProvider();


  
  //map modal for location selection confirmation
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const modal = modalRef.current;
  const openModal = () => {
    modal?.showModal();
  };
  const closeModal = () => {
    modal?.close();
  };

  //get the current location point of the user and determine the name of the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );

    if (locationType === "drop off" && dropOffLocation) {
      setUserLocation(dropOffLocation);
      setMapLocationName(dropOffLocationName);
    }

    if (locationType === "pickup" && pickUpLocation) {
      setUserLocation(pickUpLocation);
      setMapLocationName(pickUpLocationName);
    }
  }, [
    locationType,
    setMapLocationName,
    setUserLocation,
    pickUpLocation,
    pickUpLocationName,
    dropOffLocation,
    dropOffLocationName,
  ]);

  //fetch location name
  useEffect(() => {
    if (userLocation) {
      const fetchedLocationName = async (): Promise<string> => {
        const locationName = locationNameData({
          latitude: userLocation[0],
          longitude: userLocation[1],
        });

        return locationName;
      };

      dispatch(fetchMapLocationName(fetchedLocationName));
    }
  }, [dispatch, userLocation, fetchMapLocationName, locationNameData]);

  //set chosen location name and goback to the previous page
  const handleSelectedLocation = () => {
    setLoading(true);
    if (locationType === "drop off") {
      dispatch(setDropOffLocation(userLocation));
      dispatch(setDropOffLocationName(mapLocationName));
    }

    if (locationType === "pickup") {
      dispatch(setPickUpLocation(userLocation));
      dispatch(setPickUpLocationName(mapLocationName));
    }

    router.back();
  };

  //set map loading
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
    mapLoading,
    mapLocationName,
    setUserLocation,
  };
};
