import { extractDateWithDayFromDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import Loader from "../Shared/Loader";
import { Trip } from "./hooks/useGetUserTrips";
import OrderSummaryMin from "./OrderSummaryMin";
import NoOrderHistory from "./NoOrderHistory";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function OrderList({
  trips,
  noDelivery,
  isDispatcher
}: {
  trips: Trip[];
  noDelivery: boolean;
  isDispatcher: boolean;
}) {
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tripsPerPage = 5; // Number of trips per page

  const path = usePathname();

  // Calculate the index range of trips to display based on current page
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);

  // Handle next page click
  const nextPage = () => {
    if (indexOfLastTrip < trips.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col w-full mt-4 rounded-2xl items-center justify-center mb-4">
      <div className="flex flex-col w-full items-center justify-center gap-2 md:items-start  -mt-6 relative">
        {currentTrips.map((trip: Trip) => (
          <div key={trip?.trip_id} className="w-full">
            <Link
              onClick={() => setTripLoading(true)}
              key={trip?.trip_id}
              href={
                path.startsWith("/dispatcher/trips")
                  ? `dispatcher/trips/${trip?.trip_id}`
                  : `track/${trip?.trip_id}`
              }
              className={`w-full relative ${
                tripLoading ? "opacity-30" : ""
              }`}
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
            {tripLoading && (
              <span className="absolute flex items-center justify-center">
                <Loader />
              </span>
            )}
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
        <div className="w-full flex justify-end items-center gap-2 mt-4">
            
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => prevPage()}
              disabled={currentPage===1}
            >
              Previous
            </Button>
            <p>|</p>
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => nextPage()}
              disabled={indexOfLastTrip >= trips.length}
            >
              Next
            </Button>
          </div>
        
        
      )}
    </div>
  );
}
