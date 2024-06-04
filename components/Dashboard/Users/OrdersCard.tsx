import { Button } from "@/components/ui/button";
import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { Skeleton } from "@/components/ui/skeleton";
import { extractDateWithDayFromDate } from "@/lib/utils";
import NoData from "@/components/Shared/NoData";
export default function OrdersCard({userData}:{userData:any}) {
    const {data, isLoading } = useGetUserTripsQuery(userData.user_id);
    let trips = [];
    if (data) {
      trips = data.trips;
    }
  return (
    <>
      <section className="w-full p-4">
        
        <div className="flex flex-col gap-2 w-full">
          <div className={`flex items-center justify-center bg-primary-color text-white dark:text-slate-100 w-full h-8 text-center rounded-lg`} >
            Recent Orders
          </div>
          {
            isLoading && <Skeleton className="h-4 w-16" />
          }
          {
            data && <>
            
                    {trips.map((trip:any, index:number)=> 
                    <>
                      { index <= 2 &&

                        <OrderSummaryMin key={trip.trip_id} cost={trip.trip_cost} deliveryStatus={trip.trip_status} packageType={trip.package_type} tripId={trip.trip_id} tripRequestDate={extractDateWithDayFromDate(trip.trip_request_date)}/>
                      }
                    </>

                    )}
                    {
                      trips.length > 2 &&
                  <Button variant={'empty'} className="font-semibold">
                      View All
                  </Button>
                    }
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
