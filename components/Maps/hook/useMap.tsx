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

type MapBoundaryChange = boolean;
export type LocationType = "pickup" | "drop off";

export const useMap = (locationType: LocationType) => {
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

  const [userLocation, setUserLocation] = useState<UserLocation>(undefined); // Initialize as undefined

  const [mapBoundaryChanged, setMapBoundaryChanged] =
    useState<MapBoundaryChange>(false);

  const [zoom, setZoom] = useState(18);

  let nameOfLocation: string | undefined = "";

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
  };
};
