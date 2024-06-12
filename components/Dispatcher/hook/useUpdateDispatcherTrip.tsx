"use client";

//hooks + helper function
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import { useStatusUpdate } from "@/components/Order/hooks/useStatusUpdate";
import { extractDateWithDayFromDate } from "@/lib/utils";

//next +react+redux
import { redirect, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { TripStage, TripStatus } from "@/lib/store/slice/dashboardSlice";
import {
  setDispatcherTripDetails,

} from "@/lib/store/slice/dispatcherSlice";
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";

//types
import { DispatcherTrip } from "@/components/Order/hooks/useGetUserTrips";
import { TripStatusDBUpdate } from "@/lib/store/slice/dashboardSlice";

export const useUpdateDispatcherTrip = () => {
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { updateTrip } = useStatusUpdate();
  const { tripStatus, tripStage } = useAppSelector((state) => state.dispatcher);
  const dispatcher = useAppSelector((state) => state.dispatcher);

  const { user_role } = useGetDispatcher();
  if (user_role === "customer" || user_role === "admin" || !user_role) {
    redirect("/profile");
  }

  const params = useParams();
  const { trip_id } = params;

  const { data, isLoading, error } = useGetTripQuery(`${trip_id}`,
    // this overrules the api definition setting,
    // forcing the query to always fetch when this component is mounted
    { refetchOnMountOrArgChange: true });
  const trip: DispatcherTrip = data?.trip;
  

  useEffect(() => {
    if (trip) {
      dispatch(
        setDispatcherTripDetails({
          ...dispatcher,
          tripId: trip.trip_id,
          tripStatus: trip.trip_status,
          tripStage: trip.trip_stage,
          commencementDate: trip.trip_commencement_date,
          completionDate: trip.trip_completion_date,
        })
      );
    }
  }, [trip]);

  const handleDispatcherUpdateTrip = useCallback(
    (tripId: string, tripStatus: TripStatus, tripStage: TripStage) => {
      setUpdateLoading(true);

      let tripDetails: TripStatusDBUpdate = {
        trip_status: tripStatus,
        trip_stage: tripStage,
        trip_commencement_date: dispatcher.commencementDate,
        trip_completion_date: dispatcher.completionDate,
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
        : "";

      updateTrip({
        tripId,
        tripDetails,
      });

      dispatch(
        setDispatcherTripDetails({
          ...dispatcher,
          tripId,
          tripStatus,
          tripStage,
          commencementDate: tripDetails.trip_commencement_date,
          completionDate: tripDetails.trip_completion_date,
        })
      );
      setUpdateLoading(false);
    },
    [updateTrip]
  );
  const tripRequestDate = extractDateWithDayFromDate(trip?.trip_request_date);
  const tripCompletionDate = extractDateWithDayFromDate(dispatcher.completionDate)
  const tripCommencementDate = extractDateWithDayFromDate(dispatcher.commencementDate)
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
