"use client";
import { useGetTripQuery, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setActiveSection,
  setSelectedTripId,
  setTrackingOrder,
  ActiveSection,
  setSelectedRiderId,
  setSelectedDriverId
} from "@/lib/store/slice/dashboardSlice";
import { setTrip } from "@/lib/store/slice/tripSlice";
import { useParams } from "next/navigation";
import { Trip } from "@/lib/store/slice/tripSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const useGetTrip = () => {
  const inputRef = useRef<any>(null);
  const params = useParams();

  const router  = useRouter();

  const {
    previousSelectedTripId,
    selectedTripId,
    trackingOrder,
    editingOrder,
    tripStage,
    tripStatus,
  } = useAppSelector((state) => state.dashboard);

  const [controlledPollingInterval, setControlledPollingInterval] = useState<number>(5000);
  const { trip_id } = params;
  const trip = useAppSelector((state)=>state.trip)
  const { data, isLoading, error } = useGetTripQuery(trip_id, {
    pollingInterval: controlledPollingInterval,
    refetchOnFocus: true
  });
//control polling from running when there is an error
  useEffect(()=> {
    if(error || editingOrder) {
      setControlledPollingInterval(0)

    }
  }, [error, setControlledPollingInterval, editingOrder])
  
  const fetchedTrip = data?.trip
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedTripId && fetchedTrip) {
      dispatch(setTrip(fetchedTrip));
    }
  }, [selectedTripId, fetchedTrip, dispatch]);
  

  
  const dispatcher = trip?.dispatcher;

  const [updateTrip] = useUpdateTripMutation();

  //TODO: move this to useUpdateTrip
  const handleTripUpdate = useCallback(async (key: string, tripDetails: any) => {
    try {
      dispatch(setTrip({ ...trip, ...tripDetails }));
      await updateTrip({ trip_id: selectedTripId, tripDetails });
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  }, [trip, selectedTripId, updateTrip, dispatch]);
  

  //track trip using form input via ref
  const handleTrackTrip = () => {
    const tripId = inputRef.current?.value;
    dispatch(setTrackingOrder(true));
    dispatch(setSelectedTripId(tripId));
    router.push(`/dashboard/track-order/${tripId}`)
  };

  //handle view rider/driver assigned to trip
  const handleViewDispatcher = ()=> {
    console.log('TRIP MEDIUM:',trip?.trip_medium)
    if(trip?.trip_medium === "Motor" ) {
      dispatch(setActiveSection('Riders'))
      dispatch(setSelectedRiderId(dispatcher?.dispatcher_id))
    } else {
      dispatch(setActiveSection('Drivers'))
      dispatch(setSelectedDriverId(dispatcher?.dispatcher_id))
    }
    router.push('/dashboard/dispatchers/dispatcher-details')
  }
  //TODO:MOVE THIS
  const handleUsersOrTripsNav = (section: ActiveSection) => {
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
    selectedTripId,
    handleTripUpdate,
    handleTrackTrip,
    handleUsersOrTripsNav,
    handleViewDispatcher,
    editingOrder,
  };
};
