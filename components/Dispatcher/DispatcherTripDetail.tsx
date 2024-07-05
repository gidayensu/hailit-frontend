"use client";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import { MidSkeleton, TopSkeleton } from "@/components/Order/OrderSkeleton";
import OrderSummary from "@/components/Order/OrderSummary";
import OrderUpdates from "@/components/Order/OrderUpdates";
import RecipientSenderCard from "@/components/Order/RecipientSenderCard";
import TrackOrderContainer from "@/components/Order/TrackOrder/TrackOrderContainer";
import Loader from "@/components/Shared/Loader";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { TripStage, TripStatus } from "@/lib/store/slice/dashboardSlice";
import { redirect } from "next/navigation";
import { useUpdateDispatcherTrip } from "./hook/useUpdateDispatcherTrip";

export default function DispatcherTripDetail () {
    const {
      handleDispatcherUpdateTrip,
      updateLoading,
      isLoading,
      trip,
      data,
      error,
      tripRequestDate,
      
    } = useUpdateDispatcherTrip();
    
    
  const { user_role } = useGetDispatcher();
  if (user_role === "customer" || !user_role) {
    redirect("/profile");
  }
  let updateStatus: TripStatus = "Picked Up";
  let updateStage: TripStage = 2;
  
  switch (trip?.trip_status) {
    case "Booked":
      updateStatus = "Picked Up";
      break;
    case "Picked Up":
      updateStatus = "In Transit";
      updateStage = 3;
      break;
    case "In Transit":
      updateStatus = "Delivered";
      updateStage = 4;
      break;
  }
  
  
  if (isLoading) {
      return (
          <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <TopSkeleton />
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          <MidSkeleton />
        </MiddleSectionContainer>
      </main>
    );
  }

  if (data && trip) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold">#{trip?.trip_id}</span>
          <p className="text-md ">
            <b>Package Type:</b> {trip?.package_type}
          </p>
          <p className="text-md ">
            <b>Request Date:</b> {tripRequestDate}
          </p>
          <p className="text-md ">
            <b>Trip Medium:</b> {trip?.trip_medium}
          </p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          {!(trip?.trip_status === "Delivered" ||
            trip?.trip_status === "Cancelled") && (
            <TrackOrderContainer headingText="Update Trip">
              <Button
                variant={"outline"}
                onClick={() =>
                  handleDispatcherUpdateTrip(trip?.trip_id, updateStatus, updateStage)
                  }
                disabled = {updateLoading}
              >
                
                {updateLoading ? <Loader color="text-primary-color"/>  : `Mark as ${updateStatus}`}
              </Button>
            </TrackOrderContainer>
          )}

          <TrackOrderContainer headingText="Trip Status">
            <OrderUpdates
              currentOrderStage={trip?.trip_stage}
              currentOrderStatus={trip?.trip_status}
            />
          </TrackOrderContainer>

          <TrackOrderContainer headingText="Location and Timeline">
            <Container className="w-full flex flex-col gap-2 md:h-52 max-h-64 rounded-xl p-4 ">
              <OrderSummary trip={trip} />
            </Container>
          </TrackOrderContainer>

          {!(trip?.trip_status === "Delivered" ||
            trip?.trip_status === "Cancelled" ) && (
            <>
              {/* SENDER */}
              <TrackOrderContainer headingText="Sender Location">
                <RecipientSenderCard
                  location={trip?.pickup_location}
                  identity="Sender"
                  phoneNumber={trip?.recipient_number}
                />
              </TrackOrderContainer>
              {/* RECIPIENT */}
              <TrackOrderContainer headingText="Recipient Location">
                <RecipientSenderCard
                  location={trip?.drop_off_location}
                  identity="Recipient"
                  phoneNumber={trip?.sender_number}
                />
              </TrackOrderContainer>
            </>
          )}

          <TrackOrderContainer headingText="Cost and Payment">
            <Container className=" w-full h-auto rounded-xl">
              <div className="grid grid-cols-3  p-3 ">
                <span className="text-[13px]">
                  <p className=" font-bold">Amount</p>
                  <p> {trip?.trip_cost} </p>
                </span>
                <span className="text-[13px]">
                  <p className=" font-bold">Status</p>
                  <p> {trip?.payment_status ? "Paid" : "Not Paid"}</p>
                </span>
                <span className="text-[13px]">
                  <p className=" font-bold">Method</p>
                  <p> {trip?.payment_method}</p>
                </span>
              </div>
            </Container>
          </TrackOrderContainer>
        </MiddleSectionContainer>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-4xl font-bold ">No Trip Found</span>
          <p className="text-lg font-bold">Check Trip ID and Retry</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          <MidSkeleton />
        </MiddleSectionContainer>
      </main>
    );
  }
}
