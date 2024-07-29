"use client";
//redux + data fetch + next
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { Trip } from "@/lib/store/slice/tripSlice";
import { useParams } from "next/navigation";

export const useGetUserTrip=()=> {
    
  const params = useParams();
  const { trip_id } = params;
  
  const { user_id} = useAppSelector(state=>state.user);
  const { data, isLoading, error } = useGetTripQuery(trip_id);

  
  const trip:Trip = data?.trip
  const dispatcher = trip?.dispatcher
  return {trip_id, user_id, data, isLoading, error, trip, dispatcher}
    

}
