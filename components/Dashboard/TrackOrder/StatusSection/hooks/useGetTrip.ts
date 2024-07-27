"use client";
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTrip } from "@/lib/store/slice/tripSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useGetTrip = () => {
  const router = useRouter();
  const inputRef = useRef<any>(null);
  const [controlledPollingInterval, setControlledPollingInterval] =
    useState<number>(5000);

  const params = useParams();

  const { trip_id } = params;
  const selectedTripId = trip_id;



  const { tripStage, tripStatus } = useAppSelector((state) => state.dashboard);

  const trip = useAppSelector((state) => state.trip);

  const { data, isLoading, error } = useGetTripQuery(selectedTripId, {
    pollingInterval: controlledPollingInterval,
    refetchOnFocus: true,
  });

  //control polling from running when there is an error
  useEffect(() => {
    if (error ) {
      setControlledPollingInterval(0);
    }
  }, [error, setControlledPollingInterval,]);

  const fetchedTrip = data?.trip;
  const dispatch = useAppDispatch();

  //dispatch fetched trip details to trip slice
  useEffect(() => {
    if (selectedTripId && fetchedTrip) {
      dispatch(setTrip(fetchedTrip));
    }
  }, [selectedTripId, fetchedTrip, dispatch]);

  const dispatcher = trip?.dispatcher;

  //track trip using form input via ref
  const handleTrackTrip = () => {
    const tripId = inputRef.current?.value;
    router.push(`/dashboard/track-order/${tripId}`);
  };

  

  return {
    tripStage,
    tripStatus,
    trip,
    dispatcher,
    inputRef,
    error,
    isLoading,
    selectedTripId,
    handleTrackTrip,

    
  };
};
