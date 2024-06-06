//ui + icons
import type { OrderStatus } from "../Dashboard/TrackOrder/StatusSection/hook/useGetTrip";

import Container from "../ui/container";
import OrderStatusElement from "./TrackOrder/OrderStatusElement";

export default function OrderUpdates({currentOrderStatus, currentOrderStage}:{currentOrderStatus: OrderStatus, currentOrderStage: number}) {


  return (
    <Container className="w-full rounded-xl h-24 flex justify-center items-center  ">
      <div className="flex justify-center items-center w-full">
      <OrderStatusElement
              orderStatus="Booked"
              currentOrderStage={currentOrderStage}
              orderStage={1}
            >
              <></>
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="Picked Up"
              currentOrderStage={currentOrderStage}
              orderStage={2}
            >
              <></>
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="In Transit"
              currentOrderStage={currentOrderStage}
              orderStage={3}
            >
              <></>
            </OrderStatusElement>

            {currentOrderStatus !== "Cancelled" && (
              <OrderStatusElement
                orderStatus="Delivered"
                currentOrderStage={currentOrderStage}
                orderStage={4}
              >
                <></>
              </OrderStatusElement>
            )}

            {currentOrderStatus === "Cancelled" && (
              <OrderStatusElement
                orderStatus="Cancelled"
                currentOrderStage={currentOrderStage}
                orderStage={0}
              >
                <></>
              </OrderStatusElement>
            )}
      </div>
    </Container>
  );
}

