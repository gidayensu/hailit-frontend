//ui + icons


import Container from "../ui/container";
import OrderStatusElement from "./TrackOrder/OrderStatusElement";
import { useGetUserTrip } from "./hooks/useGetUserTrip";

export default function OrderUpdates() {
  const { trip } = useGetUserTrip();

  return (
    <Container className="w-full rounded-xl h-24 flex justify-center items-center  ">
      <div className="flex justify-center items-center w-full">
      <OrderStatusElement
              orderStatus="Booked"
              orderStage={1}
            >
              
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="Picked Up"
              
              orderStage={2}
            >
              
            </OrderStatusElement>

            <OrderStatusElement
              orderStatus="In Transit"
              orderStage={3}
            >
              
            </OrderStatusElement>

            {trip?.trip_status !== "Cancelled" && (
              <OrderStatusElement
                orderStatus="Delivered"
                
                orderStage={4}
              >
                
              </OrderStatusElement>
            )}

            {trip?.trip_status === "Cancelled" && (
              <OrderStatusElement
                orderStatus="Cancelled"
                
                orderStage={0}
              >
                
              </OrderStatusElement>
            )}
      </div>
    </Container>
  );
}

