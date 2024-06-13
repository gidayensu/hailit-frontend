import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import Loader from "@/components/Shared/Loader";
import NoData from "@/components/Shared/NoData";
import { extractDateWithDayFromDate } from "@/lib/utils";
import { useGetUserTrips } from "../hooks/useGetUserTrips";

export default function OrdersCard({userId}:{userId:string}) {
  const  {data, isLoading, handleTrackTrip} = useGetUserTrips(userId);
  console.log()
  return (
    <>
      <section className="w-full p-4">
        
        <div className="flex flex-col gap-2 w-full">
          {
            isLoading && 
            <div className="flex items-center justify-center">

              <Loader />
            </div>
          }
          {
            data && <>
            
          <div className={`flex items-center justify-center bg-primary-color text-white dark:text-slate-100 w-full h-8 text-center rounded-lg`} >
            Recent Orders
          </div>
                    {data?.trips?.customer_trips?.map((trip:any, index:number)=> 
                    <>
                      { index <= 2 &&
                        <div onClick={()=>handleTrackTrip(trip.trip_id)} key={trip.trip_id}>

                          <OrderSummaryMin key={trip.trip_id} cost={trip.trip_cost} deliveryStatus={trip.trip_status} packageType={trip.package_type} tripId={trip.trip_id} tripRequestDate={extractDateWithDayFromDate(trip.trip_request_date)}/>
                        </div>
                      }
                    </>

                    )}
                  
            </>
          }
        {
            !data && !isLoading && 
            <NoData noDataText="User has made no orders" textClassName="font-semibold text-center"/>
        }

        </div>
      </section>
    </>
  );
}
