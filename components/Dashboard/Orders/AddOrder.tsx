'use client'
import NewOrderForm from "@/components/Form/NewOrderForm";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import TripAreaMediumAndType from "../TrackOrder/Actions/TripAreaMediumAndType";
import AddOrderOutcome from "./AddOrderOutcome";

export default function AddOrder () {
const router = useRouter();  

  const {order_submitted} = useAppSelector(state=>state.newOrder)
  
 
  return (
    <section className='md:w-1/4 flex flex-col items-start gap-3'>
      
      {
        !order_submitted && 
        <>
      <TripAreaMediumAndType/>
      <NewOrderForm/>
      <Button variant={'outline'} onClick={()=>router.back()} className="w-full max-w-sm h-14 ">
        Cancel
      </Button>
        </>
      }

      {
        order_submitted && <AddOrderOutcome/>
      }
        
    </section>
  );
};

