'use client'


//react hook form
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';


//redux + next + react + helper
import { useAddTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { scrollToSection } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { usePathname } from 'next/navigation';

//interface

import { NewOrderSchema, OrderDetails } from '../FormTypes';

export const useNewOrderSubmit = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const packageTypeRef = useRef<any>(null);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const path = usePathname();
  
  const {package_type, trip_type, trip_area, trip_medium, scheduled } = useAppSelector(state=>state.deliveryChoices);
  const {  dropOffLocationName, pickUpLocationName } = useAppSelector(state=>state.map)

  const  [addTrip, { data, isLoading, error }] = useAddTripMutation();
 

  const formMethods = useForm<OrderDetails>({
    resolver: zodResolver(NewOrderSchema)
  });
  const {register, handleSubmit, formState: {errors}, setError } = formMethods;
  
  
  const onDeliveryFormSubmit: SubmitHandler<any> = async (data)=> {
    
  
    setLoading(true);

    if(!package_type) {
      scrollToSection(packageTypeRef)
      return (
        setLoading(false)
        
      )
    }
    
    const formDetails = {...data, package_type, trip_area, trip_type, trip_medium};
    addTrip(formDetails)
    
  }
  if(data && !isLoading && !error) {
    const {trip} = data;
    dispatch(setNewOrder({
      order_success: true,
      trip_id: trip.trip_id,
      scheduled: false
    }))
    //redirect based on where the form is being used
    !path.startsWith('/dashboard') ? router.push('/order/new/success') : ''
   
  }

  if (error) {
    dispatch(setNewOrder({
      order_success: false,
      trip_id: '',
      scheduled: false
    }))
    !path.startsWith('/dashboard') ? router.push('/order/new/failed'): ''
   
  }

  return {formMethods, handleSubmit, onDeliveryFormSubmit, packageTypeRef, package_type, pickUpLocationName, dropOffLocationName, loading, register, scheduled, data, error}
}