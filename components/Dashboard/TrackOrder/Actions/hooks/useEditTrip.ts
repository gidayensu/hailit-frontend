"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

//redux + next + react + helper
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { scrollToSection } from "@/lib/utils";
import { useRef } from "react";
//interface
import {
  UpdateOrderDetails,
  UpdateOrderSchema,
} from "@/components/Form/FormTypes";
import { useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import {
  setPackageType,
  setScheduled,
  setTripArea,
  setTripMedium,
  setTripType
} from "@/lib/store/slice/deliveryChoicesSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetTrip } from "../../StatusSection/hooks/useGetTrip";

export const useEditTrip = () => {
  const { trip } = useGetTrip();
  console.log({trip})

  const router = useRouter();
  //redirect
  useEffect(() => {
    if (!trip) {
      router.push("/dashboard/track-order");
    }

    
  }, [trip, router, ]);

  useEffect(() => {
    dispatch(setPackageType(trip?.package_type));
    dispatch(setTripMedium(trip?.trip_medium));
    dispatch(setTripType(trip?.trip_type));
    dispatch(setTripArea(trip?.trip_area));
    if (trip?.trip_type === "Scheduled") {
      dispatch(setScheduled(true));
    }
  }, [trip?.package_type, trip?.trip_type]);

  
  
  const packageTypeRef = useRef<any>(null);
  const editTripModalRef = useRef<any>(null);
  const tripModal = editTripModalRef.current;
  
  const [updateTrip, { data, isLoading, error,  reset, isSuccess}] = useUpdateTripMutation();
  
  const openTripModal = () => {
    tripModal?.showModal();
  };
  const closeTripModal = () => {
    tripModal?.close();
    reset()
  };

  const dispatch = useAppDispatch();
  const { trip_medium, trip_type, trip_area, package_type } = useAppSelector(
    (state) => state.deliveryChoices
  );

  //Populate package type, trip medium, and trip area with trip details before editing
  useEffect(() => {
    dispatch(setPackageType(trip?.package_type));
    dispatch(setTripMedium(trip?.trip_medium));
    dispatch(setTripArea(trip?.trip_area));
    if (trip?.trip_type === "Scheduled") {
      dispatch(setScheduled(true));
    }
  }, [trip?.package_type, trip?.trip_type]);

  //update trip
  const formMethods = useForm<UpdateOrderDetails>({
    resolver: zodResolver(UpdateOrderSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    
    
  } = formMethods;

  const onDeliveryFormSubmit: SubmitHandler<any> = async (data) => {
    

    if (!package_type) {
      return scrollToSection(packageTypeRef);
      
    }
    const trip_commencement_date = data.pickup_date;
    const trip_completion_date = data.delivery_date;

    let tripDetails = {
      ...data,
      trip_commencement_date,
      trip_completion_date,
      package_type,
      trip_type,
      trip_area,
      trip_medium,
    };

    //update trip status if date is selected
    trip_commencement_date
      ? (tripDetails = {
          ...tripDetails,
          trip_status: "Picked Up",
          trip_stage: 2,
        })
      : "";

    trip_completion_date
      ? (tripDetails = {
          ...tripDetails,
          trip_status: "Delivered",
          trip_stage: 4,
        })
      : "";

    updateTrip({ trip_id: trip?.trip_id, tripDetails });
  };

  if (data || error) {
    
    openTripModal();
    
  }


  return {
    formMethods,
    closeTripModal,
    control,
    dispatch,
    handleSubmit,
    onDeliveryFormSubmit,
    packageTypeRef,
    trip_medium,
    trip_type,
    trip_area,
    package_type,
    trip,
    isLoading,
    register,
    editTripModalRef,
    error,
    isSuccess
  };
};
