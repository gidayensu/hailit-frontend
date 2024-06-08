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

export type Deliveries = boolean;

interface Trip {
  trip_id: string;
  dispatcher_id: string;
  trip_medium: string;
  additional_information?: string;
  drop_off_location: string;
  package_type: PackageType;
  payment_method: string;
  payment_status: boolean;
  pickup_location: string;
  trip_cost: string;
  trip_request_date: string;
  trip_status: DeliveryStatus;
}

export default function OrderHistory() {
  const [currentDeliveries, setCurrentDeliveries] = useState<Deliveries>(true);
  const [tripLoading, setTripLoading] = useState<boolean>(false);

  const handleTripLoading = () => {
    setTripLoading(true);
  };
  const handleSelectedDeliveries = (status: boolean) => {
    setCurrentDeliveries(status);
  };

  const { currentTrips, previousTrips, isLoading, error, noDelivery } = useGetUserTrips();

  if (isLoading) {
    return <TripsLoadingSkeleton />;
  }
  return (
    <div className="flex flex-col md:4/6 w-5/6 mt-4 rounded-2xl gap-2 items-center justify-center">
      <h2 className="font-bold text-xl"> YOUR DELIVERIES</h2>
    {
      noDelivery &&
      <NoDeliveryHistory noDeliveryMessage="Your Deliveries Will Appear Here!"/>   }

    {(currentTrips.length || previousTrips.length ) &&
      <div className="flex justify-between items-center w-full md:w-4/6 h-10 bg-white dark:bg-secondary-dark border border-primary-color   rounded-xl p-2 gap-3 text-[13px] mb-4">
        <span
          className={`flex items-center justify-center ${
            currentDeliveries
              ? "bg-primary-color text-white"
              : " dark:bg-secondary-dark dark:opacity-50"
          }  text-primary-color dark:text-slate-100 w-1/2 h-8 -ml-1 text-center rounded-lg`}
          onClick={() => handleSelectedDeliveries(true)}
        >
          Current
        </span>
        <span
          className={`flex items-center justify-center ${
            currentDeliveries
              ? " dark:bg-secondary-dark dark:opacity-50"
              : "text-white bg-primary-color"
          } text-primary-color dark:text-slate-100 w-1/2 h-8 -mr-1 text-center rounded-lg`}
          onClick={() => handleSelectedDeliveries(false)}
        >
          Previous
        </span>
      </div>
}
      {currentDeliveries && (
        <div className="flex flex-col md:w-5/6 w-full mt-4 rounded-2xl items-center justify-center mb-4">
        <div className={`flex flex-col md:w-5/6 w-full items-center justify-center gap-2 md:items-start md:p-3 -mt-6 relative`}>


          {currentTrips.map((trip: Trip) => (
            <>
              <Link
                onClick={handleTripLoading}
                key={trip.trip_id}
                href={`track/${trip.trip_id}`}
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
                  <Loader color="red" />
                </span>
              )}
            </>
          ))}
          </div>
          <div className="flex items-center justify-center w-full">

          {
            currentTrips.length < 1 &&  !noDelivery && <NoDeliveryHistory noDeliveryMessage="No current delivery!"/>
          }
          </div>
        </div>
      )}
      {!currentDeliveries && (
        <div className="flex flex-col md:w-5/6 w-full mt-4 rounded-2xl items-center justify-center mb-4">
          <div className={`flex flex-col md:w-5/6 w-full items-center justify-center gap-2 md:items-start md:p-3 -mt-6 relative`}>

          {previousTrips.map((trip: Trip) => (
            <>
              <Link
                onClick={handleTripLoading}
                key={trip.trip_id}
                href={`track/${trip.trip_id}`}
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
                  <Loader color="red" />
                </span>
              )}
            </>
          ))}
          </div>
          <div className="flex items-center justify-center">

          {
            previousTrips.length < 1 && <NoDeliveryHistory noDeliveryMessage="No previous delivery!"/>
              }
          </div>
        </div>
      )}
    </div>
  );
}

const NoDeliveryHistory = ({noDeliveryMessage}: {noDeliveryMessage: string})=> {
  return (
    
      <div className="flex flex-col items-center justify-center w-full md:w-3/6">
      <NoData noDataText={noDeliveryMessage} textClassName="font-semibold text-md mb-4" />
      <Link href={'/order'}>
      <Button variant={'outline'}> Send a Package </Button>
      </Link>
      </div>
  )
}