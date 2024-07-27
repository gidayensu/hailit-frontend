'use client'
import { useGetVehicleQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedVehicleId } from "@/lib/store/slice/dashboardSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Vehicle } from "./useGetVehicles";
export const useGetVehicle = ()=> {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const {selectedVehicleId} = useAppSelector(state=>state.dashboard)
    const { data, isLoading, error } = useGetVehicleQuery(selectedVehicleId);
    const vehicle:Vehicle = data?.vehicle;

    const handleSelectVehicle= useCallback( (selectedVehicleId: string)=> {
        dispatch(setSelectedVehicleId(selectedVehicleId))
        router.push('/dashboard/vehicles/vehicle-details')
    }, [selectedVehicleId, dispatch])

    return {vehicle, isLoading, error, handleSelectVehicle}
}