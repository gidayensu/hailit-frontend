"use client";
import { useState } from "react";
import NoOrderHistory from "./NoOrderHistory";
import OrderList from "./OrderList";
import { useGetUserTrips } from "./hooks/useGetUserTrips";
import TripsLoadingSkeleton from "./skeletons/TripsLoadingSkeleton";


export default function OrderHistory() {
  const [currentDeliveries, setCurrentDeliveries] = useState<boolean>(true);
  
  
  
  
  const { currentTrips, previousTrips, isLoading, error, noDelivery, user_role } = useGetUserTrips();
  
  const isDispatcher = user_role !== "Customer" ? true: false;
  
  return (
    <div className="flex flex-col md:4/6 w-5/6 mt-4 rounded-2xl gap-2 items-center justify-center">
        <p className="text-md  md:w-4/6 w-full font-bold h-7 "> Your Deliveries </p> 
      {
        isLoading && <TripsLoadingSkeleton/>
      }
      {noDelivery && !isLoading && (
        <NoOrderHistory noDeliveryMessage="Your Deliveries Will Appear Here!" isDispatcher={isDispatcher} />
      )}

      {(currentTrips.length > 0 || previousTrips.length > 0) && (
        <div className="flex justify-between items-center w-full md:w-4/6 h-10 bg-white dark:bg-secondary-dark border border-primary-color   rounded-xl p-2 gap-3 text-[13px] mb-4">
          <span
            className={`flex items-center justify-center ${
              currentDeliveries
                ? "bg-primary-color text-white"
                : " dark:bg-secondary-dark dark:opacity-50"
            }  text-primary-color dark:text-slate-100 w-1/2 h-8 -ml-1 text-center rounded-lg cursor-pointer`}
            onClick={() => setCurrentDeliveries(true)}
          >
            Current
          </span>
          <span
            className={`flex items-center justify-center ${
              currentDeliveries
                ? " dark:bg-secondary-dark dark:opacity-50"
                : "text-white bg-primary-color"
            } text-primary-color dark:text-slate-100 w-1/2 h-8 -mr-1 text-center rounded-lg cursor-pointer`}
            onClick={() => setCurrentDeliveries(false)}
          >
            Completed
          </span>
        </div>
      )}
      <div className="w-full md:w-4/6 flex items-center ">

      {currentDeliveries && (<OrderList isDispatcher={user_role !== "Customer" ? true: false} noDelivery={noDelivery} trips={currentTrips}  />
      )}
      {!currentDeliveries && (<OrderList isDispatcher={user_role !== "Customer" ? true: false} noDelivery={noDelivery} trips={previousTrips}  />
      )}
      </div>
    </div>
    
  );
}

