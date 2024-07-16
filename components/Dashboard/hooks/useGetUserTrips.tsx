import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId } from "@/lib/store/slice/dashboardSlice";

export const useGetUserTrips = (userId:string) => {
  

  
    const {data, isLoading, error } = useGetUserTripsQuery(userId);
    let trips = data?.trips;
    

    
    return {data, trips, isLoading,  error, }

}