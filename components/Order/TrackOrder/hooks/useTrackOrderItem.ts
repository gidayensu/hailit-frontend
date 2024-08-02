
import { calculateDistanceAndCost } from "@/lib/calculateDistanceAndCost";
import { useGetUserTrip } from "../../hooks/useGetUserTrip";
import { extractDateWithDayFromDate } from "@/lib/utils";
import { useUpdateUserTrip } from "../../hooks/useUpdateUserTrip";

type LocationType = [number, number]

export const useTrackOrderItem = ()=> {
    const { user_id,  trip } = useGetUserTrip();

  const dispatcher = trip?.dispatcher;
  const isCustomer = user_id === trip.customer_id;
  
  const tripRequestDate = extractDateWithDayFromDate(trip?.trip_request_date);
  const { handleTripUpdate, isLoading: tripUdpateLoading, isSuccess:tripUpdateSuccess, error:tripUdpateError } = useUpdateUserTrip();
  
  const dropOffLocation: LocationType = [+trip?.drop_lat, +trip?.drop_long]
  const pickUpLocation: LocationType = [+trip?.pick_lat, +trip?.pick_long]
  
  const [pickUpLat, pickUpLon] = pickUpLocation;
  const [dropOffLat, dropOffLon] = dropOffLocation;

const midPoint: LocationType = [
    (pickUpLat + dropOffLat) / 2,  
    (pickUpLon + dropOffLon) / 2   
];

  const distanceAndCost =
    
    calculateDistanceAndCost({
      lat1: +trip?.pick_lat,
      lon1: +trip?.pick_long,
      lat2: +trip?.drop_lat, 
      lon2: +trip?.drop_long,
    });

    const distance = distanceAndCost?.distance ?? 0;
    const tripOngoingStatus = ["Booked","Picked Up", "In Transit"]

    return {
        trip, midPoint, distance, tripOngoingStatus, tripRequestDate, isCustomer, dispatcher, dropOffLocation, pickUpLocation, handleTripUpdate, tripUdpateLoading, tripUdpateError, tripUpdateSuccess
    }
}