import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";

export const useGetUserTrips = (userId: string) => {
  const { data, isLoading, error } = useGetUserTripsQuery(userId);
  let trips = data?.trips;

  return { data, trips, isLoading, error };
};
