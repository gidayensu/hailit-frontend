"use client";
//ui + icons
//main components
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import BigLoader from "../../Shared/BigLoader";
import EditTrip from "./Actions/EditTrip";
//hook
import { useGetTrip } from "./StatusSection/hook/useGetTrip";
import TripDetail from "./TripDetail";

export default function  TrackOrder() {
  const {
    trip,
    trackingOrder,
    inputRef,
    isLoading,
    handleTrackTrip,
    error,
    editingOrder,
    selectedTripId
  } = useGetTrip();
  

  return (
    <main className="flex flex-col gap-5  md:h-full md:mb-0  ">
      {/* HEADER */}
      
      {trackingOrder && !editingOrder && isLoading && !error  && <BigLoader />}

      {trackingOrder &&  !editingOrder && !isLoading && trip &&   !error  && (
        <TripDetail  trip={trip}/>
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
          <TrackOrderForm inputRef={inputRef} onClickFunc={handleTrackTrip} />
        </>
      )}
      {editingOrder && <EditTrip />}
    </main>
  );
}
