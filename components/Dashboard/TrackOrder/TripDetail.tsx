//ui + icons
import { Modal } from "@/components/Shared/Modal";
import Link from "next/link";
import { Button } from "../../ui/button";
import Container from "../../ui/container";
import DeleteModalCard from "./DeleteModalCard";

//custom hooks + react + helpers + redux
import { extractShortDate } from "@/lib/utils";
import { useDeleteTrip } from "../hooks/useDeleteTrip";
import { useGetTrip } from "./StatusSection/hook/useGetTrip";
//main components
import { useEffect } from "react";
import CustomerSection from "./CustomerSection";
import DispatcherSection from "./Dispatcher/DispatcherSection";
import PackageSection from "./PackageSection";
import PaymentSection from "./PaymentSection";
import StatusSection from "./StatusSection/StatusSection";
import UserOtherTrips from "./UserOtherTripsSection";

//interface

export default function TripDetail() {
  const { trip, selectedTripId, dispatcher } = useGetTrip();
  const { handleDeleteTrip, isLoading, error, isSuccess } = useDeleteTrip(
    `${selectedTripId}`
  );

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trip.trip_id]);

  return (
    <div className="space-y-3 md:mb-0 mb-24">
      <article className="flex flex-col gap-4">
        <section className="flex flex-col md:flex-row gap-2 text-xl mb-2">
          <span className="flex gap-2">
            <h1> Order:</h1>
            <h2 className="font-bold">{trip.trip_id}</h2>
            <span className="hidden md:block">| </span>
          </span>

          <span className="flex gap-2">
            <h1> Package Type:</h1>
            <h2 className="font-bold">{trip.package_type}</h2>
            <span className="hidden md:block">| </span>
          </span>
          <span className="flex gap-2">
            <h1> Request Date:</h1>
            <h2 className="font-bold">
              {extractShortDate(trip.trip_request_date)}
            </h2>
          </span>
        </section>
        <section className="flex gap-3">
          {/* EDIT */}
          <Link
            className="flex items-center justify-center gap-2"
            href={"/dashboard/track-order/edit-order"}
          >
            <Button variant={"outline"}>
              <p>Edit Trip</p>
            </Button>
          </Link>

          {/* DELETE  */}
          <Modal
            dialogTriggerElement={
              <Button
                className="flex items-center justify-center gap-2"
                variant={"destructive"}
              >
                <p>Delete Trip</p>
              </Button>
            }
          >
            <DeleteModalCard
              itemId={trip.trip_id}
              item="Trip"
              loading={isLoading}
              deleteFn={handleDeleteTrip}
              error={error}
              isSuccess={isSuccess}
            />
          </Modal>
        </section>
      </article>

      <article className="flex flex-col lg:flex-row w-full gap-4">
        <div className="w-full lg:w-3/6 space-y-5">
          <Container className="flex flex-col  w-full h-52 rounded-lg p-3 gap-2">
            <StatusSection
              tripStage={trip?.trip_stage}
              tripStatus={trip?.trip_status}
            />
          </Container>
          <Container className=" w-full md:h-72 h-80 rounded-lg p-3">
            <PackageSection />
          </Container>
        </div>

        <div className="w-full lg:w-2/6 space-y-5">
          <Container className="flex flex-col  w-full   h-52 rounded-lg p-3 gap-2">
            <PaymentSection />
          </Container>
          <Container className="flex flex-col  w-full h-72 rounded-lg p-3 gap-2">
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
          <Container className="flex flex-col  w-full   h-72 rounded-lg p-3 gap-2">
            <UserOtherTrips userId={trip.customer_id} tripId={trip.trip_id} />
          </Container>
        </div>
      </article>
    </div>
  );
}
