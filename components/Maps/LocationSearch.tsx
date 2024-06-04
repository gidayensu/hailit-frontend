"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import {
  setSearchContainer,
  setSearchData,
} from "@/lib/store/slice/mapSlice";
import { fetchMapData } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";




export default function LocationSearch() {

  const dispatch = useAppDispatch();
    const inputRef = useRef<any>(null);

  const mapDataHandler = useCallback( async (e:any) => {
        
    // const data: any = await fetchMapData(searchQuery?.target?.value);
    const data: any = await  fetchMapData(e.target.value);
    if (data) {
        
      
     dispatch(setSearchData(data))
    }
dispatch(setSearchContainer(true));
  }, []);


  return (
    <div className="flex items-center justify-center">
      <textarea
        ref={inputRef}
        className="flex items-center justify-center resize-none border-none text-slate-400 p-2 h-10 sm:h-12 w-60 md:w-96 text-center bg-white z-50 mt-5 shadow-lg rounded-full"
        placeholder="Search your location"
        onChange={mapDataHandler}
      />
    </div>
  );
}
