"use client";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import TripsStats from "@/components/Dispatcher/TripsStats";
import OrderHistory from "@/components/Order/OrderHistory";
import { redirect } from "next/navigation";

export default function Dispatcher() {
  const { user_role } = useGetDispatcher();

  if (user_role === "Customer" || user_role === "Admin" || !user_role) {
    redirect("/authentication");
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex-col flex items-center justify-center p-8">
        <TripsStats />
      </div>
      <div className="md:w-4/6 w-full flex items-center justify-center mb-20 md:mb-0">
        <OrderHistory />
      </div>
    </div>
  );
}
