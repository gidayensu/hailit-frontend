"use client";
//ui + icons
import { Button } from "../../ui/button";
import Container from "../../ui/container";

//main components
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import BigLoader from "../../Shared/BigLoader";
import CustomerSection from "./CustomerSection";
import DispatcherSection from "./Dispatcher/DispatcherSection";
import PackageSection from "./PackageSection";
import PaymentSection from "./PaymentSection";
import StatusSection from "./StatusSection/StatusSection";
import UserOtherTrips from "./UserOtherTripsSection";
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
      {trackingOrder && isLoading && <BigLoader />}
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
            <div className="w-full lg:w-3/6 space-y-5">

            <Container className="flex flex-col  w-full h-52 rounded-lg p-3 gap-2">
              <StatusSection tripStage={tripStage} tripStatus={tripStatus} />
            </Container>
            <Container className=" w-full h-60 rounded-lg p-6">
              <PackageSection trip={trip} />
            </Container>
            </div>

            <div className="w-full lg:w-2/6 space-y-5">
            <Container className="flex flex-col  w-full   h-52 rounded-lg p-3 gap-2">
              <PaymentSection
                cost={trip.trip_cost}
                paymentStatus={trip.payment_status}
              />
            </Container>
            <Container className="flex flex-col  w-full h-60 rounded-lg p-3 gap-2">
              <CustomerSection customerId={trip.customer_id} />
            </Container>
            </div>
            <div className="w-full lg:w-2/6 space-y-5">
            <Container className="flex flex-col  w-full   h-52 rounded-lg p-3 gap-2">
              <DispatcherSection
                dispatcher={dispatcher}
                tripMedium={trip.trip_medium}
              />
            </Container>
            <Container className="flex flex-col  w-full   h-60 rounded-lg p-3 gap-2">
              <UserOtherTrips userId={trip.customer_id} tripId={trip.trip_id}/>
            </Container>
            </div>
          </article>

          
        </div>
      )}
    </main>
  );
}
