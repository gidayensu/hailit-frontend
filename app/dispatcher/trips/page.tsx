"use client";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import OrderHistory from "@/components/Order/OrderHistory";
import { redirect } from "next/navigation";
import TripsStats from "@/components/Dispatcher/TripsStats";
import DispatcherOrderHistory from "@/components/Dispatcher/DispatcherOrderHistory";
export default function Dispatcher() {
  const { user_role, trips } = useGetDispatcher();

  if (user_role === "Customer" || user_role === "Admin" || !user_role) {
    redirect('/profile') 
}

  return (
    <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex-col flex items-center justify-center p-8">

                <TripsStats/>      
          </div>
                <div className="md:w-4/6 flex items-center justify-center">

                <DispatcherOrderHistory />
                </div>
        
    </div>
  );
}
