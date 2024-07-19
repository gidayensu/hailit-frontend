'use client'


//react hook form
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';


//redux + next + react + helper
import { useAddTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { scrollToSection } from "@/lib/utils";

//hooks/custom hooks
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { usePathname } from 'next/navigation';
import { calculateDistanceAndCost } from '@/lib/calculateDistanceAndCost';
//interface

import { NewOrderSchema, OrderDetails } from '../FormTypes';
import {  resetMapData,  } from '@/lib/store/slice/mapSlice';
import { resetDeliveryChoices } from '@/lib/store/slice/deliveryChoicesSlice';

export const useNewOrderSubmit = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const packageTypeRef = useRef<any>(null);
  const paymentMethodRef = useRef<any>(null);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const path = usePathname();
  const {pickUpLocation, dropOffLocation} = useAppSelector(state=>state.map)
  const [pick_lat, pick_long] = pickUpLocation ?? [0, 0];
  const [drop_lat, drop_long] = dropOffLocation ?? [0, 0];
  

  //calculate distance

  const distanceAndCost =
    
    calculateDistanceAndCost({
      lat1: pick_lat,
      lon1: pick_long,
      lat2: drop_lat, 
      lon2: drop_long,
    });



  const {package_type, trip_type, trip_area, trip_medium, scheduled, payment_method } = useAppSelector(state=>state.deliveryChoices);
  const {  dropOffLocationName, pickUpLocationName } = useAppSelector(state=>state.map)

  const  [addTrip, { data, isLoading, error }] = useAddTripMutation();
 

  const formMethods = useForm<OrderDetails>({
    resolver: zodResolver(NewOrderSchema)
  });
  const {register, handleSubmit, formState: {errors}, setError } = formMethods;
  

  //submit form
  const onDeliveryFormSubmit: SubmitHandler<any> = async (data)=> {
    
  
    setLoading(true);

    if(!package_type || !payment_method) {
      !package_type? scrollToSection(packageTypeRef) : scrollToSection(paymentMethodRef)
      return (
        setLoading(false)
        
      )
    }
    let tripArea = trip_area;
    if(distanceAndCost && distanceAndCost?.distance > 100) {
      tripArea = "Inter City"
    }
    const trip_cost = distanceAndCost?.cost;
    
    const formDetails = {
      ...data,
      package_type,
      trip_area: tripArea,
      trip_type,
      trip_medium,
      trip_cost,
      payment_method,
      pick_lat,
      pick_long,
      drop_lat,
      drop_long
    };
    addTrip(formDetails)
    
  }
  if(data && !isLoading && !error) {
    
    const {trip} = data;
    dispatch(setNewOrder({
      order_success: true,
      trip_id: trip.trip_id,
      order_submitted: true,
      scheduled: false
    }))

    dispatch(resetDeliveryChoices())
    
    dispatch(resetMapData())
    
    
    
    //redirect based on where the form is being used
    !path.startsWith('/dashboard') ? router.push('/order/new/success') : ''
    
   
  }

  if (error) {
    dispatch(setNewOrder({
      order_success: false,
      trip_id: '',
      order_submitted: true,
      scheduled: false
    }))
    !path.startsWith('/dashboard') ? router.push('/order/new/failed'): ''
   
  }

  return {
    formMethods,
    handleSubmit,
    onDeliveryFormSubmit,
    packageTypeRef,
    package_type,
    payment_method,
    paymentMethodRef,
    pickUpLocationName,
    dropOffLocationName,
    loading,
    register,
    scheduled,
    data,
    error,
    distanceAndCost,
  };
}