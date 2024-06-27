"use client";

//icons + ui
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';
import { MdContentCopy, } from "react-icons/md";
//main components 
import { resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";

//next+redux+helper function +react
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { copyToClipBoard } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useState } from "react";


export default function AddTripOutcome() {
const [loading, setLoading]  = useState<boolean>(false);
  const { trip_id, order_success } = useAppSelector(state=>state.newOrder)
  

  
  const dispatch = useAppDispatch();
  dispatch(
    resetDeliveryChoices())

    const handleCopyTripId = (tripId:string)=> {
      copyToClipBoard(tripId)
      toast.success(
      
        <p className=" text-[13px]">

          Trip ID: <b>  {tripId} </b> copied 
        </p>
      
        )
    }

    const handleLoading = ()=> {
      setLoading(true)
    }
  return (
    <main className="flex min-h-screen flex-col mt-16 items-center gap-4 mb-24 md:mb-0">
        {
            order_success && 
            <>
      <div className="flex flex-col items-center justify-center ml-6 gap-2 w-64">
        <span className="text-4xl font-bold text-green-500 text-center">Order Successful!</span>
        <p className=" text-center">
          
          Assign a rider to pickup to pickup the package
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          
        <p className=" text-center font-bold mb-2">
          Trip ID 
        </p>
        <div className="w-full flex items-center justify-center gap-4 cursor-pointer" onClick={()=>handleCopyTripId(trip_id)}>

        <p className="text-sm text-center h-10 border p-2 border-green-500 w-2/4 rounded-md cursor-pointer">
           <b>{trip_id} </b>
        </p>
        <span className="flex flex-col gap-2" >
        
        
        
        <MdContentCopy className="  text-xl hover:text-slate-600 dark:hover:text-slate-200"/>
        <Toaster/>
        </span>
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          
          
        <p className=" text-center font-semibold text-[12px] w-3/4 h-5 text-white bg-green-500 ">
          Copy Trip ID for tracking 
        </p>
        </div>
        </div>
      </div>
      

      <div className="flex flex-col gap-5 justify-center items-center">
      
        
          <Button className="border border-slate-300 h-14 w-60 flex gap-4" disabled={loading} onClick={handleLoading}>
            {loading? <Loader />:'Track your package'}
          </Button>
        
        
      </div>
            </>
        }
    </main>
  );
}
