import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";
import { Trip } from "@/components/Order/hooks/useGetUserTrips";

export const useGetUserTrips = (userId:string) => {
  const dispatch = useAppDispatch();

  const {selectedTripId} = useAppSelector(state=>state.dashboard);
  
  const handleTrackTrip = (tripId:string)=> {
    dispatch(setActiveSection('Track Order'))
    dispatch (setTrackingOrder(true))
    dispatch (setSelectedTripId(tripId))
  }
    const {data, isLoading, error } = useGetUserTripsQuery(userId);
    let trips = data?.trips;
    
    let otherTrips: Trip[] = [];
    trips?.dispatcher_trips 
    ?  otherTrips = trips?.dispatcher_trips.filter((trip: Trip) => trip.trip_id !== selectedTripId) 
    : otherTrips = trips?.customer_trips.filter((trip: Trip) => trip.trip_id !== selectedTripId)
    
    return {data, trips, isLoading,  error, handleTrackTrip, otherTrips}

}