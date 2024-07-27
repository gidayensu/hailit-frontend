'use client'

//main components
import { MidSkeleton, TopSkeleton } from "@/components/Order/OrderSkeleton";
import TrackOrder from "@/components/Order/TrackOrder/UserTrackOrder";
import ErrorComponent from "@/components/Shared/ErrorComponent";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import TrackOrderItem from "./TrackOrderItem";

//helper functions
import { useGetUserTrip } from "../hooks/useGetUserTrip";

export default  function TrackOrderDetails() {
  
  const {trip_id, data, isLoading, error, trip } = useGetUserTrip();
     

  
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

  if (!data || !trip) {
    
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-4xl font-bold ">No trip is associated with ID {trip_id}</span>
          <p className="text-md">
            Check the trip ID and ensure that you are not missing a value and
            search again
          </p>
        </TopSectionContainer>
        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          <TrackOrder />
        </MiddleSectionContainer>
      </main>
    );
  }
  if (error) {
    return (
      <ErrorComponent errorCode={500} errorMessage="Server Error Occurred" url="/"/>
      
    );
  }

  
  return (
    <TrackOrderItem/>  );
}
