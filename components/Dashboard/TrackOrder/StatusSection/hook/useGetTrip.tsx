"use client";
//redux +react + next
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setActiveSection,
  setAssignedDispatcher,
  setSelectedTripId,
  setTrackingOrder,
  setTripStatus,
} from "@/lib/store/slice/dashboardSlice";

import { useRef } from "react";

export type OrderStatus =
  | "Booked"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

export const useGetTrip = () => {
  const inputRef = useRef<any>(null);

  const {
    previousSelectedTripId,
    selectedTripId,
    trackingOrder,
    assignedDispatcherId,
    tripStage,
    tripStatus,
  } = useAppSelector((state) => state.dashboard);
  const { data, isLoading, error } = useGetTripQuery(`${selectedTripId}`);
  const dispatch = useAppDispatch();

  const trip = data?.trip;
  const dispatcher = trip?.dispatcher;

  if (trip) {
    console.log(previousSelectedTripId, selectedTripId)
    if (previousSelectedTripId !== selectedTripId || !previousSelectedTripId) {
      dispatch(
        setAssignedDispatcher({
          assignedDispatcherId: trip.dispatcher_id,
          assignedDispatcherName: `${dispatcher.first_name} ${dispatcher.last_name}`,
          assignedDispatcherPlate: dispatcher.vehicle?.plate_number,
          assignedDispatcherVehicle: dispatcher.vehicle?.vehicle_name,
          assignedDispatcherPhone: dispatcher.phone_number,
        })
      );
      dispatch(
        setTripStatus({
          tripStage: trip.trip_stage,
          tripStatus: trip.trip_status,
        })
      );
    }
  }
  const handleTrackTrip = () => {
    const tripId = inputRef.current?.value;
    dispatch(setTrackingOrder(true));
    dispatch(setSelectedTripId(tripId));
  };

  const handleUsersOrTripsNav = (section: string) => {
    dispatch(setActiveSection(section));
  };
  return {
    tripStage,
    tripStatus,
    trip,
    trackingOrder,
    dispatcher,
    inputRef,
    isLoading,
    handleTrackTrip,
    handleUsersOrTripsNav,
  };
};
