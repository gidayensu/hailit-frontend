"use client";
import { User, UserSchema } from "@/components/Form/FormTypes";
import { useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import {  DispatcherDetails } from "@/lib/store/slice/onBoardingSlice";
import { UserRole } from "@/lib/store/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateRiderMutation, useUpdateDriverMutation } from "@/lib/store/apiSlice/hailitApi";

export const useEditDispatcher = (dispatcher: any) => {
  
  const [isError, setIsError] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(dispatcher?.available);
  const [vehicleId, setVehicleId] = useState<string>(dispatcher?.vehicle_id);
  
  const userRole = dispatcher?.user_role;
  
  const [updateRider, {isSuccess: riderUpdated, error:riderUpdateError}] = useUpdateRiderMutation();
  const [updateDriver, {isSuccess: driverUpdated, error:driverUpdateError}] = useUpdateDriverMutation();

  const handleAvailable = () => {
    setAvailable(() => !available);
  };

  // useEffect(() => {
  //   setAvailable(dispatcher.available);
  //   setVehicleId(dispatcher.vehicle_id)
  // }, [setAvailable, setVehicleId, dispatcher]);

  //DashboardModal ref
  const modalRef = useRef<any>(null);
  const modal = modalRef.current;

  const openModal = useCallback( () => {
    modal?.showModal();
  }, [modal])
  const closeModal = () => {
    modal?.close();
  };

  const [updateUser, { isSuccess, isLoading, error }] = useUpdateUserMutation();

  

  //form submission
  const formMethods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const onDispatcherFormSubmit: SubmitHandler<User> = async (
    formData
  ) => {
    try {
      const userDetails = { ...formData, userRole };
      
      const {license_number} = formData;
      await updateUser({ userId: dispatcher.user_id, userDetails });

      
      //update driver/rider-specific details
      userRole === "Rider" 
      ? await updateRider({riderId: dispatcher?.rider_id, riderDetails: {available, license_number,}}) 
      : await updateDriver({driverId: dispatcher?.driver_id, driverDetails: {available, license_number,}})
      
      
      
    } catch (err) {
      setIsError(true);

      return { error: err };
    }
  };

    useEffect(()=> {

      if(isSuccess || error) {
        //the modal takes the isSuccess or Error as prop and display the appropriate message
        openModal();
      }
    }, [isSuccess, error, openModal])

  return {
    formMethods,
    handleSubmit,
    onDispatcherFormSubmit,
    isLoading,
    isSuccess,
    error,
    setAvailable,
    available,
    handleAvailable,
    modalRef,
    closeModal,
  };
};
