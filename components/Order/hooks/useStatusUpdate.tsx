"use client";
import { useLazyUpdateTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPreviousSelectedTripId, setTripStatus,TripStatus,TripStatusandStage} from "@/lib/store/slice/dashboardSlice";

import { useCallback, useState } from "react";


export const useStatusUpdate = ()=> {
  
  const [localTripStatus, setLocalTripStatus] = useState<TripStatusandStage>({
    tripStage: 1,
    tripStatus: "Booked",
  });

  const [loading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { selectedTripId, tripStatus, tripStage } = useAppSelector(
    (state) => state.dashboard
  );



  const [
    updateTrip,
    { data: updateData, isLoading: updateLoading, error: updateError },
  ] = useLazyUpdateTripQuery();

  
  const handleUpdateDashboardTrip = useCallback((statusDetails: TripStatusandStage) => {
    setLocalTripStatus({
      tripStatus: statusDetails.tripStatus,
      tripStage: statusDetails.tripStage,
    });
    
    setIsLoading(true);
     updateTrip({
      tripId: selectedTripId,
      tripDetails: {
        trip_status: statusDetails.tripStatus,
        trip_stage: statusDetails.tripStage,
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
      })
    );
    dispatch(setPreviousSelectedTripId([selectedTripId]))
    setIsLoading(false);
  }

  return {updateData, handleUpdateDashboardTrip, updateTrip, loading, localTripStatus,tripStatus, tripStage, updateLoading, updateError}

}
