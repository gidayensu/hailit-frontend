import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";

export const useGetUserTrips = (userId:string) => {
  const dispatch = useAppDispatch();
  const handleTrackTrip = (tripId:string)=> {
    dispatch(setActiveSection('Track Order'))
    dispatch (setTrackingOrder(true))
    dispatch (setSelectedTripId(tripId))
  }
    const {data, isLoading } = useGetUserTripsQuery(userId);
    const trips = data?.trips;
    return {data, isLoading, trips, handleTrackTrip}

}