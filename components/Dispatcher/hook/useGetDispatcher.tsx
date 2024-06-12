"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { useGetUserTrips } from "@/components/Order/hooks/useGetUserTrips";
import { useEffect } from "react";
import { setDispatcherTripDetails } from "@/lib/store/slice/dispatcherSlice";
import { DispatcherTrip } from "@/components/Order/hooks/useGetUserTrips";

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
    
  } = useGetUserTrips();


  const dispatcherDeliveredTripsCount = previousTrips.filter((trip: DispatcherTrip)=>trip.trip_status === "Delivered").length
  const dispatcherEarnings = trips?.total_earnings
  console.log(trips)
  console.log('this runs ')
  useEffect(() => {
    if(trips){
      console.log('this runs in useEffect')
      console.log(trips)
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

  return { email, first_name, last_name, trips, user_role, dispatcher };
};
