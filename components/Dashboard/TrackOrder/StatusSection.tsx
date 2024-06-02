import OrderStatusElement from "@/components/Order/TrackOrder/OrderStatusElement"
import { CiViewList } from "react-icons/ci"
import { GoChecklist, GoX } from "react-icons/go"
import { PiPackageLight, PiMotorcycleLight } from "react-icons/pi"

export default function StatusSection ({tripStatus, tripStage}: {tripStatus: string, tripStage: number}) {
    return (
        <>
        {/* order status */}
        <h3 className="font-bold">ORDER STATUS</h3>
          <h3 className="text-[12px] text-slate-400 -mt-3">
            Current Order Status
          </h3>
          

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
                  className={`text-3xl ${
                    tripStage === 4 ? "text-green-500" : ""
                  } `}
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
          </div></>
    )
}