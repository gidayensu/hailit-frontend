"use client";
import { Separator } from "@/components/ui/separator";
import { extractDateWithDayFromDate, extractTimeFromDate } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { HiLocationMarker } from "react-icons/hi";
import { useAppSelector } from "@/lib/store/hooks";


export default function OrderSummary({ trip }: { trip:any }) {
  const { tripCommencementDate, tripCompletionDate, tripCompletionTime, tripCommencementTime} = tripDates(trip);
  
  const path = usePathname();
  return (
    <>
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
        <div className="flex justify-between items-center -mt-1 ">
          
          <div className="flex flex-col items-start">
            {path ==='/dispatcher'  &&
            <>
            <p className="text-[12px] text-slate-500">Order ID</p>
            <h3 className="font-bold text-[14px] ">{trip.trip_id}</h3>
            </>
            }

          {(path.startsWith('/track') || path.startsWith('/dashboard')) &&
            <>
            <p className="text-sm text-slate-500">{trip.trip_area.toUpperCase()}</p>
            
            </>
            }

          </div>
        {/* {path.startsWith('/dispatcher') &&
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
          
          } */}
          <div
            className={`flex justify-center items-center  mr-7 text-sm font-bold w-20   ${
              trip.trip_type === "SAME DAY"
                ? "  text-primary-color"
                : trip.trip_type === "NEXT DAY"
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
          <div className=" flex  justify-between">
{/* Location */}
<div className="xl:ml-4 flex xl:grid xl:grid-cols-9 grid-rows-7 h-32  w-full justify-between items-start ">
  
  <section className="col-span-4 row-span-7 flex items-start h-full w-full ">
          <div className="flex justify-between flex-col h-4/5 w-full ">

          <div className="flex items-start  gap-2 md:-ml-1 w-full ">
            <div className="flex flex-col xl:w-44 w-full">
                <span className="flex -ml-5 ">
                <HiLocationMarker className="text-xl text-green-500" />
                <p className="text-sm font-semibold">Pickup Point</p>
                </span>
                <span className="flex gap-3 ">
                <Separator
            orientation="vertical"
            className="bg-slate-800 md:h-10 h-6 dark:bg-slate-100  mt-3 row-span-3 -ml-3"
          />
                <p className="text-sm  lg:w-40   ">{trip.pickup_location}</p>
                </span>
                
                
            </div>
          </div>

          <span className="flex items-start gap-2 md:-ml-1 mt-1 w-full">
            <span className="flex flex-col w-full xl:w-44">
            <span className="flex -ml-5 ">
                <HiLocationMarker className="text-xl text-green-500" />
                <p className="text-sm font-semibold">Delivery Point</p>
                </span>
                <p className="text-sm  lg:w-40 xl:line-clamp-3">{trip.drop_off_location}</p>
              
            </span>
          </span>
          </div>
        </  section>
        
        <section className="col-span-4 row-span-7 flex flex-col  items-start h-full mt-5 w-44 xl:mt-0 ml-4 md:ml-9 ">
          <div className="flex flex-col items-start  -ml-1">
            
                <p className="text-sm font-semibold">Pickup date</p>
                <p className="text-sm ">{tripCommencementDate} <br /> ({tripCommencementTime})</p>
            <div className="">
              
              
            </div>
          </div>

          
          <div className="flex flex-col xl:mt-3 items-start mt-2  -ml-1">
          
              <p className="text-sm font-semibold">Delivery date</p>
                <p className="text-sm ">{tripCompletionDate} <br /> ({tripCompletionTime})</p>
            
          </div>
        </section>
</div>
        {/* <section className="flex  justify-start -mt-4 gap-3">
          <div className="flex justify-between flex-col mt-4 mb-3 ">

          <span className="flex items-start  gap-2 -ml-1">
            <span className="flex flex-col w-44">
                <p className="text-sm font-semibold">Pickup Point</p>
                <p className="text-sm text-wrap truncate line-clamp-2 ">{trip.pickup_location}</p>
              
              
            </span>
          </span>

          <span className="flex items-start gap-2 -ml-[9px] mt-2">
            <span className="flex flex-col w-44">
                <p className="font-bold text-sm">Delivery Point</p>
                <p className="text-sm text-wrap truncate line-clamp-2">{trip.drop_off_location}</p>
              
            </span>
          </span>
          </div>
        </  section>   */}
        {/* Order date and time */}
        <section className="flex flex-col justify-start h-full gap-2 ">
          {/* <div className="flex items-start  gap-2 -ml-1">
            
            <div className="flex gap-2">
              <span className="space-y-1">
                <p className="text-sm font-semibold">Pickup date</p>
                <p className="text-sm ">{tripCommencementDate} <br /> ({tripCommencementTime})</p>
              </span>
              
            </div>
          </div> */}

          
          {/* <div className="flex items-start gap-2 -ml-[9px]">
          
            <div className="flex gap-2">
              <span>
              <p className="text-sm font-semibold">Delivery date</p>
                <p className="text-sm ">{tripCompletionDate} <br /> ({tripCompletionTime})</p>
              </span>
              
            </div>
          </div> */}
        </section>
          </div>
    </>
  );
}

const tripDates = (trip:any)=> {
  const { trip_request_date, trip_commencement_date, trip_completion_date } =  trip;
  const tripRequestDate = extractDateWithDayFromDate(trip_request_date) || 'TBD';
  const tripCommencementDate = extractDateWithDayFromDate(trip_commencement_date ) || 'TBD';
  const tripCompletionDate = extractDateWithDayFromDate(trip_completion_date) || 'TBD';
  const tripCommencementTime = extractTimeFromDate(trip_commencement_date) || 'TBD';
  const tripCompletionTime = extractTimeFromDate(trip_completion_date) || 'TBD';

return {tripRequestDate, tripCommencementDate, tripCompletionDate, tripCompletionTime, tripCommencementTime}
}