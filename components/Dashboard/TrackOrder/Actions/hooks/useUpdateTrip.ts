"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

//redux + next + react + helper
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { scrollToSection } from "@/lib/utils";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
//interface
import {
  UpdateOrderDetails,
  UpdateOrderSchema,
} from "@/components/Form/FormTypes";
import { useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import {
  resetDeliveryChoices,
  setPackageType,
  setScheduled,
  setTripArea,
  setTripMedium,
  setTripType,
} from "@/lib/store/slice/deliveryChoicesSlice";
import { resetMapData } from "@/lib/store/slice/mapSlice";
import { Trip } from "@/lib/store/slice/tripSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useUpdateTrip = (trip: Trip) => {
  const params = useParams();
  const selectedTripId = params.trip_id;
  const router = useRouter();

  useEffect(() => {
    dispatch(setPackageType(trip?.package_type));
    dispatch(setTripMedium(trip?.trip_medium));
    dispatch(setTripType(trip?.trip_type));
    dispatch(setTripArea(trip?.trip_area));
    if (trip?.trip_type === "Scheduled") {
      dispatch(setScheduled(true));
    }
  }, [trip?.package_type, trip?.trip_type]);

  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const packageTypeRef = useRef<any>(null);

  const [updateTrip, { data, isLoading,  }] = useUpdateTripMutation();

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
    setUpdateLoading(true);

    if (!package_type) {
      scrollToSection(packageTypeRef);
      return setUpdateLoading(false);
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

    updateTrip({ trip_id: selectedTripId, tripDetails });
  };
  if (data) {
    dispatch(resetDeliveryChoices());
    dispatch(resetMapData());
  }

  //redirect
  useEffect(() => {
    if (!trip?.trip_id) {
      router.push("/dashboard/track-order");
    }
  }, [trip, router]);

  return {
    formMethods,
    control,
    dispatch,
    handleSubmit,
    onDeliveryFormSubmit,
    packageTypeRef,
    trip_medium,
    trip_type,
    trip_area,
    package_type,
    updateLoading,
    isLoading,
    register,
  };
};
