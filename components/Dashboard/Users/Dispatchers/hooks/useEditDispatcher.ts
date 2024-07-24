"use client";
import { User, UserSchema } from "@/components/Form/FormTypes";
import { useUpdateDriverMutation, useUpdateRiderMutation, useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useEditDispatcher = (dispatcher: any) => {
  

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

  //SecondaryModal ref
  const editDispatcherModalRef = useRef<any>(null);
  const editDispatcherModal = editDispatcherModalRef.current;

  const openDispatcherModal = useCallback( () => {
    editDispatcherModal?.showModal();
  }, [editDispatcherModal])

  const closeDispatcherModal = () => {
    editDispatcherModal?.close();
  };

  const [updateUser, { isSuccess, isLoading, error }] = useUpdateUserMutation();

  

  //form submission
  const formMethods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  const {
    
    handleSubmit,
    
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
      

      return { error: err };
    }
  };

    useEffect(()=> {

      if(isSuccess || error) {
        //the editDispatcherModal takes the isSuccess or Error as prop and display the appropriate message
        openDispatcherModal();
      }
    }, [isSuccess, error, openDispatcherModal])

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
    editDispatcherModalRef,
    closeDispatcherModal,
    vehicleId,
    setVehicleId,
    riderUpdated,
    driverUpdated,
    riderUpdateError,
    driverUpdateError
  };
};
