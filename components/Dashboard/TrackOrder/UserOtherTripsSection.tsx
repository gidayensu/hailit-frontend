'use client'
import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import Loader from "@/components/Shared/Loader";
import NoData from "@/components/Shared/NoData";
import { Trip } from "@/lib/store/slice/tripSlice";
import { extractDateWithDayFromDate } from "@/lib/utils";
import { useGetUserTrips } from "../hooks/useGetUserTrips";
import { useRouter } from "next/navigation";

export default function UserOtherTrips({
  userId,
  tripId,
}: {
  userId: string;
  tripId: string
}) {
  const router = useRouter();
  const { isLoading, trips   } = useGetUserTrips(userId);
   const handleTrackTrip = (tripId:string)=> {
      router.push(`/dashboard/track-order/${tripId}`)

   }
  
  //when a user is changed from customer to rider/driver, the user's previous trips remain.
  //however, when the trips are fetched, since they are fetched as dispatcher trips since the current user_role is rider/driver
  let otherTrips: Trip[] = [];
    trips?.dispatcher_trips 
    ?  otherTrips = trips?.dispatcher_trips.filter((trip: Trip) => trip.trip_id !== tripId) 
    : otherTrips = trips?.customer_trips.filter((trip: Trip) => trip.trip_id !== tripId)
  
  const noOrders = !otherTrips || otherTrips.length < 1;

  return (
    <>
    
    <div className="flex flex-col gap-2">
          <h3 className="font-bold">CLIENT RECENT TRIPS</h3>
      <div className="flex justify-between">
        
        <>

            <div className="flex flex-col gap-2 w-full ">
              {isLoading && (
                <div className="flex items-center justify-center mt-4">
                  <Loader color="red" />
                </div>
              )}
              {otherTrips?.length >0 && (
                <>
                  {otherTrips.map((trip: Trip, index: number) => (
                    <div key={index}>
                      {index <= 2 && (
                        <div key={trip?.trip_id} onClick={() => handleTrackTrip(trip?.trip_id)}>
                          <OrderSummaryMin
                            
                            key={trip?.trip_id}
                            cost={trip?.trip_cost}
                            deliveryStatus={trip?.trip_status}
                            packageType={trip?.package_type}
                            tripId={trip?.trip_id}
                            tripRequestDate={extractDateWithDayFromDate(
                              trip?.trip_request_date
                            
                            )}
                          />
                        </div>
                      )}
               
                    </div>
                  ))}
                </>
              )}
          
            </div>

        </>
      </div>
    </div>
    {noOrders  && !isLoading && (
      <div className="h-1/3 md:w-full md:mt-10 mt-4 flex lg:md-0 items-center justify-center ">
        <NoData
          noDataText="User has made no other orders"
          textClassName="font-semibold text-center"
        />
      </div>
    )}
    </>
  );
}
