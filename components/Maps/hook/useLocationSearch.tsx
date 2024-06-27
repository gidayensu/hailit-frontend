
import {
  setSearchCard,
  setSearchData,setPickUpLocation,
  setDropOffLocation,
  
} from "@/lib/store/slice/mapSlice";
import { fetchMapData } from "@/lib/utils";

import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";

import { UserLocation } from "../MainMap";
import { getSpecificName } from "@/lib/utils";

import SearchItem from "../SearchItem";
import { LocationType } from "./useMap";

import { useCallback, useRef, useState } from "react";

export const useLocationSearch = (locationType?:LocationType)=> {

    const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
    const inputRef = useRef<any>(null);

  const mapDataHandler = useCallback( async (e:any) => {
    setIsLoading(true)
    // const data: any = await fetchMapData(searchQuery?.target?.value);
    const data: any = await  fetchMapData(e.target.value);
    if (data) {
        
        dispatch(setSearchData(data))
        setIsLoading(false)
    }
dispatch(setSearchCard(true));
  }, []);

const { searchData,  searchContainer } = useAppSelector((state) => state.map);
  
    
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
    : ''
    dispatch(setSearchCard(false));
  };

  return {mapDataHandler, inputRef, isLoading, searchData,  searchContainer, selectedSearchItemHandler}
}