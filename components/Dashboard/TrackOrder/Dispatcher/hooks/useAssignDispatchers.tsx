'use client'
import { useGetAllDriversQuery, useGetAllRidersQuery, useUpdateTripMutation, usePrefetch } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPreviousSelectedTripId } from "@/lib/store/slice/dashboardSlice";
import { setTrip } from "@/lib/store/slice/tripSlice";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const dispatcherContainerRef = useRef<any>(null)

    const [page, setPage] = useState<number>(1)
    const dispatch = useAppDispatch();
    const prefetchRiders = usePrefetch('getAllRiders')

    const prefetchNext = useCallback(() => {
      prefetchRiders(`riders?page=${page+1}`)
    }, [prefetchRiders, page])
  
    //fetching query based on trip medium
    
    // const  [getAllDrivers, {data:driversData, isLoading:driversLoading, error:driversError}] = useLazyGetAllDriversQuery();
    // const  [getAllRiders, {data:ridersData, isLoading:ridersLoading, error:ridersError}] = useLazyGetAllRidersQuery();
    const [updateTrip, {data:updateData, isLoading: updateLoading, error: updateError}] = useUpdateTripMutation();
    const {data:ridersData, isLoading:ridersLoading, error:ridersError} = useGetAllRidersQuery(`riders?page=${page}`); 
    const {data:driversData, isLoading:driversLoading, error:driversError} = useGetAllDriversQuery(`drivers?page=${page}`);
    // role === "riders" ? getAllRiders('riders') : getAllDrivers('drivers');
    const riders = ridersData?.riders; 
    const drivers = driversData?.drivers;
    const ridersTotalPages = ridersData?.total_number_of_pages;
    const driversTotalPages = driversData?.total_number_of_pages;

    useEffect(() => {
      if (page !== ridersTotalPages) {
        prefetchNext()
      }
    }, [ridersTotalPages, page, prefetchNext])
    const { assignedDispatcherId, selectedTripId } = useAppSelector(state=>state.dashboard);
    const trip = useAppSelector(state=>state.trip);
    const {dispatcher} = trip;

    

    const handleNextPage = (role:"riders"|"drivers")=> {
        if(dispatcherContainerRef.current) {
          dispatcherContainerRef.current.scrollTo(0, 0)
        }
        if(role==="riders") {
          page!==ridersTotalPages ? setPage(page+1): ''
        }
        if(role==="drivers") {
          page!==driversTotalPages ? setPage(page+1): ''
        }
        
    }
    const handlePreviousPage = (role:"riders"|"drivers")=> {
      
      if(role==="riders") {
        page!==1 ? setPage(page-1): ''
      }
      if(role==="drivers") {
        page!== 1 ? setPage(page-1): ''
      }
      
    }
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
    
    
    return {drivers, riders, driversLoading, page, dispatcherContainerRef, driversTotalPages, ridersTotalPages, ridersLoading, updateData, updateLoading, assignedDispatcherId, driversError, ridersError, dispatcher, handleAssignedDispatcher, handleNextPage, handlePreviousPage }
    
}