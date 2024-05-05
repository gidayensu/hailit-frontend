"use client";
import Link from "next/link";
import { MdOutlineLocationOn } from "react-icons/md";


type DeliveryStatus =  'Delivered' | 'Cancelled' | 'Picked up' | 'Delivering' | 'Booked'

export default function OrderSummaryLessDetail ({deliveryStatus}:{deliveryStatus : DeliveryStatus}) {
  

    return(
    <Link href='/track/s' className="w-full">
        {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
        <div className="flex flex-col gap-1 bg-white border border-slate-300 dark:border-opacity-20 h-16 rounded-xl p-2 dark:bg-[#1e1e1e]">
        <div className="flex justify-between">
          <h3 className="font-bold text-s">Bag of rice</h3>
          <span className={`flex justify-center items-center text-[11px] font-bold  ${deliveryStatus === 'Delivered' ? 'bg-green-700  text-green-400' : deliveryStatus === 'Picked up' ? 'bg-sky-700  text-sky-300' : deliveryStatus === 'Delivering'?  'bg-amber-600 text-amber-200 ': deliveryStatus === 'Booked' ? 'bg-slate-600 text-slate-200 dark:bg-white dark:text-[#1e1e1e]': 'bg-red-600 text-red-200'}  h-6 w-20 rounded-full   `}>
            
            <p>{deliveryStatus}</p>
            
          </span>
        </div>

        <div className="flex flex-col items-start h-full gap-1">
                  
          <span className="flex items-center">
            
            <p className="text-[12px]">Ama Saman Station</p>
          </span>
        </div>
          
      </div>
      </Link>
    )
}