"use client";
import { getSpecificName, reverseMapSearch } from "@/lib/utils";

interface LocationProps {
latitude: string | number,
    longitude: string | number
}
export type LocationType = "pickup" | "drop off";

export const useGetLocationName = () => {
  
   const locationNameData = async (
    {latitude,
        longitude}:LocationProps
  ) => {
    const locationData = await reverseMapSearch(latitude, longitude);
    
    const locationName = locationData?.displayName;
    
    let specificName: string | undefined = "";
    if (locationName) {
      specificName = getSpecificName(locationName);
    }

    return specificName;
  };

  

  
  return {
    
    locationNameData,
    
    
    
  };
};
