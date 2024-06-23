'use client'
import { useGetAllDriversQuery, useGetAllRidersQuery, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPreviousSelectedTripId } from "@/lib/store/slice/dashboardSlice";
import { setTrip } from "@/lib/store/slice/tripSlice";
import { Dispatcher } from "@/lib/store/slice/tripSlice";
import { useState, useCallback, useEffect } from "react";

interface AssignedDispatcher {
  dispatcher_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  vehicle: {
    plate_number: string;
    vehicle_name: string;
  };
}


export const useAssignDispatchers = (role:"riders" | "drivers") => {
    const [dispatcherToBeAssigned, setAssignedDispatcher] =
      useState<AssignedDispatcher>({
        dispatcher_id: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        vehicle: {
          plate_number: "",
          vehicle_name: "",
        },
      });
    const dispatch = useAppDispatch();
    const { assignedDispatcherId, selectedTripId } = useAppSelector(state=>state.dashboard);
    const trip = useAppSelector(state=>state.trip);
    const {dispatcher} = trip;
    //fetching query based on trip medium
    
    // const  [getAllDrivers, {data:driversData, isLoading:driversLoading, error:driversError}] = useLazyGetAllDriversQuery();
    // const  [getAllRiders, {data:ridersData, isLoading:ridersLoading, error:ridersError}] = useLazyGetAllRidersQuery();
    const [updateTrip, {data:updateData, isLoading: updateLoading, error: updateError}] = useUpdateTripMutation();
    const {data:ridersData, isLoading:ridersLoading, error:ridersError} = useGetAllRidersQuery('riders'); 
    const {data:driversData, isLoading:driversLoading, error:driversError} = useGetAllDriversQuery('drivers');
    // role === "riders" ? getAllRiders('riders') : getAllDrivers('drivers');

    const handleAssignedDispatcher = useCallback( (dispatcherDetails: AssignedDispatcher)=> {
      dispatch(setTrip({...trip, dispatcher: {
        ...dispatcher, ...dispatcherDetails
      }}))
      updateTrip({
          trip_id: selectedTripId,
          tripDetails: {dispatcher_id: dispatcherDetails.dispatcher_id}
          
        })
        

          dispatch(setPreviousSelectedTripId([selectedTripId]))
      

        
        
    }, [])
    const riders = ridersData?.riders; 
    const drivers = driversData?.drivers;
    
    return {drivers, riders, driversLoading, ridersLoading, updateData, updateLoading, assignedDispatcherId, driversError, ridersError, dispatcher, handleAssignedDispatcher, }
    
}