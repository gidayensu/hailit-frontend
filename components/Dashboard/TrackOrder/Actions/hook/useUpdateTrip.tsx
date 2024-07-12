'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';


//redux + next + react + helper
import { useAddTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { scrollToSection } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

//interface
import { NewOrderSchema, OrderDetails, UpdateOrderDetails, UpdateOrderSchema } from '@/components/Form/FormTypes';
import { setEditingOrder, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";
import { setTripMedium, setTripArea, setPackageType, setScheduled, resetDeliveryChoices, setTripType } from "@/lib/store/slice/deliveryChoicesSlice";
import { useEffect } from "react";
import { Trip } from '@/lib/store/slice/tripSlice';
import {   useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { resetMapData } from '@/lib/store/slice/mapSlice';

export const useUpdateTrip = (trip:Trip)=> {

  useEffect(() => {
    dispatch(setPackageType(trip?.package_type));
    dispatch(setTripMedium(trip?.trip_medium));
    dispatch(setTripType(trip?.trip_type));
    dispatch(setTripArea(trip?.trip_area));
    if (trip?.trip_type === "scheduled") {
      dispatch(setScheduled(true));
    }
  }, [trip?.package_type, trip?.trip_type]);

  const { selectedTripId } = useAppSelector(state=>state.dashboard)
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const packageTypeRef = useRef<any>(null);
  
  const  [updateTrip, { data, isLoading, error }] =   useUpdateTripMutation();
  
  const dispatch = useAppDispatch();
  const { trip_medium, trip_type, trip_area, package_type } = useAppSelector(state=>state.deliveryChoices);
  
  //Populate package type, trip medium, and trip area with trip details before editing
  useEffect(()=> {
      dispatch(setPackageType(trip?.package_type))
      dispatch(setTripMedium(trip?.trip_medium))
      dispatch(setTripArea(trip?.trip_area))
      if(trip?.trip_type === "scheduled") {
          dispatch(setScheduled(true))
      }
  }, [trip?.package_type, trip?.trip_type])
  

  
  const handleCancel = ()=> {
    dispatch(setTrackingOrder(true))
    dispatch(setEditingOrder(false))
  }

  //update trip
  const formMethods = useForm<UpdateOrderDetails>({
    resolver: zodResolver(UpdateOrderSchema)
    });
    const {register, handleSubmit, control, formState: {errors}, setError,  } = formMethods;
    
  
  const onDeliveryFormSubmit: SubmitHandler<any> = async (data)=> {
    
  
    setUpdateLoading(true);

    if(!package_type) {
      scrollToSection(packageTypeRef)
      return (
        setUpdateLoading(false)
        
      )
    }
    const trip_commencement_date = data.pickup_date;
    const trip_completion_date = data.delivery_date;

    
    
    let tripDetails = {...data, trip_commencement_date, trip_completion_date, package_type, trip_type, trip_area, trip_medium};
    //update trip status if date is selected
    trip_commencement_date 
    ? tripDetails = {...tripDetails, trip_status: 'Picked Up', trip_stage: 2} 
    : '' 
    
    trip_completion_date 
    ? tripDetails = {...tripDetails, trip_status: 'Delivered', trip_stage: 4} 
    : ''


    updateTrip({trip_id: selectedTripId, tripDetails})
    
    
  }
  if(data) {
    dispatch(resetDeliveryChoices())
    dispatch(resetMapData())
    dispatch(setTrackingOrder(true))
    dispatch(setEditingOrder(false))
  }

  return {formMethods, control, dispatch, handleCancel, handleSubmit, onDeliveryFormSubmit, packageTypeRef, trip_medium, trip_type, trip_area, package_type , updateLoading, isLoading, register}

  
}
