import OrderStatusElement from "@/components/Order/TrackOrder/OrderStatusElement";
import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import { CiViewList } from "react-icons/ci";
import { GoChecklist, GoX } from "react-icons/go";
import { PiMotorcycleLight, PiPackageLight } from "react-icons/pi";
import StatusUpdate from "./StatusUpdate";

export default function StatusSection({
  tripStatus,
  tripStage,
}: {
  tripStatus: string;
  tripStage: number;
}) {
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
                <p>Update</p>
              
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
          currentOrderStage={tripStage}
          orderStage={1}
        >
          <CiViewList className="text-3xl" />
        </OrderStatusElement>

        <OrderStatusElement
          orderStatus="Picked Up"
          currentOrderStage={tripStage}
          orderStage={2}
        >
          <PiPackageLight className="text-3xl" />
        </OrderStatusElement>

        <OrderStatusElement
          orderStatus="In Transit"
          currentOrderStage={tripStage}
          orderStage={3}
        >
          <PiMotorcycleLight className="text-3xl" />
        </OrderStatusElement>

        {tripStatus !== "Cancelled" && (
          <OrderStatusElement
            orderStatus="Delivered"
            currentOrderStage={tripStage}
            orderStage={4}
          >
            <GoChecklist
              className={`text-3xl ${tripStage === 4 ? "text-green-500" : ""} `}
            />
          </OrderStatusElement>
        )}

        {tripStatus === "Cancelled" && (
          <OrderStatusElement
            orderStatus="Cancelled"
            currentOrderStage={tripStage}
            orderStage={0}
          >
            <GoX className="text-3xl text-red-500" />
          </OrderStatusElement>
        )}
      </div>
    </>
  );
}
