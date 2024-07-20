import { Trip } from "@/lib/store/slice/tripSlice";
import { extractDateWithDayFromDate, extractShortDate, extractTimeFromDate } from "@/lib/utils";

export const tripDates = (trip:Trip)=> {
    const { trip_request_date, trip_commencement_date, trip_completion_date } =  trip;
    const tripRequestDate = extractDateWithDayFromDate(trip_request_date) || 'TBD';
    const tripCommencementDate = extractShortDate(trip_commencement_date ) || 'TBD';
    const tripCompletionDate = extractShortDate(trip_completion_date) || 'TBD';
    const tripCommencementTime = extractTimeFromDate(trip_commencement_date) || 'TBD';
    const tripCompletionTime = extractTimeFromDate(trip_completion_date) || 'TBD';
  
  return {tripRequestDate, tripCommencementDate, tripCompletionDate, tripCompletionTime, tripCommencementTime}
  }