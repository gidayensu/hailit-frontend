import { IoArchive, IoFastFood } from "react-icons/io5";
import {
  PiMonitorFill,
  PiPackageFill,
  PiWineFill,
} from "react-icons/pi";

import Container from "../ui/container";

export default function OrderSummaryMin({
  tripId,
  tripRequestDate,
  deliveryStatus,
  packageType,
  cost
}: {
  tripId: string,
  tripRequestDate: string | null,
  deliveryStatus: DeliveryStatus,
  packageType: PackageType | string,
  cost: string
}) {

    //default icon gadgets
    let deliveryTypeIconBgClass = 'bg-blue-100';
    let deliveryTypeIcon = <PiPackageFill className="text-blue-400"/>;
    

    //setting other icon colors
   const deliveryIcon = ''
    switch (packageType) {
      case("Electronics"): {
        deliveryTypeIcon = <PiMonitorFill className="text-teal-400 dark:text-teal-500"/> 
        deliveryTypeIconBgClass = "bg-teal-100 dark:bg-teal-200" 
    }
    break;
    case("Food"): {
      deliveryTypeIcon = <IoFastFood className="text-orange-400 dark:text-orange-500"/> 
      deliveryTypeIconBgClass = "bg-orange-100 dark:bg-orange-200" 
    }
    break;
    case("Others"): {
      deliveryTypeIcon = < IoArchive className="text-amber-400 dark:text-amber-500"/> 
      deliveryTypeIconBgClass = "bg-amber-100 dark:bg-amber-200"; 
    }
    break;
    case("Fragile"): {
      deliveryTypeIcon = < PiWineFill className="text-secondary-tint dark:text-secondary-color"/> 
      deliveryTypeIconBgClass = "bg-rose-100 dark:bg-rose-200" 
    }
    
  }
  
  return (
    <div className="w-full cursor-pointer">
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
      <Container className="flex  gap-3 justify-between   h-16 rounded-xl p-2">
        <div className="flex gap-2">

          <span className={`flex justify-center items-center ${deliveryTypeIconBgClass} w-10 h-10 rounded-md text-2xl`}>
            {deliveryTypeIcon}
          </span>
          <span >
              <h3 className="ml-2 font-bold text-s">{tripId}</h3>
            <p className="ml-2 text-[12px] text-slate-500">{tripRequestDate}</p>
          </span>
        </div>
          <div className="flex flex-col">

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
          
            <p className="font-bold">GHS {cost}</p>
          
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
