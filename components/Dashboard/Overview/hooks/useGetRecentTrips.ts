import { useGetAllTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export type TripsColumns = (typeof tableHeadings)[number];

export const useGetRecentTrips = () => {
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string>("");
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleTrackTrip = useCallback(
    (tripId: string) => {
      setTripLoading(true);
      setSelectedTripId(tripId);
      router.push(`/dashboard/track-order/${tripId}`);
    },
    [dispatch]
  );

  const { data, isLoading, error, isSuccess } = useGetAllTripsQuery(
    `trips?&sortColumn=Booked%20On&sortDirection=DESC&page=1`,
    {
      pollingInterval: 5000,
      skipPollingIfUnfocused: true,
    }
  );

  const trips = data?.trips;

  return {
    data,
    trips,
    handleTrackTrip,
    isLoading,
    error,
    selectedTripId,
    tripLoading,
    isSuccess,
  };
};

const tableHeadings = [
  "Trip id",
  "Ordered by",
  "Booked On",
  "Pickup",
  "Pickup Contact",
  "Drop off",
  "Drop off Contact",
  "Delivered On",
  "Medium",
  "Amount",
  "Payment Status",
  // "Payment Method",
  "Delivery Status",
  "View",
] as const;
