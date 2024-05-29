"use client";
import Link from "next/link";
import Lottie from "lottie-react";

import deliveryAnimation from "@/public/animations/success-animation.json";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";
import { redirect } from "next/navigation";

export default function SuccessfulOrder() {
  
  const { trip_id, order_success } = useAppSelector(state=>state.newOrder)
  if(!order_success) {
    redirect('/order')
  }

  
  const dispatch = useAppDispatch();
  dispatch(
    resetDeliveryChoices({
      trip_type: "",
      trip_medium: "",
      destination_city: "",
      package_type: "",
      scheduled: false,
    }))
  return (
    <main className="flex min-h-screen flex-col mt-16 items-center gap-4">
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
        <p className="text-sm text-center h-10 border p-2 border-blue-500 w-2/4 rounded-md ">
           <b>{trip_id} </b>
        </p>
        </div>
      </div>
      <div className="w-72 ">
        <Lottie animationData={deliveryAnimation} />
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
      
        <Link href={`/track/${trip_id}`}>
          <Button className="border border-slate-300 h-14 w-60 flex gap-4">
            Track your package
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
