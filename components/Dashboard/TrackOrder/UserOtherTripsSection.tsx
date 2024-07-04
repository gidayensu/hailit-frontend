import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import Loader from "@/components/Shared/Loader";
import NoData from "@/components/Shared/NoData";
import { extractDateWithDayFromDate } from "@/lib/utils";
import { useGetUserTrips } from "../hooks/useGetUserTrips";


export default function UserOtherTrips({
  userId,
  tripId,
}: {
  userId: string;
  tripId: string;
}) {
  const { isLoading, data, handleTrackTrip } = useGetUserTrips(userId);
  const otherTrips = data?.trips?.customer_trips.filter((trip: any) => trip.trip_id !== tripId);
  
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
                  {otherTrips.map((trip: any, index: number) => (
                    <div key={index}>
                      {index <= 2 && (
                        <div key={trip.trip_id} onClick={() => handleTrackTrip(trip.trip_id)}>
                          <OrderSummaryMin
                            
                            key={trip.trip_id}
                            cost={trip.trip_cost}
                            deliveryStatus={trip.trip_status}
                            packageType={trip.package_type}
                            tripId={trip.trip_id}
                            tripRequestDate={extractDateWithDayFromDate(
                              trip.trip_request_date
                            
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
    {otherTrips?.length <1  && !isLoading && (
      <div className="h-1/3 md:w-full md:mt-2 mt-4 flex lg:md-0 items-center justify-center ">
        <NoData
          noDataText="User has made no other orders"
          textClassName="font-semibold text-center"
        />
      </div>
    )}
    </>
  );
}
