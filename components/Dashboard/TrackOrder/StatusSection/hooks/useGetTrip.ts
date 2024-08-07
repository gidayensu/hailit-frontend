"use client";
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { Trip } from "@/lib/store/slice/tripSlice";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";

export const useGetTrip = () => {
  const router = useRouter();
  const inputRef = useRef<any>(null);

  const params = useParams();

  const { trip_id } = params;
  const selectedTripId = trip_id;



  const { tripStage, tripStatus } = useAppSelector((state) => state.dashboard);


  const { data, isLoading, error } = useGetTripQuery(selectedTripId);

  const trip:Trip = data?.trip;
  

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
