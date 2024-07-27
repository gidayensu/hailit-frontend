"use client";
//ui + icons
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Loader from "../Shared/Loader";

//main components
import OrderSummaryMin from "./OrderSummaryMin";

//hook
import { useReOrder } from "./hooks/useReOrder";

export function ReOrder() {
  
  const {tripRequestDate, handleSubmit, loading, trip} = useReOrder();
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="w-full">
          Reorder
        </Button>
      </DrawerTrigger>

      <DrawerContent className=" flex items-center justify-center">
        <div className="md:flex md:flex-col md:justify-center  pb-0  md:w-[400px]">
          <div className="grid grid-cols-2 justify-between px-5 mb-4 gap-7">
            <div className="flex flex-col justify-start items-start">
              <span className="flex justify-center items-center gap-1 font-bold text-lg">
                <p>Sender</p>
              </span>
              <span className="text-sm">
                <p className="line-clamp-1">
                  <b>Pickup:</b> {trip?.pickup_location}
                </p>
                <p>{trip?.sender_number}</p>
              </span>
            </div>
            <div className="flex flex-col justify-end items-start">
              <span className="flex justify-center items-center font-bold text-lg">
                <p>Recipient</p>
              </span>
              <span className="text-sm">
                <p className="line-clamp-1">
                  <b>To: </b>
                  {trip?.drop_off_location}
                </p>
                <p>{trip?.recipient_number}</p>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 px-4">
            <OrderSummaryMin
              tripId="#tripID"
              tripRequestDate={tripRequestDate}
              deliveryStatus="Booked"
              packageType={trip?.package_type}
              cost={trip?.trip_cost}
            />
          </div>
          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader /> : "Confirm"}
            </Button>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
