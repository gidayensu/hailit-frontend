"use client";


import { useUpdateVehicleMutation } from "@/lib/store/apiSlice/hailitApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Vehicle as VehicleFormDetails, VehicleSchema } from "@/components/Form/FormTypes";

export type VehicleType = "Car" | "Truck" | "Motor"

interface Vehicle {
  vehicle_id: string;
  vehicle_name: string;
  vehicle_model: string;
  plate_number: string;
  vehicle_type: VehicleType;
  insurance_details: string;
  road_worthy: string;
  available: boolean;
}

export const useEditVehicle = (vehicle: Vehicle) => {
  

  const [vehicleType, setVehicleType] = useState<VehicleType>(vehicle.vehicle_type)
//   const [isError, setIsError] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(vehicle.available);

  const handleAvailable = () => {
    setAvailable(() => !available);
  };

  
  //DashboardModal ref
  const modalRef = useRef<any>(null);
  const modal = modalRef.current;

  const openModal = () => {
    modal?.showModal();
  };
  const closeModal = () => {
    modal?.close();
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

      await updateVehicle({ vehicleId: vehicle.vehicle_id, vehicleDetails });
    } catch (err) {
      

      return { error: err };
    }
  };

  if(isSuccess || error) {
    openModal();
    
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
    modalRef,
    closeModal,
    handleVehicleTypeSelection,
    vehicleType
  };
};
