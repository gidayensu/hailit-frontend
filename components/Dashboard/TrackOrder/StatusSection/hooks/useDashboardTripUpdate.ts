"use client";
import { hailitApi, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useCallback } from "react";

export const useDashboardTripUpdate = () => {
  const params = useParams();
  const { trip_id } = params;
  const selectedTripId = trip_id;

  const dispatch = useAppDispatch();

  const trip = useAppSelector((state) => state.trip);

  const [updateTrip] = useUpdateTripMutation();

  //TODO: move this to useUpdateTrip
  const handleTripUpdate = useCallback(async (key: string, tripDetails: any) => {
    try {
      dispatch(hailitApi.util.updateQueryData('getTrip', trip_id, (tripData)=> {
        const trip = tripData.trip
        tripData.trip = {...trip, ...tripDetails}
      }))
      await updateTrip({ trip_id: selectedTripId, tripDetails });
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  }, [trip, selectedTripId, updateTrip, dispatch]);

  return {
    handleTripUpdate,
  };
};
