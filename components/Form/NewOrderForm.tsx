'use client'
//ui + icons
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Loader from "../Shared/Loader";

//react hook form
import {useForm, SubmitHandler} from 'react-hook-form';

//main components
import DeliveryChoicesBreadcrumb from "../Order/NewDelivery/DeliveryChoicesBreadcrumb";
import { createNewTrip } from "./FormSubmission";
import PackageTypes from "../Order/NewDelivery/PackageTypes";

//redux + next + react
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { setNewTripSuccess } from "@/lib/store/slice/formSlice";

import { setTrackedOrder } from "@/lib/store/slice/trackOrderSlice";

interface DeliveryDetails {
  
    pickup_location: string,
    drop_off_location: string,
    sender_number: string,     
    recipient_number: string,
    package_value: number,
    additional_information: string
}

export default function NewOrderForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {package_type, trip_type, trip_medium, scheduled } = useAppSelector(state=>state.deliveryChoices);
  
  const {register, handleSubmit } = useForm<DeliveryDetails>();
  
  
  const onDeliveryFormSubmit: SubmitHandler<DeliveryDetails> = async (data)=> {
    setIsLoading(true);
    if(!package_type) {
      return (
      setIsLoading(false)
      )
    }
    const formDetails = {...data, package_type, trip_type, trip_medium};
    const newTrip = await createNewTrip(formDetails);

    if (newTrip.error) {
      dispatch(
        setNewTripSuccess(false)
      )
      setIsLoading(false)
      return router.push('/order/new/failed')
    }

    
    dispatch(
      setNewTripSuccess(true)
    )
    console.log('newTrip:', newTrip)
    dispatch (
      setTrackedOrder({
        trip_id: newTrip.trip.trip_id,
        trip_medium: newTrip.trip.trip_medium,
        package_type: newTrip.trip.package_type,
        additional_information: newTrip.trip.additional_information,
        drop_off_location:  newTrip.trip.drop_off_location,
        package_value: newTrip.trip.package_value,
        pickup_location: newTrip.trip.pickup_location,
        recipient_number: newTrip.trip.recipient_number,
        scheduled: scheduled,
        sender_number: newTrip.trip.sender_number,
        trip_type: newTrip.trip.trip_type  

      })
    )
    router.push('/order/new/success')
  }
  return (
    <form className="flex flex-col gap-4 md:justify-center md:items-center" onSubmit={handleSubmit(onDeliveryFormSubmit)}>
      <div className=" grid w-full max-w-sm items-center gap-1.5 ">
        <span className="flex items-start justify-start">
          <h3 className=" text-[14px] font-bold ">Delivery Area and Medium</h3>
        </span>
        
        <DeliveryChoicesBreadcrumb/>
      </div>
      <div className=" grid w-full max-w-sm items-center gap-1.5 ">
        <span className="flex items-start justify-start">
          <h3 className=" text-[14px] font-bold ">Package Type</h3>
        </span>
        <div className=" flex gap-[8px] -mb-5 flex-wrap">
          <PackageTypes />

          
        </div>
      </div>

      <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Pickup Location</h3>
        <Input
          type="text"
          placeholder="Enter location for pickup"
          className="h-14"
          {...register("pickup_location")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Destination / Drop off</h3>
        <Input
          type="text"
          placeholder="Enter location for drop off"
          className="h-14"
          {...register("drop_off_location")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Sender Number</h3>
        <Input
          type="text"
          placeholder="Enter number of sender"
          className="h-14"
          {...register("sender_number")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Recipient Number</h3>
        <Input
          type="text"
          placeholder="Enter number of recipient"
          className="h-14"
          {...register("recipient_number")} required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Package value (GHS)</h3>
        <Input
          type="number"
          placeholder="Enter number of recipient"
          className="h-14"
          {...register("package_value")} required
        />
      </div>
      {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">
          Upload Product Image (optional)
        </h3>
        <Input id="picture" type="file" />
      </div> */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">Additional Information</h3>
        <Textarea className="h-32" {...register("additional_information")} required/>
        {
          !package_type && <span className="text-rose-500 text-center">
            <p>Package type not selected</p>
          </span>
        }
        {!isLoading &&
          <Button type="submit" className="w-full h-14" >
          Book
        
        </Button>
        }
        
        { isLoading &&
        <Button type="submit" className="w-full h-14 cursor-not-allowed" disabled>
          <Loader color="red"/>

        </Button>}
      </div>
    </form>
  );
}

