"use client";
//ui + icons
//main components
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import BigLoader from "../../Shared/BigLoader";
import EditTrip from "./Actions/EditTrip";
//hook
import { useGetTrip } from "./StatusSection/hook/useGetTrip";
import TripDetail from "./TripDetail";

export default function TrackOrder() {
  const {
    tripStage,
    tripStatus,
    trip,
    trackingOrder,
    
    inputRef,
    isLoading,
    handleTrackTrip,
    
    editingOrder
  } = useGetTrip();
  
  return (
    <main className="flex flex-col gap-5  md:h-full md:mb-0 mb-44 ">
      {/* HEADER */}
      {!trackingOrder && !editingOrder && (
        <TrackOrderForm inputRef={inputRef} onClickFunc={handleTrackTrip} />
      )}
      
      {trackingOrder && !editingOrder && isLoading  && <BigLoader />}

      {trackingOrder &&  !editingOrder && !isLoading && trip &&  (
        <TripDetail trip={trip}/>
        )}
      {editingOrder && <EditTrip trip={trip}/>}
    </main>
  );
}
