"use client";
//ui + icons
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../ui/button";
import Container from "../../ui/container";

//main components

import TrackOrderSkeleton from "./TrackOrderDetailsSkeleton";
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import DispatcherSection from "./DispatcherSection";
import PackageSection from "./PackageSection";
import CustomerSection from "./CustomerSection";
import PaymentSection from "./PaymentSection";
import StatusSection from "./StatusSection";
//redux +react
import { useRef } from "react";
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  setTrackingOrder,
  setSelectedTripId,
  setAssignedDispatcher,
} from "@/lib/store/slice/dashboardSlice";

export type OrderStatus =
  | "Booked"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

export default function TrackOrder() {
  const { selectedTripId, trackingOrder, assignedDispatcherId } = useAppSelector(
    (state) => state.dashboard
  );
  const { data, isLoading, error } = useGetTripQuery(`${selectedTripId}`);
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>(null);

  let trip = [];
  let dispatcher = [];
  if (data) {
    trip = data.trip;
    dispatcher = trip.dispatcher;
    if(!assignedDispatcherId){
    dispatch(
      setAssignedDispatcher({
        assignedDispatcherId: trip.dispatcher_id,
        assignedDispatcherName: `${dispatcher.first_name} ${dispatcher.last_name}`,
        assignedDispatcherPlate: dispatcher.vehicle?.plate_number,
        assignedDispatcherVehicle: dispatcher.vehicle?.vehicle_name,
        assignedDispatcherPhone: dispatcher.phone_number
      })
    );}
  }
  const handleTrackTrip = () => {
    const tripId = inputRef.current?.value;
    dispatch(setTrackingOrder(true));
    dispatch(setSelectedTripId(tripId));
  };

  return (
    <main className="flex flex-col gap-5">
      {/* HEADER */}
      {!trackingOrder && (
        <TrackOrderForm inputRef={inputRef} onClickFunc={handleTrackTrip} />
      )}
      {trackingOrder && isLoading && <TrackOrderSkeleton />}
      {trackingOrder && !isLoading && trip && (
        <div className="space-y-3">
          <article className="flex flex-col gap-4">
            <section className="flex gap-2 text-2xl mb-2">
              <h2> Order:</h2>
              <h1 className="font-bold">{trip.trip_id}</h1>
            </section>
            <section className="flex gap-3">
              <Button
                className="flex items-center justify-center gap-2"
                variant={"outline"}
              >
                <AiOutlineEdit className="text-xl" />
                <p>Edit Order</p>
              </Button>
              <Button
                className="flex items-center justify-center gap-2"
                variant={"destructive"}
              >
                <MdDeleteOutline className="text-xl" />
                <p>Cancel Order</p>
              </Button>
            </section>
          </article>

          <article className="flex flex-col lg:flex-row w-full gap-4">
            <Container className="flex flex-col  w-full lg:w-3/6 h-52 rounded-lg p-3 gap-2">
              <StatusSection
                tripStage={trip.trip_stage}
                tripStatus={trip.trip_status}
              />
            </Container>

            <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
              <PaymentSection
                cost={trip.trip_cost}
                paymentStatus={trip.payment_status}
              />
            </Container>

            <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
              <DispatcherSection
                dispatcher={dispatcher}
                tripMedium={trip.trip_medium}
              />
            </Container>
          </article>

          <article className="flex flex-col lg:flex-row w-full gap-4 mb-10">
            <Container className=" w-full lg:w-2/6  h-60 rounded-lg p-3">
              <PackageSection trip={trip} />
            </Container>
            <Container className="flex flex-col  w-full lg:w-2/6 h-56 rounded-lg p-3 gap-2">
              <CustomerSection customerId={trip.customer_id}/>
            </Container>
          </article>
        </div>
      )}
    </main>
  );
}
