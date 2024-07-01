'use client'
import NewOrderForm from "@/components/Form/NewOrderForm";
import TripAreaMediumAndType from "../TrackOrder/Actions/TripAreaMediumAndType";
import { useNewOrderSubmit } from "@/components/Form/hooks/useNewOrderSubmit";  
import { useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";

export default function TripsDonut () {
  const {order_success} = useAppSelector(state=>state.newOrder)
  
 
  return (
    <section className='w-full flex flex-col items-start gap-3'>
      <span>WILL BE ADDED SOON</span>
        
    </section>
  );
};

