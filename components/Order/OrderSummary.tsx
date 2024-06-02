"use client";
import { extractDateWithDayFromDate, extractTimeFromDate } from "@/lib/utils";
import { HiLocationMarker } from "react-icons/hi";
import Container from "@/components/ui/container";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type DeliveryStatus =
  
  | "DELIVERED"
  | "BOOKED"
  | "PICKED UP"
  | "IN TRANSIT"
  | "DELIVERED"
  
type DeliveryType = 
  | "TODAY"
  | "TOMORROW" 
  | "SCHEDULED"

export default function OrderSummary({ trip }: { trip:any }) {
  const { trip_request_date, trip_commencement_date, trip_completion_date } =
  trip;
  const tripRequestDate = extractDateWithDayFromDate(trip_request_date) || 'TBD';
  const tripCommencementDate = extractDateWithDayFromDate(
    trip_commencement_date
  ) || 'TBD';
  const tripCompletionDate = extractDateWithDayFromDate(trip_completion_date) || 'TBD';
  const tripCommencementTime = extractTimeFromDate(trip_commencement_date) || 'TBD';
const tripCompletionTime = extractTimeFromDate(trip_completion_date) || 'TBD';
  const path = usePathname();
  return (
    <>
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
        <div className="flex justify-between items-center -mt-1">
          
          <div className="flex flex-col items-start">
            {path.startsWith('/dispatcher')  &&
            <>
            <p className="text-[12px] text-slate-500">Order ID</p>
            <h3 className="font-bold text-[14px] ">{trip.trip_id}</h3>
            </>
            }

          {(path.startsWith('/track') || path.startsWith('/dashboard')) &&
            <>
            <p className="text-sm text-slate-500">ACCRA</p>
            
            </>
            }

          </div>
        {path.startsWith('/dispatcher') &&
          <div
            className={`flex justify-center items-center text-[12px] font-medium w-20  ${
              trip.trip_status === "BOOKED"
                ? "  bg-primary-color text-white"
                : trip.trip_status === "PICKED UP"
                ? "  bg-teal-500 text-white"
                : trip.trip_status === "IN TRANSIT"
                ? " bg-amber-500 dark:text-secondary-dark"
                : trip.trip_status === "DELIVERED"
                ? " bg-green-500 dark:text-secondary-dark"
                : " bg-red-500 text-white"
            }  h-6 w-24 rounded-md`}
          >
            <p>{trip.trip_status}</p>
          </div>
          
          }
          <div
            className={`flex justify-center items-center text-sm font-bold w-20 -ml-12   ${
              trip.trip_type === "TODAY"
                ? "  text-primary-color"
                : trip.trip_type === "TOMORROW"
                ? "  text-teal-500 "
                : trip.trip_type === "SCHEDULED"
                ? "text-amber-600 dark:text-amber-500 "
                : " text-green-500"
            }  h-6 w-24 rounded-md`}
          >
            <p>{trip.trip_type.toUpperCase()}</p>
          </div>
          
        </div>
          <Separator className="mb-2 dark:bg-slate-100 dark:opacity-10"/>
          <div className="h-full flex  justify-between">
{/* Location */}
        <div className="flex flex-col justify-start h-full">
          <span className="flex items-start  gap-2 -ml-2">
            <HiLocationMarker className="text-xl" />
            <span className="flex flex-col">
                <p className="text-sm font-semibold">Pickup Point</p>
                <p className="text-sm ">{trip.pickup_location}</p>
              
              
            </span>
          </span>

          <Separator
            orientation="vertical"
            className="bg-slate-800 h-1/3 dark:bg-slate-100 -mt-4 mb-1"
          />
          <span className="flex items-start gap-2 -ml-[9px]">
            <HiLocationMarker className="text-xl text-green-500" />
            <span className="flex flex-col">
                <p className="font-bold text-sm">Delivery Point</p>
                <p className="text-sm ">{trip.drop_off_location}</p>
              
            </span>
          </span>
        </div>
        {/* Order date and time */}
        <div className="flex flex-col justify-start h-full gap-2">
          <span className="flex items-start  gap-2 -ml-2">
            
            <span className="flex gap-2">
              <span className="space-y-1">
                <p className="text-sm font-semibold">Pickup date</p>
                <p className="text-sm">{tripCommencementDate} <br /> ({tripCommencementTime})</p>
              </span>
              
            </span>
          </span>

          
          <span className="flex items-start gap-2 -ml-[9px]">
          
            <span className="flex gap-2">
              <span>
              <p className="text-sm font-semibold">Delivery date</p>
                <p className="text-sm ">{tripCompletionDate} <br /> ({tripCompletionTime})</p>
              </span>
              
            </span>
          </span>
        </div>
          </div>
    </>
  );
}
