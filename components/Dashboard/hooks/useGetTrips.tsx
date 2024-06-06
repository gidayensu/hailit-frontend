import { useGetAllTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";

export const useGetTrips = ({limit, offset}: {limit?: number, offset?:number})=> {
  

  const dispatch = useAppDispatch();
  
  const handleTrackTrip = (tripId:string)=> {
    dispatch(setActiveSection('Track Order'))
    dispatch (setTrackingOrder(true))
    dispatch (setSelectedTripId(tripId))
  }  
  let endpoint = 'trips';
   offset && limit ? endpoint = `trips?limit=${limit}&offset=${offset}` : limit ? endpoint = `trips?limit=${limit}` : ''
  
  const {data, isLoading, error} = useGetAllTripsQuery(endpoint);
  
  const trips = data?.trips
  const total_number_of_pages = data?.total_number_of_pages
    
  return {total_number_of_pages, data, trips, handleTrackTrip, isLoading, error}

  }
  
