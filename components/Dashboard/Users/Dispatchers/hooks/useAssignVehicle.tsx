'use client'
import { usePrefetch } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";

import { useGetAllVehiclesQuery, useUpdateDriverMutation, useUpdateRiderMutation } from "@/lib/store/apiSlice/hailitApi";
import { Dispatcher } from "@/lib/store/slice/tripSlice";
import { useCallback, useEffect, useRef, useState } from "react";

interface DispatcherVehicle {
  vehicle_id: string | undefined,
  plate_number: string | undefined;
  vehicle_name: string | undefined;
}

export const useAssignVehicle = (dispatcher?:Dispatcher) => {
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
    
    const prefetchVehicles = usePrefetch('getAllVehicles')
    const { selectedDriverId, selectedRiderId } = useAppSelector(state=>state.dashboard);
    
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
    
    //prefetch data
    useEffect(() => {
      if (page !== totalPages) {
        prefetchNext()
      }
    }, [totalPages, page, prefetchNext])

    

    
    //pagination
    const handleNextPage = ()=> {
      page !== totalPages ? setPage(page + 1) : "";
    }

  
    const handlePreviousPage = ()=> {
      page !== 1 ? setPage(page - 1) : "";
    }
  
    //assign vehicle
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

    
    
    
    return {
      vehicles,
      page,
      dispatcherContainerRef,
      totalPages,
      assignedVehicle,
      assignVehicleError,
      assignVehicleLoading,
      assignVehicleSuccess,
      vehiclesLoading,
      vehiclesError,
      dispatcher,
      handleAssignVehicle,
      handleNextPage,
      handlePreviousPage,
    };
    
}