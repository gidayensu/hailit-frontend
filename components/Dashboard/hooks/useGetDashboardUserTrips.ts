import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useGetTrip } from "../TrackOrder/StatusSection/hooks/useGetTrip";

export const useGetDashboardUserTrips = () => {
  const { trip, selectedTripId, } = useGetTrip();
  const { data, isLoading, error } = useGetUserTripsQuery(trip?.customer_id);
  const trips = data?.trips;

  return { data, trips, isLoading, error, selectedTripId };
};
