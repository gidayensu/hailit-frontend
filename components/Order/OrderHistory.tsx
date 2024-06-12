"use client";
import { extractDateWithDayFromDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import Loader from "../Shared/Loader";
import NoData from "../Shared/NoData";
import { Button } from "../ui/button";
import { useGetUserTrips } from "./hooks/useGetUserTrips";
import OrderSummaryMin, { DeliveryStatus, PackageType } from "./OrderSummaryMin";
import TripsLoadingSkeleton from "./skeletons/TripsLoadingSkeleton";
import { Trip } from "./hooks/useGetUserTrips";
export type Deliveries = boolean;
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";

export default function OrderHistory() {
  const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [dispatcher, setDispatcher] = useState<boolean>(false)
  const { dispatcherCurrentTrips, dispatcherPreviousTrips } = useAppSelector(state=>state.dispatcher)
  const path = usePathname();

  const { currentTrips, previousTrips, isLoading, error, noDelivery } = useGetUserTrips();
  
  if (isLoading) {
    return <TripsLoadingSkeleton />;
  }
  return (
    <div className="flex flex-col md:4/6 w-5/6 mt-4 rounded-2xl gap-2 items-center justify-center">
      <h2 className="font-bold text-xl"> YOUR DELIVERIES</h2>
      {noDelivery && (
        <NoDeliveryHistory noDeliveryMessage="Your Deliveries Will Appear Here!" dispatcher={dispatcher} />
      )}

      {(currentTrips.length > 0 || previousTrips.length > 0) && (
        <div className="flex justify-between items-center w-full md:w-4/6 h-10 bg-white dark:bg-secondary-dark border border-primary-color   rounded-xl p-2 gap-3 text-[13px] mb-4">
          <span
            className={`flex items-center justify-center ${
              currentDeliveries
                ? "bg-primary-color text-white"
                : " dark:bg-secondary-dark dark:opacity-50"
            }  text-primary-color dark:text-slate-100 w-1/2 h-8 -ml-1 text-center rounded-lg`}
            onClick={() => setCurrentDeliveries(true)}
          >
            Current
          </span>
          <span
            className={`flex items-center justify-center ${
              currentDeliveries
                ? " dark:bg-secondary-dark dark:opacity-50"
                : "text-white bg-primary-color"
            } text-primary-color dark:text-slate-100 w-1/2 h-8 -mr-1 text-center rounded-lg`}
            onClick={() => setCurrentDeliveries(false)}
          >
            Previous
          </span>
        </div>
      )}
      {currentDeliveries && (
        <div className="flex flex-col md:w-5/6 w-full mt-4 rounded-2xl items-center justify-center mb-4">
          <div
            className={`flex flex-col md:w-5/6 w-full items-center justify-center gap-2 md:items-start md:p-3 -mt-6 relative`}
          >
            {currentTrips.map((trip: Trip) => (
              <>
                <Link
                  onClick={() => setTripLoading(true)}
                  key={trip.trip_id}
                  href={
                    path.startsWith("/dispatcher/trips")
                      ? `dispatcher/trips/${trip.trip_id}`
                      : `track/${trip.trip_id}`
                  }
                  className={`w-full relative ${
                    tripLoading ? "opacity-30" : ""
                  }`}
                >
                  <OrderSummaryMin
                    deliveryStatus={trip.trip_status}
                    packageType={trip.package_type}
                    cost={trip.trip_cost}
                    tripId={trip.trip_id}
                    tripRequestDate={extractDateWithDayFromDate(
                      trip.trip_request_date
                    )}
                  />
                </Link>
                {tripLoading && (
                  <span className="absolute flex items-center justify-center">
                    <Loader />
                  </span>
                )}
              </>
            ))}
          </div>
          <div className="flex items-center justify-center w-full">
            {currentTrips.length < 1 && !noDelivery && (
              <NoDeliveryHistory noDeliveryMessage="No current delivery!" dispatcher={dispatcher}/>
            )}
          </div>
        </div>
      )}
      {!currentDeliveries && (
        <div className="flex flex-col md:w-5/6 w-full mt-4 rounded-2xl items-center justify-center mb-4">
          <div
            className={`flex flex-col md:w-5/6 w-full items-center justify-center gap-2 md:items-start md:p-3 -mt-6 relative`}
          >
            {previousTrips.map((trip: Trip) => (
              <>
                <Link
                  onClick={() => setTripLoading(true)}
                  key={trip.trip_id}
                  href={
                    path.startsWith("/dispatcher/trips")
                      ? `/dispatcher/trips/${trip.trip_id}`
                      : `track/${trip.trip_id}`
                  }
                  className={`w-full relative ${
                    tripLoading ? "opacity-30" : ""
                  }`}
                >
                  <OrderSummaryMin
                    deliveryStatus={trip.trip_status}
                    packageType={trip.package_type}
                    cost={trip.trip_cost}
                    tripId={trip.trip_id}
                    tripRequestDate={extractDateWithDayFromDate(
                      trip.trip_request_date
                    )}
                  />
                </Link>
                {tripLoading && (
                  <span className="absolute">
                    <Loader />
                  </span>
                )}
              </>
            ))}
          </div>
          <div className="flex items-center justify-center">
            {previousTrips.length < 1 && (
              <NoDeliveryHistory
                noDeliveryMessage="No previous delivery!"
                dispatcher={dispatcher}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const NoDeliveryHistory = ({noDeliveryMessage, dispatcher}: {noDeliveryMessage: string, dispatcher:boolean})=> {
  return (
    
      <div className="flex flex-col items-center justify-center w-full md:w-3/6">
      <NoData noDataText={noDeliveryMessage} textClassName="font-semibold text-md mb-4" />
      <Link href={'/order'}>
      {!dispatcher &&
      <Button variant={'outline'}> Send a Package </Button>}
      </Link>
      </div>
  )
}