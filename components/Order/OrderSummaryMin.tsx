// This is UI with minimal detail such as trip id, trip request data, delivery state, cost, and package type. 
'use client'
import { IoDocumentText, IoShirt } from "react-icons/io5";
import { MdLineWeight } from "react-icons/md";

import {
  PiMonitorFill,
  PiPackageFill,
  PiWineFill,
} from "react-icons/pi";

import { useState } from "react";
import Loader from "../Shared/Loader";
import Container from "../ui/container";

export default function OrderSummaryMin({
  tripId,
  tripRequestDate,
  deliveryStatus,
  packageType,
  cost,
  className
}: {
  tripId: string,
  tripRequestDate: string | null,
  deliveryStatus: DeliveryStatus,
  packageType: PackageType | string,
  cost: string
  className?: string
}) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleOrderClicked = ()=> {
      setLoading(true);
      
    }
    //default icon gadgets
    let deliveryTypeIconBgClass = 'bg-blue-100';
    let deliveryTypeIcon = <PiPackageFill className="text-blue-400"/>;
    

    //setting other icon colors based on package type
   
    switch (packageType) {
      case("Electronics"): {
        deliveryTypeIcon = <PiMonitorFill className="text-teal-400 dark:text-teal-500"/> 
        deliveryTypeIconBgClass = "bg-teal-100 dark:bg-teal-200" 
    }
    break;
      case("Bulky Items"): {
        deliveryTypeIcon = <MdLineWeight className="text-violet-400  dark:text-violet-500"/> 
        deliveryTypeIconBgClass = "bg-violet-100 dark:bg-violet-200" 
    }
    break;
    case("Documents"): {
      deliveryTypeIcon = <IoDocumentText className="text-orange-400 dark:text-orange-500"/> 
      deliveryTypeIconBgClass = "bg-orange-100 dark:bg-orange-200" 
    }
    break;
    case("Clothes"): {
      deliveryTypeIcon = < IoShirt className="text-cyan-400 dark:text-cyan-500"/> 
      deliveryTypeIconBgClass = "bg-cyan-100 dark:bg-cyan-200"; 
    }
    break;
    case("Others"): {
      deliveryTypeIcon = < PiPackageFill className="text-amber-400 dark:text-amber-500"/> 
      deliveryTypeIconBgClass = "bg-amber-100 dark:bg-amber-200"; 
    }
    break;
    case("Fragile"): {
      deliveryTypeIcon = < PiWineFill className="text-secondary-tint dark:text-secondary-color"/> 
      deliveryTypeIconBgClass = "bg-rose-100 dark:bg-rose-200" 
    }
    
  }
  
  return (
    <div className="w-full cursor-pointer relative" onClick={handleOrderClicked}>
      {loading && 
      <div className="w-full items-center justify-center flex absolute mt-4">

        <Loader color="text-primary-color"/> 
      </div>
      }
      
      <Container className={`${className} flex  gap-3 justify-between  items-center h-16 rounded-xl p-2 ${loading ? 'opacity-20': ''}`}>
        <div className="flex gap-2">

          <span className={`flex justify-center items-center ${deliveryTypeIconBgClass} w-10 h-10 rounded-md text-2xl`}>
            {deliveryTypeIcon}
          </span>
          <span >
              <h3 className="ml-2 font-bold text-[13px]">{tripId}</h3>
            <p className="ml-2 text-[12px] text-slate-500">{tripRequestDate}</p>
          </span>
        </div>
          <div className="flex flex-col">
{/* different text color based on delivery status */}
          <span
            className={`text-[12px] font-bold   ${
              deliveryStatus === "Delivered"
              ? "  text-green-500"
                : deliveryStatus === "Picked Up"
                ? "  text-sky-600"
                : deliveryStatus === "In Transit"
                ? " text-amber-500 "
                : deliveryStatus === "Booked"
                ? " text-teal-600 dark:text-slate-50"
                : " text-red-500"
              }  h-5 w-20 rounded-md    `}
              >
            <p>{deliveryStatus}</p>
          </span>
          
            <p className="font-bold text-[13px]">GHS {cost}</p>
          
          </div>
        
      </Container>
    </div>
  );
}
  export type DeliveryStatus =
    | "Delivered"
    | "Cancelled"
    | "Picked Up"
    | "In Transit"
    | "Booked"
    |  "Yet to Book";
  
  export type PackageType = | "Electronics"
  | "Food"
  | "Fragile"
  | "Clothes"
  | "Documents"
  | "Bulky Items"
  | "Others";
