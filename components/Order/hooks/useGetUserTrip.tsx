"use client";
//redux + data fetch + next
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export const useGetUserTrip=()=> {
  const [controlledPollingInterval, setControlledPollingInterval] = useState<number>(5000);
  
  const params = useParams();
  const { trip_id } = params;
  
  
  
  const { user_id} = useAppSelector(state=>state.user);
  const { data, isLoading, error } = useGetTripQuery(trip_id ,{
    pollingInterval:controlledPollingInterval,
    skipPollingIfUnfocused: true
  });

  
  useEffect(()=> {
    if(error) {
      setControlledPollingInterval(0)
      
    }
  }, [error, setControlledPollingInterval])
    
  
  const trip = data?.trip
  const dispatcher = trip?.dispatcher
  return {trip_id, user_id, data, isLoading, error, trip, dispatcher}
    

}
