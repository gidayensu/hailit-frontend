import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAllTripsTable = ()=> {
    const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const [page, setPage] = useState<number> (1);
  const router = useRouter();
  const tripTrack = (tripId:string)=> {
    setTripLoading(true);
    setSelectedTripId(tripId)
    router.push(`/dashboard/track-order/${tripId}`)
  }

  return {router, tripLoading, setTripLoading, selectedTripId, setSelectedTripId, tripTrack, page, setPage}
} 