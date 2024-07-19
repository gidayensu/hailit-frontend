import {
  setDropOffLocation,
  setPickUpLocation,
  setSearchCard,
  setSearchData,
  setUserLocation
} from "@/lib/store/slice/mapSlice";
import { fetchMapData } from "@/lib/utils";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { UserLocation } from "../MainMap";

import { LocationType } from "./useMap";

import { useCallback, useRef, useState } from "react";

export const useLocationSearch = () => {
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

  const handleSelectedLocation = ({
    
    mapPoint,
  }: {
    
    mapPoint: UserLocation;
  }) => {
    dispatch(setUserLocation(mapPoint))
    
    dispatch(setSearchCard(false));
  };

  return {
    mapDataHandler,
    inputRef,
    isLoading,
    searchData,
    searchContainer,
    handleSelectedLocation,
  };
};
