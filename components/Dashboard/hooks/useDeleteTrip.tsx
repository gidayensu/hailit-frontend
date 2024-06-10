import { useLazyDeleteTripQuery } from "@/lib/store/apiSlice/hailitApi";

export const useDeleteTrip = (tripId:string) => {
    const [deleteTrip, {data, isLoading, error}] = useLazyDeleteTripQuery();
    

}