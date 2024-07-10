"use client";

//hooks + helper function
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import { useStatusUpdate } from "@/components/Order/hooks/useStatusUpdate";
import { extractDateWithDayFromDate } from "@/lib/utils";

//next +react+redux
import { useGetTripQuery, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { TripStatus, TripStage } from "@/components/Order/types/Types";
import {
  setDispatcherTrip,
  setDispatcherTripDetails,
} from "@/lib/store/slice/dispatcherSlice";
import { redirect, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

//types
import { TripStatusDBUpdate } from "@/lib/store/slice/dashboardSlice";

export const useUpdateDispatcherTrip = () => {

  const params = useParams();
  const {trip_id} = params;
  
  const dispatch = useAppDispatch();
  const [
    updateTrip,
    { data: updateData, isLoading: updateLoading, error: updateError },
  ] =   useUpdateTripMutation();
  const {trip, tripId} = useAppSelector(state=>state.dispatcher)
  
  const dispatcher = useAppSelector((state) => state.dispatcher);
  const { data, isLoading, error } = useGetTripQuery(trip_id);
  
  const tripData = data?.trip

  useEffect(()=>{
    if(tripData) {

      dispatch(setDispatcherTrip(tripData))     
    }

  }, [tripData, dispatch, setDispatcherTrip])
  
  
  const { user_role } = useGetDispatcher();
  if (user_role === "Customer" || user_role === "Admin" || !user_role) {
    redirect("/profile");
  }

  



  const handleDispatcherUpdateTrip = useCallback(
    (tripId: string, tripStatus: TripStatus, tripStage: TripStage) => {
      

      let tripDetails: TripStatusDBUpdate = {
        trip_status: tripStatus,
        trip_stage: tripStage,
        trip_commencement_date: dispatcher.trip?.trip_commencement_date,
        trip_completion_date: dispatcher.trip?.trip_completion_date,
      };

      tripStatus === "Delivered"
        ? (tripDetails = {
            ...tripDetails,
            trip_completion_date: new Date(),
          })
        : tripStatus === "Picked Up"
        ? (tripDetails = {
            ...tripDetails,
            trip_commencement_date: new Date(),
          })
        :  tripStatus === "In Transit"
        ? (tripDetails = {
            ...tripDetails,
            trip_completion_date: null,
          })
        : "";

        dispatch(setDispatcherTrip({...trip, ...tripDetails}))

      updateTrip({
        trip_id: tripId,
        tripDetails,
      });
           
    },
    [updateTrip, trip, dispatcher]
  );
  const tripRequestDate = extractDateWithDayFromDate(trip?.trip_request_date);
  const tripCompletionDate = extractDateWithDayFromDate(trip?.trip_completion_date)
  const tripCommencementDate = extractDateWithDayFromDate(trip?.trip_commencement_date)
  return {
    handleDispatcherUpdateTrip,
    dispatcher,
    updateLoading,
    isLoading,
    trip,
    data,
    error,
    tripRequestDate,
    tripCommencementDate,
    tripCompletionDate
  };
};
