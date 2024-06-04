'use client'
import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import { useState } from "react";
import type { Deliveries } from "@/app/page";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import OrderHistory from "@/components/Order/OrderHistory";

export default function AllOrders () {
    
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="">
          <span className="text-5xl font-bold ">Your Deliveries</span>
          <p className="text-lg">Current and Previous Deliveries</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10 mb-20">
      
        <div className="flex flex-col w-5/6 mt-4 rounded-2xl gap-2">
            <h2 className="font-bold text-xl"> Your Deliveries</h2>
            <OrderHistory/>       
            </div>
          </MiddleSectionContainer>
          </main>
    )
}