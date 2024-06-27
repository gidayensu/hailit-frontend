'use client'
import NewOrderForm from "@/components/Form/NewOrderForm";
import TripAreaMediumAndType from "../TrackOrder/Actions/TripAreaMediumAndType";
import AddTripOutcome from "./AddTripOutcome";
import { useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";

export default function AddTrip () {
  const [orderSubmitted, setOrderSubmitted]  = useState<boolean>(false);

  const {order_success} = useAppSelector(state=>state.newOrder)
  if(order_success) {
    setOrderSubmitted(true);
  }
 
  return (
    <section className='w-full flex flex-col items-start gap-3'>
      {
        !orderSubmitted && 
        <>
      <TripAreaMediumAndType/>
      <NewOrderForm/>
        </>
      }

      {
        orderSubmitted && <AddTripOutcome/>
      }
        
    </section>
  );
};

