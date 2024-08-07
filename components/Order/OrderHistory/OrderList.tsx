import ClientTripsPagination from "@/components/Shared/Pagination/ClientTripsPagination";
import { useClientTripsPagination } from "@/components/Shared/Pagination/hooks/useClientTripsPagination";
import { Trip } from "@/lib/store/slice/tripSlice";
import { extractDateWithDayFromDate } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OrderSummaryMin from "../OrderSummaryMin";
import NoOrderHistory from "./NoOrderHistory";

export default function OrderList({
  trips,
  noDelivery,
  isDispatcher
}: {
  trips: Trip[];
  noDelivery: boolean;
  isDispatcher: boolean;
}) {
  const {nextPage, prevPage, currentTrips, tripsPerPage, currentPage,  totalPages } = useClientTripsPagination({trips, tripsPerPage:5})
  
  

  const path = usePathname();

  
  
  

  
  

  return (
    <div className="flex flex-col w-full mt-4 rounded-2xl items-center justify-center mb-4">
      <div className="flex flex-col w-full items-center justify-center gap-2 md:items-start  -mt-6 relative">
        {currentTrips.map((trip: Trip) => (
          <div key={trip?.trip_id} className="w-full">
            <Link
              
              key={trip?.trip_id}
              href={
                path.startsWith("/dispatcher/trips")
                  ? `/dispatcher/trips/${trip?.trip_id}`
                  : `/track/${trip?.trip_id}`
              }
              className={`w-full relative `}
            >
              <OrderSummaryMin
                deliveryStatus={trip?.trip_status}
                packageType={trip?.package_type}
                cost={trip?.trip_cost}
                tripId={trip?.trip_id}
                tripRequestDate={extractDateWithDayFromDate(
                  trip?.trip_request_date
                )}
              />
            </Link>
            
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">
        {trips.length < 1 && !noDelivery && (
          <NoOrderHistory
            noDeliveryMessage="No current delivery!"
            isDispatcher={isDispatcher}
          />
        )}
      </div>
      {trips.length > tripsPerPage && (
        <ClientTripsPagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} totalPages={totalPages}/>        
        
      )}
    </div>
  );
}
