'use client'
import { useGetAllDriversQuery, useGetAllRidersQuery, useLazyUpdateTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setAssignedDispatcher, setPreviousSelectedTripId } from "@/lib/store/slice/dashboardSlice";
import { useState, useCallback, useEffect } from "react";

interface DispatcherToBeAssigned {
  id: string, 
  name: string, 
  vehicle: string,
  plate: string,
  phone: string,
}

export const useAssignDispatchers = (role:"riders" | "drivers") => {
    const [dispatcherToBeAssigned, setDispatcherToBeAssigned] = useState<DispatcherToBeAssigned>({
      id: '',
      name: '',
      vehicle: '',
      plate: '',
      phone: '',
    });
    
    const dispatch = useAppDispatch();
    const { assignedDispatcherId, selectedTripId } = useAppSelector(state=>state.dashboard);

    //fetching query based on trip medium
    
    // const  [getAllDrivers, {data:driversData, isLoading:driversLoading, error:driversError}] = useLazyGetAllDriversQuery();
    // const  [getAllRiders, {data:ridersData, isLoading:ridersLoading, error:ridersError}] = useLazyGetAllRidersQuery();
    const [updateTrip, {data:updateData, isLoading: updateLoading, error: updateError}] = useLazyUpdateTripQuery();
    const {data:ridersData, isLoading:ridersLoading, error:ridersError} = useGetAllRidersQuery('riders'); 
    const {data:driversData, isLoading:driversLoading, error:driversError} = useGetAllDriversQuery('drivers');
    // role === "riders" ? getAllRiders('riders') : getAllDrivers('drivers');

    const handleAssignedDispatcher = useCallback( (dispatcherDetails: DispatcherToBeAssigned)=> {
      updateTrip({
          tripId: selectedTripId,
          tripDetails: {dispatcher_id: dispatcherDetails.id}
          
        })
        setDispatcherToBeAssigned(
        {
          id: dispatcherDetails.id,
          name: dispatcherDetails.name,
          vehicle: dispatcherDetails.vehicle,
          plate: dispatcherDetails.vehicle,
          phone: dispatcherDetails.phone
        }
      )  
        

          if (updateData) {
            dispatch(setAssignedDispatcher({
              assignedDispatcherId: dispatcherToBeAssigned.id,
              assignedDispatcherName: dispatcherToBeAssigned.name,
              assignedDispatcherVehicle: dispatcherToBeAssigned.vehicle,
              assignedDispatcherPlate: dispatcherToBeAssigned.plate, 
              assignedDispatcherPhone: dispatcherToBeAssigned.phone
            }))
            dispatch(setPreviousSelectedTripId([selectedTripId]))
          }
      

        
        
    }, [])
    const riders = ridersData?.riders; 
    const drivers = driversData?.drivers;
    
    return {drivers, riders, driversLoading, ridersLoading, updateData, updateLoading, dispatcherToBeAssigned, assignedDispatcherId, driversError, ridersError, handleAssignedDispatcher, }
    
}