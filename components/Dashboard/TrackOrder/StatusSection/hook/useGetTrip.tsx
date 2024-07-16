"use client";
import { useGetTripQuery, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  ActiveSection,
  setActiveSection,
  setSelectedDriverId,
  setSelectedRiderId
} from "@/lib/store/slice/dashboardSlice";
import { setTrip } from "@/lib/store/slice/tripSlice";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const useGetTrip = () => {
  const inputRef = useRef<any>(null);
  const params = useParams();
  const {trip_id} = params
  const selectedTripId = trip_id;
  
  const [editingOrder, setEditingOrder] = useState<boolean>(false)

  const handleEditingOrder = ()=> {
    setEditingOrder(()=>!editingOrder)
  }
  const router  = useRouter();

  const {
    tripStage,
    tripStatus,
  } = useAppSelector((state) => state.dashboard);

  const [controlledPollingInterval, setControlledPollingInterval] = useState<number>(5000);
  const trip = useAppSelector((state)=>state.trip)
  
  const { data, isLoading, error } = useGetTripQuery(selectedTripId, {
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

  console.log(`this renders`)

  return {
    tripStage,
    tripStatus,
    trip,
    
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
    handleEditingOrder
  };
};
