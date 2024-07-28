"use client";

//main components
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import BigLoader from "../../Shared/BigLoader";
//hook
import { useGetTrip } from "./StatusSection/hooks/useGetTrip";
import TripDetail from "./TripDetail";

export default function  TrackOrder() {
  const {
    trip,
    inputRef,
    isLoading,
    handleTrackTrip,
    error,
    selectedTripId
  } = useGetTrip();
  

  return (
    <main className="flex flex-col gap-5  md:h-full md:mb-0  ">
      {/* HEADER */}
      
      {isLoading && !error  && <BigLoader />}

      {!isLoading && trip &&   !error  && (
        <TripDetail  />
        )}
       {error && selectedTripId && (
        <>
          <span className="text-4xl font-bold ">
            No trip is associated with ID {selectedTripId}
          </span>
          <p className="text-md">
            Check the trip ID and ensure that you are not missing a value and
            search again
          </p>
          <TrackOrderForm inputRef={inputRef} handleTrackOrder={handleTrackTrip} />
        </>
      )}
      
    </main>
  );
}
