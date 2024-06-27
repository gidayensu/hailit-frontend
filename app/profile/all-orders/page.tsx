'use client'
import OrderHistory from "@/components/Order/OrderHistory";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";

export default function AllOrders () {
    //redirect users who are not customers
  const {user_role} = useAppSelector(state=>state.user);
  user_role && user_role !== "customer" ? redirect('/profile') : ''
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="">
          <span className="text-5xl font-bold ">Your Deliveries</span>
          <p className="text-lg">Current and Previous Deliveries</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] mb-20">
      
        <div className="flex flex-col items-center justify-center w-full mt-4 rounded-2xl gap-2">
            
            <OrderHistory/>       
            </div>
          </MiddleSectionContainer>
          </main>
    )
}