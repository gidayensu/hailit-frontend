'use client'
import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import { useState } from "react";
import type { Deliveries } from "@/app/page";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";

export default function AllOrders () {
    
  const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);

  const handleSelectedDeliveries = (status: boolean) => {
    setCurrentDeliveries(status);
  };
  
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="">
          <span className="text-5xl font-bold ">Your Deliveries</span>
          <p className="text-lg">Current and Previous Deliveries</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10 mb-20">
      
        <div className="flex flex-col w-5/6 mt-4 rounded-2xl gap-2">
            <h2 className="font-bold text-xl"> Your Deliveries</h2>
            <div className="flex justify-between items-center w-full h-10 bg-white dark:bg-secondary-dark border border-primary-color   rounded-xl p-2 gap-3 text-[13px] mb-4">
              <span
                className={`flex items-center justify-center ${
                  currentDeliveries
                    ? "bg-primary-color text-white"
                    : " dark:bg-secondary-dark dark:opacity-50"
                }  text-primary-color dark:text-slate-100 w-1/2 h-8 -ml-1 text-center rounded-lg`}
                onClick={() => handleSelectedDeliveries(true)}
              >
                Current
              </span>
              <span
                className={`flex items-center justify-center ${
                  currentDeliveries
                    ? " dark:bg-secondary-dark dark:opacity-50"
                    : "text-white bg-primary-color"
                } text-primary-color dark:text-slate-100 w-1/2 h-8 -mr-1 text-center rounded-lg`}
                onClick={() => handleSelectedDeliveries(false)}
              >
                Previous
              </span>
            </div>

            {currentDeliveries && (
              <>
                <OrderSummaryMin deliveryStatus="Booked" packageType="Electronics" cost={'GHS40'} tripId="325" tripRequestDate={'Mon, 24 May, 2024'}/>
                <OrderSummaryMin deliveryStatus="Picked up" packageType="Parcel"cost={'GHS40'} tripId="325" tripRequestDate={'Mon, 24 May, 2024'}/>

                <OrderSummaryMin deliveryStatus="In Transit" packageType="Others" cost={'GHS40'} tripId="325" tripRequestDate={'Mon, 24 May, 2024'}/>
              </>
            )}
            {!currentDeliveries && (
              <>
                <OrderSummaryMin deliveryStatus="Delivered" packageType="Food" cost={'GHS40'} tripId="325" tripRequestDate={'Mon, 24 May, 2024'}/>
                <OrderSummaryMin deliveryStatus="Cancelled" packageType="Fragile" cost={'GHS40'} tripId="325" tripRequestDate={'Mon, 24 May, 2024'}/>
                <OrderSummaryMin deliveryStatus="Delivered" packageType="Others" cost={'GHS40'} tripId="325" tripRequestDate={'Mon, 24 May, 2024'}/>
                <OrderSummaryMin deliveryStatus="Delivered" packageType="Parcel" cost={'GHS40'} tripId="325" tripRequestDate={'Mon, 24 May, 2024'}/>
              </>
            )}
          </div>
          </MiddleSectionContainer>
          </main>
    )
}