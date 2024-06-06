"use client";
//ui + icons
import { Button } from "../../ui/button";
import Container from "../../ui/container";

//main components
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import DashboardLoader from "../Nav/DashboardLoader";
import CustomerSection from "./CustomerSection";
import DispatcherSection from "./Dispatcher/DispatcherSection";
import PackageSection from "./PackageSection";
import PaymentSection from "./PaymentSection";
import StatusSection from "./StatusSection/StatusSection";

//hook
import { useGetTrip } from "./StatusSection/hook/useGetTrip";

export default function TrackOrder() {
  const {
    tripStage,
    tripStatus,
    trip,
    trackingOrder,
    dispatcher,
    inputRef,
    isLoading,
    handleTrackTrip,
    handleUsersOrTripsNav,
  } = useGetTrip();

  return (
    <main className="flex flex-col gap-5  md:h-full mb-44 ">
      {/* HEADER */}
      {!trackingOrder && (
        <TrackOrderForm inputRef={inputRef} onClickFunc={handleTrackTrip} />
      )}
      {trackingOrder && isLoading && <DashboardLoader />}
      {trackingOrder && !isLoading && trip && (
        <div className="space-y-3 mb-24">
          <article className="flex flex-col gap-4">
            <section className="flex gap-2 text-2xl mb-2">
              <h2> Order:</h2>
              <h1 className="font-bold">{trip.trip_id}</h1>
            </section>
            <section className="flex gap-3">
              <Button
                className="flex items-center justify-center gap-2"
                variant={"outline"}
                onClick={() => handleUsersOrTripsNav("Orders")}
              >
                <p>All Orders</p>
              </Button>
              <Button
                className="flex items-center justify-center gap-2"
                variant={"outline"}
                onClick={() => handleUsersOrTripsNav("Users")}
              >
                <p>All Users</p>
              </Button>
            </section>
          </article>

          <article className="flex flex-col lg:flex-row w-full gap-4">
            <Container className="flex flex-col  w-full lg:w-3/6 h-52 rounded-lg p-3 gap-2">
              <StatusSection tripStage={tripStage} tripStatus={tripStatus} />
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

          <article className="flex flex-col lg:flex-row w-full gap-4">
            <Container className=" w-full lg:w-3/6  h-60 rounded-lg p-3">
              <PackageSection trip={trip} />
            </Container>
            <Container className="flex flex-col  w-full lg:w-2/6 h-56 rounded-lg p-3 gap-2">
              <CustomerSection customerId={trip.customer_id} />
            </Container>
          </article>
        </div>
      )}
    </main>
  );
}
