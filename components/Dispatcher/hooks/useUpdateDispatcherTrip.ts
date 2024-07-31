"use client";

//hooks + helper function
import { useGetDispatcher } from "@/components/Dispatcher/hooks/useGetDispatcher";
import { extractDateWithDayFromDate } from "@/lib/utils";

//next +react+redux
import { useGetTripQuery, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";

import { TripStage, TripStatus } from "@/components/Order/types/Types";
import { redirect, useParams } from "next/navigation";
import { useCallback } from "react";

//types
import { TripStatusDBUpdate } from "@/lib/store/slice/dashboardSlice";

export const useUpdateDispatcherTrip = () => {

  const params = useParams();
  const {trip_id} = params;
  
  const { data, isLoading, error } = useGetTripQuery(trip_id);

  
  const [
    updateTrip,
    { isLoading: updateLoading, error: updateError }, 
  ] =   useUpdateTripMutation();

  const trip = data?.trip
  
  
  const dispatcher = useAppSelector((state) => state.dispatcher);
   
  
  const { user_role } = useGetDispatcher();
  if (user_role === "Customer" || user_role === "Admin" || !user_role) {
    redirect("/authentication");
  }


  const handleDispatcherUpdateTrip = useCallback(
    ({tripId, tripStage, tripStatus, dispatcherId}:{tripId: string, tripStatus: TripStatus, tripStage: TripStage, dispatcherId:string}) => {
      

      let tripDetails: TripStatusDBUpdate = {
        trip_status: tripStatus,
        trip_stage: tripStage,
        trip_commencement_date: dispatcher.trip?.trip_commencement_date,
        trip_completion_date: dispatcher.trip?.trip_completion_date,
        dispatcher_id: dispatcherId //dispatcherId is added for verifcation on the backend that the rider/driver is indeed associated with the trip
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
    tripCompletionDate,
    updateError
  };
};
