"use client";
import { Separator } from "@/components/ui/separator";
import { extractDateWithDayFromDate, extractTimeFromDate, extractShortDate } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { HiLocationMarker } from "react-icons/hi";
import { useAppSelector } from "@/lib/store/hooks";
import { Trip } from "@/lib/store/slice/tripSlice";

export default function OrderSummary({ trip }: { trip:Trip }) {
  const { tripCommencementDate, tripCompletionDate, tripCompletionTime, tripCommencementTime} = tripDates(trip);
  
  const path = usePathname();
  const tripStatus = trip?.trip_status.toUpperCase();
  return (
    <>
      {/* <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4 dark:bg-transparent"> */}
      <section className="flex justify-between items-center -mt-1 ">
        <div className="flex flex-col justify-center items-center p-2 h-12">
          {path === "/dispatcher" && (
            <>
              
              <h3 className="font-bold text-[14px] ">#{trip.trip_id}</h3>
            </>
          )}

          {(path.startsWith("/track") || path.startsWith("/dashboard")) && (
            <>
              <p className="text-sm text-slate-500">
                {trip.trip_area.toUpperCase()}
              </p>
            </>
          )}
        </div>
        {path === '/dispatcher' &&
        <>
        
        <div
          className={`flex justify-center items-center font-semibold text-sm  w-20  ${
            trip?.trip_status === "Booked"
              ? "  text-primary-color"
              : trip?.trip_status === "Picked Up"
              ? "  text-teal-500"
              : trip?.trip_status === "In Transit"
              ? " text-amber-500 "
              : trip?.trip_status === "Delivered"
              ? " text-green-500 "
              : " text-red-500 "
          }  h-6 w-24 rounded-md`}
        >
          <p>{trip?.trip_status} </p>
        </div>
      
        <p>|</p>
        </>
          }
        <div
          className={`flex justify-center items-center  mr-7 text-sm font-bold w-20   ${
            trip.trip_type === "Same Day"
              ? "  text-primary-color"
              : trip.trip_type === "Next Day"
              ? "  text-teal-500 "
              : trip.trip_type === "Scheduled"
              ? "text-amber-600 dark:text-amber-500 "
              : " text-green-500"
          }  h-6 w-24 rounded-md`}
        >
          <p>{trip.trip_type}</p>
        </div>
      </section>
      <Separator className="mb-2 dark:bg-slate-100 dark:opacity-10" />

      {/* Location */}
      <div className="flex gap-2 w-full p-1  items-start ">
        <section className="w-full ">
          <div className="flex flex-col gap-10 justify-between">
            <div className="w-full">
              <div className="w-full grid grid-cols-5 md:grid-cols-9 justify-between ">
                <div className="grid grid-cols-8 sm:flex items-start gap-1 w-full  md:col-span-7 col-span-3 ">
                  <HiLocationMarker className="col-span-1 text-xl text-amber-500" />
                  <span className="flex flex-col col-span-7 ">
                    <p className="text-sm font-semibold">Pickup Point</p>
                    <p className="text-sm  lg:w-64   ">
                      {trip.pickup_location}
                    </p>
                  </span>
                </div>
                <div className="col-span-2  flex flex-col  ml-2">
            <p className="text-sm font-semibold">Pickup date</p>
            <p className="text-sm ">
              {tripCommencementDate} <br /> ({tripCommencementTime})
            </p>
          </div>
              </div>
              <Separator
                orientation="vertical"
                className="ml-2 bg-slate-800 h-6 dark:bg-slate-100   "
              />
            </div>
              <div className="grid  grid-cols-5 md:grid-cols-9 -mt-5 justify-between  ">

            <div className="grid grid-cols-8 sm:flex items-start gap-1 w-full  md:col-span-7 col-span-3  ">
              <HiLocationMarker className="col-span-1 text-xl text-green-500" />
              <span className="flex flex-col col-span-7 ">
                <p className="text-sm font-semibold">Dropoff Point</p>
                <p className="text-sm lg:w-64    ">{trip.drop_off_location}</p>
              </span>
            </div>
            <div className="col-span-2  flex flex-col  ml-2  ">
            <p className="text-sm font-semibold">Dropoff date</p>
            <p className="text-sm mb-2">
              {tripCompletionDate} <br /> ({tripCompletionTime})
            </p>
          </div>
              </div>
          </div>
        </section>

      
      </div>
    </>
  );
}

const tripDates = (trip:Trip)=> {
  const { trip_request_date, trip_commencement_date, trip_completion_date } =  trip;
  const tripRequestDate = extractDateWithDayFromDate(trip_request_date) || 'TBD';
  const tripCommencementDate = extractShortDate(trip_commencement_date ) || 'TBD';
  const tripCompletionDate = extractShortDate(trip_completion_date) || 'TBD';
  const tripCommencementTime = extractTimeFromDate(trip_commencement_date) || 'TBD';
  const tripCompletionTime = extractTimeFromDate(trip_completion_date) || 'TBD';

return {tripRequestDate, tripCommencementDate, tripCompletionDate, tripCompletionTime, tripCommencementTime}
}