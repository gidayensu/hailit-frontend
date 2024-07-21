"use client";
import { DispatcherTrip, useGetUserTrips } from "@/components/Order/hooks/useGetUserTrips";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setDispatcherTripDetails, setDispatcherTripId } from "@/lib/store/slice/dispatcherSlice";
import { useEffect } from "react";

export const useGetDispatcher = () => {
  const dispatch = useAppDispatch();
  const { email, first_name, last_name, user_role } = useAppSelector(
    (state) => state.user
  );
  const dispatcher = useAppSelector((state) => state.dispatcher);
  
  const {
    trips,
    currentTrips,
    previousTrips,
    currentTripsCount,
    isLoading
    
  } = useGetUserTrips();


  const dispatcherDeliveredTripsCount = previousTrips.filter((trip: DispatcherTrip)=>trip.trip_status === "Delivered").length
  const dispatcherEarnings = trips?.total_earnings
  
  useEffect(() => {
    if(trips){
    dispatch(
      setDispatcherTripDetails({
        ...dispatcher,
        dispatcherCurrentTrips: currentTrips,
        dispatcherPreviousTrips: previousTrips,
        dispatcherCurrentTripsCount: currentTripsCount,
        dispatcherDeliveredTripsCount,
        dispatcherEarnings
      })
    )}
  }, [trips, dispatch]);


  const handleDispatcherTripId = (tripId:string)=> {
    dispatch(setDispatcherTripId(tripId))
  }
  return { email, first_name, last_name, trips, user_role, dispatcher, handleDispatcherTripId, isLoading };
};
