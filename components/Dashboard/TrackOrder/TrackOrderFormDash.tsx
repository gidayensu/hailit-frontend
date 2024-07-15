"use client";

import TrackOrderForm from "@/components/Form/TrackOrderForm";
//hook
import { useGetTrip } from "./StatusSection/hook/useGetTrip";

export default function TrackOrderFormDash() {
  const {
    trip,
    trackingOrder,
    inputRef,
    isLoading,
    handleTrackTrip,
    error,
    editingOrder,
    selectedTripId,
  } = useGetTrip();

  return (
    <main className="flex flex-col gap-5  md:h-full md:mb-0  ">
            
        <TrackOrderForm inputRef={inputRef} onClickFunc={handleTrackTrip} />
      

     
    </main>
  );
}
