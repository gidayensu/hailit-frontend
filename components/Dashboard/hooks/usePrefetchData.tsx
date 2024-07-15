import { useCallback, useEffect } from "react";
import { usePrefetch } from "@/lib/store/apiSlice/hailitApi";
const endpointNames = [
  "getAllTrips",
  "getTrip",
  "getUserTrips",    
  "getCurrentMonthTripCounts",
  "getTripMonths",
  "getWeekTripCount",
  "getTripCountsByMonth",
  "getTripRevenueByMonth",
  "searchTrips",
  "getAllUsers",
  "getAdmin",
  "getUser",
  "getAllDrivers",
  "getDriver",
  "getAllRiders",
  "getRider",
  "getAllVehicles",
  "getVehicle",
] as const;

type EndpointNames = typeof endpointNames[number]


export const usePrefetchData = ({page, prefetchOption, total_number_of_pages, endpoint}:{page:number, prefetchOption:EndpointNames, total_number_of_pages:number, endpoint:string}  ) => {
  //prefetching first five and last pages as well as previous and next pages
const prefetchTrip = usePrefetch(prefetchOption);
  
const handlePrefetchData = useCallback(() => {
  const offsets = page === 1 ? [1, 2, 3, 4, 5,] : page === total_number_of_pages ? [-1, -2, -3, -4, -5] : [-1, 1];
  offsets.forEach(offset => prefetchTrip(`${endpoint}?page=${page + offset}`));
  
  //prefetch last page
  prefetchTrip(`${endpoint}?page=${total_number_of_pages}`)
}, [prefetchTrip, page]);

//prefetch useEffect

useEffect(()=> {
    handlePrefetchData()
}, [handlePrefetchData])
    

return {handlePrefetchData}
    
}

