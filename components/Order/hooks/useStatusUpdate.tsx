"use client";
import { useLazyUpdateTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPreviousSelectedTripId, setTripStatus,TripStatus,TripStatusandStage} from "@/lib/store/slice/dashboardSlice";

import { useCallback, useState } from "react";
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";

export const useStatusUpdate = ()=> {
  
  const [localTripStatus, setLocalTripStatus] = useState<TripStatusandStage>({
    tripStage: 1,
    tripStatus: "Booked",
    tripCommencementDate: null,
    tripCompletionDate: null,
  });

  const [loading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { selectedTripId, tripStatus, tripStage, } = useAppSelector(
    (state) => state.dashboard
  );

  const {data:trip } = useGetTripQuery(`${selectedTripId}`)

  const [
    updateTrip,
    { data: updateData, isLoading: updateLoading, error: updateError },
  ] = useLazyUpdateTripQuery();

  
  const handleUpdateDashboardTrip = useCallback((statusDetails: TripStatusandStage) => {
    setLocalTripStatus({
      tripStatus: statusDetails.tripStatus,
      tripStage: statusDetails.tripStage,
      tripCommencementDate: statusDetails.tripCommencementDate,
      tripCompletionDate: statusDetails.tripCompletionDate

    });
    
    setIsLoading(true);
     updateTrip({
      tripId: selectedTripId,
      tripDetails: {
        trip_status: statusDetails.tripStatus,
        trip_stage: statusDetails.tripStage,
        trip_commencement_date: statusDetails.tripCommencementDate,
        trip_completion_date: statusDetails.tripCompletionDate
      },
    });
  }
, [dispatch, selectedTripId]) 
  if (
    
    updateData?.trip &&
    tripStatus !== localTripStatus.tripStatus
  ) {
    dispatch(
      setTripStatus({
        tripStage: localTripStatus.tripStage,
        tripStatus: localTripStatus.tripStatus,
        tripCommencementDate: localTripStatus.tripCommencementDate,
        tripCompletionDate: localTripStatus.tripCompletionDate
      })
    );
    dispatch(setPreviousSelectedTripId([selectedTripId]))
    setIsLoading(false);
  }

  return {updateData, trip, handleUpdateDashboardTrip, updateTrip, loading, localTripStatus,tripStatus, tripStage, updateLoading, updateError}

}
