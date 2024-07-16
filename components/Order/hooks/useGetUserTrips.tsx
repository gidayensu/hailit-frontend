"use client";
import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { TripStatus } from "../types/Types";
import { useEffect, useState } from "react";
import { Trip } from "@/lib/store/slice/tripSlice";
export const useGetUserTrips = () => {
  const [pollingInt, setPollingInt] = useState<number>(500000);
  const { user_id, user_role } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useGetUserTripsQuery(user_id, {
    pollingInterval: pollingInt,
    skipPollingIfUnfocused: true
  });
    
  let previousTrips = [];
  let currentTrips = [];
  let currentTripsCount = 0;
  let previousTripsCount = 0;
  const trips = data?.trips;
  if (trips) {
    
  if ((user_role === "Driver" || user_role === "Rider") && trips?.dispatcher_trips) {

      currentTrips =
        trips?.dispatcher_trips.filter(
          (trip: DispatcherTrip) =>
            trip.trip_status !== "Delivered" && trip.trip_status !== "Cancelled"
        ) || [];
        currentTripsCount = currentTrips.length
  
      previousTrips =
        trips?.dispatcher_trips.filter(
          (trip: DispatcherTrip) =>
            trip.trip_status === "Delivered" || trip.trip_status === "Cancelled"
        ) || [];
        previousTripsCount = previousTrips.length
      } 
      
      if (  user_role === "Customer" && trips?.customer_trips  ) {
        
          currentTrips =
            trips?.customer_trips.filter(
              (trip: Trip) =>
                trip.trip_status !== "Delivered" && trip.trip_status !== "Cancelled"
            ) || [];
            
          previousTrips =
            trips?.customer_trips.filter(
              (trip: Trip) =>
                trip.trip_status === "Delivered" || trip.trip_status === "Cancelled"
            ) || [];
  
            
        }
        
      } 

      //Not using useEffect result in infinite loop. Probably due to the condition being always true.
      
      useEffect(()=> {
        if(currentTrips?.length > 0 || previousTrips.length > 0) {

            setPollingInt(3000)
        }
      }, [currentTrips, previousTrips, setPollingInt])
      
  
  
  let noDelivery = false;
  currentTrips.length < 1 && previousTrips.length < 1
    ? (noDelivery = true)
    : "";
    
  return {trips, currentTrips, previousTrips, currentTripsCount, previousTripsCount, isLoading, error, noDelivery, user_role  };
};




export interface DispatcherTrip extends Trip {
  trip_cost: string; 
  trip_request_date: Date | null; 
  trip_commencement_date: Date | null; 
  trip_completion_date: Date | null; 
  trip_status: TripStatus; 
  user_id: string;
  rating_count: number;
  cumulative_rating: string;
}

