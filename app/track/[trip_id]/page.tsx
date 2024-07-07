'use client'
import TrackOrderDetails from "@/components/Order/TrackOrder/TrackOrderDetails";
import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";

export default function TrackDelivery() { 
  //redirect users who are not customers
  const {user_role} = useAppSelector(state=>state.user);
  user_role && user_role !== "Customer" ? redirect('/profile') : ''
  return (
    <TrackOrderDetails />  );
}
