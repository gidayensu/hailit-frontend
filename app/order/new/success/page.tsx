"use client";
import Lottie from "lottie-react";

//icons + ui
import { MdContentCopy, MdInfoOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import deliveryAnimation from "@/public/animations/success-animation.json";
import Loader from "@/components/Shared/Loader";

//main components 
import { resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";

//next+redux+helper function +react
import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { redirect } from "next/navigation";
import { copyToClipBoard } from "@/lib/utils";


export default function SuccessfulOrder() {
const [loading, setLoading]  = useState<boolean>(false);
const [copied, setCopied]  = useState<boolean>(false);
  const { trip_id, order_success } = useAppSelector(state=>state.newOrder)
  if(!order_success) {
    redirect('/order')
  }

  
  const dispatch = useAppDispatch();
  dispatch(
    resetDeliveryChoices())

    const handleCopyTripId = (tripId:string)=> {
      setCopied(true)
      setTimeout(()=> {
        setCopied(false)
      }, 1000)
      copyToClipBoard(tripId)
      
    }

    const handleLoading = ()=> {
      setLoading(true)
    }
  return (
    <main className="flex min-h-screen flex-col mt-16 items-center gap-4 mb-24 md:mb-0">
      <div className="flex flex-col items-center justify-center ml-6 gap-2 w-64">
        <span className="text-4xl font-bold text-green-500 text-center">Order Successful!</span>
        <p className=" text-center">
          A rider will soon be
          assigned to pickup your package
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          

        <p className=" text-center font-bold mb-2">
          Your Trip ID 
        </p>
        <div className="w-full flex items-center justify-center gap-4 cursor-pointer" onClick={()=>handleCopyTripId(trip_id)}>

        <p className={`text-sm text-center h-10 border p-2 border-green-500 ${copied ? 'bg-green-500 text-white scale-105' : 'scale-100'} w-2/4 rounded-md cursor-pointer  transition-all duration-200`


}>
           <b>{!copied ? trip_id : 'Copied!'} </b>
        </p>
        <span className="flex flex-col gap-2" >
        
        
        
        <MdContentCopy className="  text-xl hover:text-slate-600 dark:hover:text-slate-200"/>
        
        </span>
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          
          
        
        </div>
        </div>
      </div>
      <div className="w-72 ">
        <Lottie animationData={deliveryAnimation} />
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
      
        <Link href={`/track/${trip_id}`} onClick={handleLoading}>
          <Button className="border border-slate-300 h-14 w-60 flex gap-4" disabled={loading}>
            {loading? <Loader />:'Track your package'}
          </Button>
        </Link>
        <Link href="/">
          <Button
            className="border border-slate-300 h-14 w-60 flex gap-4"
            variant="outline"
          >
            Home Page
          </Button>
        </Link>
      </div>
    </main>
  );
}
