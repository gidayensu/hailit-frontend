'use client'
import { hailitApi, useGetAllDriversQuery, useGetAllRidersQuery, usePrefetch, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetTrip } from "../../StatusSection/hooks/useGetTrip";

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
  const {  dispatcher } = useGetTrip();
    const [page, setPage] = useState<number>(1)
    const dispatch = useAppDispatch();
    const prefetchRiders = usePrefetch('getAllRiders')

    const prefetchNext = useCallback(() => {
      prefetchRiders(`riders?page=${page+1}`)
    }, [prefetchRiders, page])
  
    //fetching query based on trip medium
    
    const [updateTrip, {data:updateData, isLoading: updateLoading, error: updateError}] = useUpdateTripMutation();
    const {data:ridersData, isLoading:ridersLoading, error:ridersError} = useGetAllRidersQuery(`riders?page=${page}`); 
    //TODO: Fetch drivers separately
    const {data:driversData, isLoading:driversLoading, error:driversError} = useGetAllDriversQuery(`drivers?page=${page}`);
    
    const riders = ridersData?.riders; 
    const drivers = driversData?.drivers;
    const ridersTotalPages = ridersData?.total_number_of_pages;
    const driversTotalPages = driversData?.total_number_of_pages;
    const totalPages = driversTotalPages || ridersTotalPages;

    useEffect(() => {

      if (page !== totalPages) {
        prefetchNext()
      }
    }, [ridersTotalPages, page, prefetchNext])
    const { assignedDispatcherId } = useAppSelector(state=>state.dashboard);
    const params = useParams();
    
    const selectedTripId = params.trip_id;
    

    

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
      dispatch(hailitApi.util.updateQueryData('getTrip', selectedTripId, (tripData)=> {
        const trip = tripData.trip
        tripData.trip = {...trip, dispatcher: dispatcherDetails}
      }))
      updateTrip({
        trip_id: selectedTripId,
        tripDetails: { dispatcher_id: dispatcherDetails.dispatcher_id },
      });
    }, [])
    
    
    return {
      drivers,
      riders,
      driversLoading,
      page,
      dispatcherContainerRef,
      driversTotalPages,
      ridersTotalPages,
      ridersLoading,
      updateData,
      updateLoading,
      assignedDispatcherId,
      driversError,
      ridersError,
      updateError,
      dispatcher,
      handleAssignedDispatcher,
      handleNextPage,
      handlePreviousPage,
    };
    
}