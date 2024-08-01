"use client";
//redux + next + react + helper
import { useParams } from "next/navigation";
import { useState } from "react";

//interface
import { useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";

export const useUpdateUserTrip = () => {
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  const params = useParams();

  const { trip_id } = params;

  const [updateTrip, { isLoading, error, isSuccess, reset }] = useUpdateTripMutation();

  const handleTripUpdate = (tripDetails: any) => {
    try {
      updateTrip({ trip_id: trip_id, tripDetails });
      setUpdateLoading(true);
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  };

  if(isSuccess) {
    reset();
  }


  return { handleTripUpdate, updateLoading, isLoading, error, isSuccess };
};
