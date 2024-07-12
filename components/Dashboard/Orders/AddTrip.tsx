'use client'
import NewOrderForm from "@/components/Form/NewOrderForm";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { FiArrowLeft } from "react-icons/fi";
import TripAreaMediumAndType from "../TrackOrder/Actions/TripAreaMediumAndType";
import AddTripOutcome from "./AddTripOutcome";

export default function AddTrip ({setAddTrip}:{setAddTrip: ()=>void}) {
  

  const {order_submitted} = useAppSelector(state=>state.newOrder)
  
 
  return (
    <section className='md:w-1/4 flex flex-col items-start gap-3'>
      <Button onClick={setAddTrip} variant={'outline'}>
        <FiArrowLeft/>
      </Button>
      {
        !order_submitted && 
        <>
      <TripAreaMediumAndType/>
      <NewOrderForm/>
      <Button variant={'outline'} onClick={setAddTrip} className="w-full max-w-sm h-14 ">
        Cancel
      </Button>
        </>
      }

      {
        order_submitted && <AddTripOutcome/>
      }
        
    </section>
  );
};

