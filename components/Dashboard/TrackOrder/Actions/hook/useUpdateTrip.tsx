'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';


//redux + next + react + helper
import { useLazyAddTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { scrollToSection } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

//interface
import { NewOrderSchema, OrderDetails, UpdateOrderDetails, UpdateOrderSchema } from '@/components/Form/FormTypes';
import { setEditingOrder } from "@/lib/store/slice/dashboardSlice";
import { setTripMedium, setTripArea, setPackageType, setScheduled } from "@/lib/store/slice/deliveryChoicesSlice";
import { useEffect } from "react";
import { Trip } from '@/lib/store/tripSlice';
import {   useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";

export const useUpdateTrip = (trip:Trip)=> {


  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const packageTypeRef = useRef<any>(null);
  
  const  [updateTrip, { data, isLoading, error }] =   useUpdateTripMutation();
  
  const dispatch = useAppDispatch();
  const { trip_medium, trip_type, trip_area, package_type } = useAppSelector(state=>state.deliveryChoices);
  
  useEffect(()=> {
      dispatch(setPackageType(trip?.package_type))
      dispatch(setTripMedium(trip?.trip_medium))
      dispatch(setTripArea(trip?.trip_area))
      if(trip?.trip_type === "scheduled") {
          dispatch(setScheduled(true))
      }
  }, [trip?.package_type, trip?.trip_type])
  

  
  const handleCancel = ()=> {
    dispatch(setEditingOrder(false))
  }

  const formMethods = useForm<UpdateOrderDetails>({
    resolver: zodResolver(UpdateOrderSchema)
    });
    const {register, handleSubmit, control, formState: {errors}, setError,  } = formMethods;
    
  
  const onDeliveryFormSubmit: SubmitHandler<any> = async (data)=> {
    
  console.log({data})
    setUpdateLoading(true);

    if(!package_type) {
      scrollToSection(packageTypeRef)
      return (
        setUpdateLoading(false)
        
      )
    }
    const formDetails = {...data, package_type, control, trip_type, trip_area:trip_area, trip_medium};
    console.log({formDetails})
    // updateTrip(formDetails)
    
  }


  return {formMethods, control, dispatch, handleCancel, handleSubmit, onDeliveryFormSubmit, packageTypeRef, trip_medium, trip_type, trip_area, package_type , updateLoading, isLoading, register}

  
}
