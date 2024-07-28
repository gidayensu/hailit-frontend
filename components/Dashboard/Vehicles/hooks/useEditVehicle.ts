"use client";


import { Vehicle as VehicleFormDetails, VehicleSchema } from "@/components/Form/FormTypes";
import { useUpdateVehicleMutation } from "@/lib/store/apiSlice/hailitApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { VehicleType } from "../AllVehiclesTable";
import { useGetVehicle } from "./useGetVehicle";



export const useEditVehicle = () => {
  
  const {
    vehicle,
    
  } = useGetVehicle();
  const [vehicleType, setVehicleType] = useState<VehicleType>(vehicle?.vehicle_type)
//   const [isError, setIsError] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(vehicle?.available);

  const handleAvailable = () => {
    setAvailable(() => !available);
  };

  
  //SecondaryModal ref
  const editVehicleModalRef = useRef<any>(null);
  const vehicleModal = editVehicleModalRef.current;

  const openEditVehicleModal = () => {
    vehicleModal?.showModal();
  };
  const closeEditVehicleModal = () => {
    vehicleModal?.close();
  };

  const [updateVehicle, { isSuccess, isLoading, error }] = useUpdateVehicleMutation();

  

  const handleVehicleTypeSelection = (vehicleType:VehicleType)=> {
      setVehicleType(vehicleType)
  }

  //form submission
  const formMethods = useForm<VehicleFormDetails>({
    resolver: zodResolver(VehicleSchema),
  });
  const {
    // register,
    handleSubmit,
    // formState: { errors },
    
  } = formMethods;

  const onCustomerFormSubmit: SubmitHandler<VehicleFormDetails> = async (
    formData
  ) => {
    try {
      const vehicleDetails = { ...formData, available, vehicle_type: vehicleType };

      await updateVehicle({ vehicleId: vehicle?.vehicle_id, vehicleDetails });
    } catch (err) {
      

      return { error: err };
    }
  };

  if(isSuccess || error) {
    openEditVehicleModal();
    
  }

  return {
    formMethods,
    handleSubmit,
    onCustomerFormSubmit,
    isLoading,
    isSuccess,
    error,
    available,
    handleAvailable,
    editVehicleModalRef,    
    closeEditVehicleModal,
    handleVehicleTypeSelection,
    vehicleType,
    vehicle
  };
};
