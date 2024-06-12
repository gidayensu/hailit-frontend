"use client";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import OrderHistory from "@/components/Order/OrderHistory";
import { redirect } from "next/navigation";
import TripsStats from "@/components/Dispatcher/TripsStats";
import DispatcherOrderHistory from "@/components/Dispatcher/DispatcherOrderHistory";
export default function Dispatcher() {
  const { user_role, trips } = useGetDispatcher();

  if (user_role === "customer" || user_role === "admin" || !user_role) {
    redirect('/profile') 
}

  return (
    <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-center p-8">

                <TripsStats/>      
          </div>
                <DispatcherOrderHistory />
        
    </div>
  );
}
