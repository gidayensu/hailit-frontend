import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";
import { Trip } from "@/lib/store/slice/tripSlice";

export const useGetUserTrips = (userId:string) => {
  const dispatch = useAppDispatch();

  const {selectedTripId} = useAppSelector(state=>state.dashboard);
  
  const handleTrackTrip = (tripId:string)=> {
    dispatch(setActiveSection('Track Order'))
    dispatch (setSelectedTripId(tripId))
    dispatch (setTrackingOrder(true))
    window.scrollTo(0,0)
  }
    const {data, isLoading, error } = useGetUserTripsQuery(userId);
    let trips = data?.trips;
    

    
    return {data, trips, isLoading,  error, handleTrackTrip, }

}