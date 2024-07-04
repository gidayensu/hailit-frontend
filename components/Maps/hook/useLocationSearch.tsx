import {
  setDropOffLocation,
  setPickUpLocation,
  setSearchCard,
  setSearchData,
} from "@/lib/store/slice/mapSlice";
import { fetchMapData } from "@/lib/utils";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { UserLocation } from "../MainMap";

import { LocationType } from "./useMap";

import { useCallback, useRef, useState } from "react";

export const useLocationSearch = (locationType?: LocationType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchData, searchContainer } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>(null);

  const mapDataHandler = useCallback(async (e: any) => {
    setIsLoading(true);
    // const data: any = await fetchMapData(searchQuery?.target?.value);
    const data: any = await fetchMapData(e.target.value);
    if (data) {
      dispatch(setSearchData(data));
      setIsLoading(false);
    }
    dispatch(setSearchCard(true)); //TODO: CHANGE FROM GLOBAL TO LOCAL STATE
  }, [ setSearchCard, dispatch, setIsLoading, dispatch]);

  const selectedSearchItemHandler = ({
    locationName,
    mapPoint,
  }: {
    locationName: string;
    mapPoint: UserLocation;
  }) => {
    locationType === "pickup"
      ? dispatch(setPickUpLocation(mapPoint))
      : locationType === "drop off"
      ? dispatch(setDropOffLocation(mapPoint))
      : "";
    dispatch(setSearchCard(false));
  };

  return {
    mapDataHandler,
    inputRef,
    isLoading,
    searchData,
    searchContainer,
    selectedSearchItemHandler,
  };
};
