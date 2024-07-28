import OrderStatusElement from "@/components/Order/TrackOrder/OrderStatusElement";
import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import { CiViewList } from "react-icons/ci";
import { GoChecklist, GoX } from "react-icons/go";
import { PiMotorcycleLight, PiPackageLight } from "react-icons/pi";
import StatusUpdate from "./StatusUpdate";
import { useGetTrip } from "./hooks/useGetTrip";

export default function StatusSection() {

  const { trip, } = useGetTrip();
  
  return (
    <>
      {/* order status */}
      <div className="w-full flex justify-between">
        <div className="w-full">
          <h3 className="font-bold">ORDER STATUS</h3>
          <h3 className="text-[12px] text-slate-400 ">Current Order Status</h3>
        </div>
        <Modal
          className="max-w-32 flex items-start justify-end"
          dialogTriggerElement={
            <Button
              variant={"empty"}
              className="space-x-1 bg-primary-color hover:bg-primary-medium text-white  hover:dark:bg-slate-100 dark:text-secondary-dark dark:bg-white"
            >
                <p>Change Status</p>
              
            </Button>
          }
        >
          {
            <div className="w-32">
              <p className="font-bold">Update Status</p>
              <StatusUpdate />
            </div>
          }
        </Modal>
      </div>
      <div className="flex">
        <OrderStatusElement
          orderStatus="Booked"

          orderStage={1}
        >
          <CiViewList className="text-3xl" />
        </OrderStatusElement>

        <OrderStatusElement
          orderStatus="Picked Up"
          
          orderStage={2}
        >
          <PiPackageLight className="text-3xl" />
        </OrderStatusElement>

        <OrderStatusElement
          orderStatus="In Transit"
          
          orderStage={3}
        >
          <PiMotorcycleLight className="text-3xl" />
        </OrderStatusElement>

        {trip?.trip_status !== "Cancelled" && (
          <OrderStatusElement
            orderStatus="Delivered"
          
            orderStage={4}
          >
            <GoChecklist
              className={`text-3xl ${trip?.trip_stage == 4 ? "text-green-500" : ""} `}
            />
          </OrderStatusElement>
        )}

        {trip?.trip_status === "Cancelled" && (
          <OrderStatusElement
            orderStatus="Cancelled"
          
            orderStage={0}
          >
            <GoX className="text-3xl text-red-500 dark:text-red-500" />
          </OrderStatusElement>
        )}
      </div>
    </>
  );
}
