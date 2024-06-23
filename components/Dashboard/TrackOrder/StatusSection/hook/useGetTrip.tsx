"use client";
import { useGetTripQuery, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setActiveSection,
  setAssignedDispatcher,
  setSelectedTripId,
  setTrackingOrder,
  setTripStatus,
} from "@/lib/store/slice/dashboardSlice";
import { setTrip } from "@/lib/store/slice/tripSlice";

import { useRef, useCallback, useEffect } from "react";

export type OrderStatus =
  | "Booked"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

import { Vehicle } from "@/components/Dashboard/Vehicles/hook/useGetVehicles";

export const useGetTrip = () => {
  const inputRef = useRef<any>(null);

  const {
    previousSelectedTripId,
    selectedTripId,
    trackingOrder,
    editingOrder,
    
    tripStage,
    tripStatus,
  } = useAppSelector((state) => state.dashboard);
  const trip = useAppSelector((state)=>state.trip)
  const { data, isLoading, error } = useGetTripQuery(`${selectedTripId}`);
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(setTrip(data?.trip));
    
  }, [data]);

  
  const dispatcher = trip?.dispatcher;

  const [updateTrip] = useUpdateTripMutation();

  const handleTripUpdate = useCallback(  (key:string, tripDetails: any) => {
    
    try {

      dispatch(setTrip({...trip, ...tripDetails}))
       updateTrip({ trip_id: selectedTripId, tripDetails });
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  }, []);


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
    error,
    isLoading,
    handleTripUpdate,
    handleTrackTrip,
    handleUsersOrTripsNav,
    editingOrder,
  };
};
