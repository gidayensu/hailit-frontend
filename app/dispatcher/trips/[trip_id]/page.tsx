'use client'
import { Button } from "@/components/ui/button";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import OrderUpdates from "@/components/Order/OrderUpdates";
import OrderSummary from "@/components/Order/OrderSummary";
import TrackOrderContainer from "@/components/Order/TrackOrder/TrackOrderContainer";
import Container from "@/components/ui/container";
import RecipientSenderCard from "@/components/Order/RecipientSenderCard";
import { redirect, useParams } from "next/navigation";
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { TopSkeleton } from "@/components/Order/OrderSkeleton";
import { MidSkeleton } from "@/components/Order/OrderSkeleton";
import { extractDateWithDayFromDate } from "@/lib/utils";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";



export default function DispatcherTrip () {
  const { user_role } = useGetDispatcher();
  if (user_role === "customer" || user_role === "admin" || !user_role) {
        redirect('/profile') 
    }
  let updateStatus = "Picked Up";
  const params = useParams();
  const { trip_id } = params;
  
  const { data, isLoading, error } = useGetTripQuery(`${trip_id}`);
  const trip = data?.trip
    const tripRequestDate = extractDateWithDayFromDate(trip?.trip_request_date)

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

  
  if(data && trip) {
    return (
        
      
        <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
      <span className="text-5xl font-bold">#{trip.trip_id}</span>
        <p className="text-md ">
          <b>Package Type:</b> {trip.package_type}
        </p>
        <p className="text-md ">
          <b>Request Date:</b> {tripRequestDate}
        </p>
        <p className="text-md ">
          <b>Trip Medium:</b> {trip.trip_medium}
        </p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
        
      <TrackOrderContainer headingText="Update Trip" >
          <Button variant={'outline'}> Mark as {updateStatus}</Button>
          
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Trip Status" >
          
          <OrderUpdates currentOrderStage={trip.trip_stage} currentOrderStatus={trip.trip_status}/>
        </TrackOrderContainer>
        
        <TrackOrderContainer headingText="LOCATION AND TIMELINE">
        <Container className="w-full flex flex-col gap-2 h-52 rounded-xl p-4 ">

          <OrderSummary trip={trip} />
        </Container>

        </TrackOrderContainer>

      {
        (trip.trip_status !== "Cancelled" || trip.trip_status !== "Delivered") && 
          <>
        <TrackOrderContainer headingText="Sender">
            <RecipientSenderCard location="Abuakwa Adumanu" identity="Sender" phoneNumber={trip.recipient_number}/>
        </TrackOrderContainer>

        <TrackOrderContainer headingText="Recipient">
            <RecipientSenderCard location="Bantama High Street" identity="Recipient" phoneNumber={trip.sender_number}/>
        </TrackOrderContainer>
          </>
        
      }

        
        <TrackOrderContainer headingText="Cost and Payment">
          <Container className=" w-full h-auto rounded-xl">
            <div className="grid grid-cols-3  p-3 ">
              <span className="text-[13px]">
                <p className=" font-bold">Amount</p>
                <p> {trip.trip_cost} </p>
              </span>
              <span className="text-[13px]">
                <p className=" font-bold">Status</p>
                <p> {trip.trip_payment ? 'Paid': 'Not Paid'}</p>
              </span>
              <span className="text-[13px]">
                <p className=" font-bold">Method</p>
                <p> MTN MoMo</p>
              </span>
            </div>
          </Container>
          
        </TrackOrderContainer>
      </MiddleSectionContainer>
    </main>
    
    )}

 
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