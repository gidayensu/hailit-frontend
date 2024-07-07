'use client'
import { usePrefetch, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { useGetAllVehiclesQuery, useUpdateDriverMutation, useUpdateRiderMutation } from "@/lib/store/apiSlice/hailitApi";
import { useCallback, useEffect, useRef, useState } from "react";


interface DispatcherVehicle {
  vehicle_id: string,
  plate_number: string;
  vehicle_name: string;
}

export const useAssignVehicle = (dispatcher?:any) => {
    const userRole = dispatcher?.user_role
    const dispatcherContainerRef = useRef<any>(null)

    
    const [assignedVehicle, setAssignedVehicle] = useState<DispatcherVehicle>({
      vehicle_id: dispatcher?.vehicle?.vehicle_id,
      plate_number: dispatcher?.vehicle?.plate_number,
      vehicle_name: dispatcher?.vehicle?.vehicle_name,
    });
    
    //manually setting assignVehicleLoading due to slow state change when rtk query's isLoading is used. Could be due to the logic for displaying the loader
    const [assignVehicleLoading, setAssignVehicleLoading] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1)
    const dispatch = useAppDispatch();
    const prefetchVehicles = usePrefetch('getAllVehicles')
    
    const vehicleType = userRole === "Driver" ? "car" : "motor";
    const {data:vehiclesData, isLoading:vehiclesLoading, error:vehiclesError} = useGetAllVehiclesQuery(`vehicles?page=${page}&vehicle_type=${vehicleType}`); 
    //prefetch next page
    const prefetchNext = useCallback(() => {
      prefetchVehicles(`vehicles?page=${page+1}&vehicle_type=${vehicleType}`)
    }, [prefetchVehicles, page])
  
    const [updateRider, {isSuccess: riderUpdateSuccess, error:riderUpdateError}] = useUpdateRiderMutation();
  const [updateDriver, {isSuccess: driverUpdateSuccess, error:driverUpdateError}] = useUpdateDriverMutation();

      

    
    const assignVehicleSuccess = userRole === "Driver" ? driverUpdateSuccess : riderUpdateSuccess;
    const assignVehicleError = userRole === "Driver" ? driverUpdateError : riderUpdateError;

    const vehicles = vehiclesData?.vehicles; 
    
    const totalPages = vehiclesData?.total_number_of_pages;
    

    useEffect(() => {
      if (page !== totalPages) {
        prefetchNext()
      }
    }, [totalPages, page, prefetchNext])

    const { selectedDriverId, selectedRiderId } = useAppSelector(state=>state.dashboard);
    

    

    const handleNextPage = ()=> {
      page !== totalPages ? setPage(page + 1) : "";
    }

    const handlePreviousPage = ()=> {
      page !== 1 ? setPage(page - 1) : "";
    }
    
    const handleAssignVehicle =  (vehicleDetails: DispatcherVehicle)=> {
      setAssignVehicleLoading(true)
      setAssignedVehicle((prevState)=>({...prevState, ...vehicleDetails}));
      userRole === "Driver" 
      ?   updateDriver({
          driverId: selectedDriverId,
          driverDetails: {vehicle_id: vehicleDetails?.vehicle_id}
        })
      : updateRider({
        riderId: selectedRiderId,
        riderDetails: {vehicle_id: vehicleDetails?.vehicle_id}
      })             
        
    }

    
    
    
    return {vehicles, page, dispatcherContainerRef, totalPages, assignedVehicle, assignVehicleError, assignVehicleLoading, vehiclesLoading,   vehiclesError, dispatcher, handleAssignVehicle, handleNextPage, handlePreviousPage }
    
}