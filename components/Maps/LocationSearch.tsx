'use client'
import { getSpecificName } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { Input } from "../ui/input";
import { fetchMapData } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setChosenLocation, setSearchData, setSearchContainer } from "@/lib/store/slice/mapSlice";
import { Skeleton } from "../ui/skeleton";
import { UserLocation } from "./Map";
import { Separator } from "../ui/separator";
import SearchResults from "./SearchResults";
export default function LocationSearch () {
        const dispatch = useAppDispatch ();
  

      const mapDataHandler =  useCallback(async(searchQuery:any) => {
        
        const data:any = await fetchMapData(searchQuery?.target?.value);
        if(data) {

            // const locationNames = data.map((location:any)=>{
            //     return getSpecificName(location.display_name)
            // })
            // dispatch(setSearchData(locationNames))
            dispatch(setSearchData(data))
        }
        dispatch(setSearchContainer(true));
      }, [])

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
    
    <Input
          className="flex items-center justify-center h-10 sm:h-12 w-60 md:w-96 text-center bg-white z-50 mt-5 shadow-lg rounded-full"
          placeholder="Search your location"
          onChange={()=>mapDataHandler(event)}
        />
        <SearchResults/>
    </div>
  );
};
