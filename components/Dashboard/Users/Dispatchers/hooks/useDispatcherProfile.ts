"use client";
import {
  useGetUserTripsQuery,
  useLazyGetDriverQuery,
  useLazyGetRiderQuery
} from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setDispatcherRole,
  setSelectedDriverId,
  setSelectedRiderId
} from "@/lib/store/slice/dashboardSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { UserTrip } from "../../hooks/useUserProfile";
//useDispatcherProfile uses dispatcherRole to determine what to deselect (what to dispatch to go back to either all users/drivers/riders)
//router.back() would have been best if pages were used to navigate the dashboard. Since only states are used, states have to be changed
//to have a 'go back' experience.

export type DispatcherRole = "Rider" | "Driver";

export const useDispatcherProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { dispatcherRole, selectedDriverId, selectedRiderId } = useAppSelector(
    (state) => state.dashboard
  );

  const handleSetDispatcherRole = (dispatcherRole: DispatcherRole) => {
    dispatch(setDispatcherRole(dispatcherRole));
  };
  const [ getRider, {
    data: riderData,
    isLoading: riderLoading,
    error: riderError,
  }] = useLazyGetRiderQuery();
  
  
  const [ getDriver, {
    data: driverData,
    isLoading: driverLoading,
    error: driverError,
  }] = useLazyGetDriverQuery();
  
  //dispathcerId is the id of the dispatcher in the rider/driver table
  useEffect(()=> {

    if(dispatcherRole === "Driver") {
      getDriver(selectedDriverId)
    } 
  
    if(dispatcherRole === "Rider") {
      getRider(selectedRiderId)
    }
  }, [dispatcherRole, selectedRiderId, selectedDriverId, getDriver, getRider])

  const dispatcherId =
    dispatcherRole === "Driver"
      ? driverData?.driver?.driver_id
      : riderData?.rider?.rider_id;

  

  //delete success redirect

  const driver = driverData?.driver;
  const rider = riderData?.rider;

  const dispatcherRoleMapping = {
    Driver: {
      dispatcherUserId: driverData?.driver?.user_id,
      selectedDispatcher: driver && { ...driver, user_role: dispatcherRole },
      dispatcherLoading: driverLoading,
      dispatcherError: driverError,
    },
    Rider: {
      dispatcherUserId: riderData?.rider?.user_id,
      selectedDispatcher: rider && { ...rider, user_role: dispatcherRole },
      dispatcherLoading: riderLoading,
      dispatcherError: riderError,
    },
  };

  const {
    dispatcherError,
    dispatcherUserId,
    selectedDispatcher,
    dispatcherLoading,
  } = dispatcherRoleMapping[dispatcherRole];

  const [dispatcherTrips, setDispatcherTrips] = useState<DispatcherTrips>({
    current_trips: 0,
    dispatcher_trips: [],
    delivered_trips: 0,
    total_trip_count: 0,
    cancelled_trips: 0,
    total_earnings: 0,
  });

  const total_trip_count = dispatcherTrips?.total_trip_count;

  const allDispatcherTrips = dispatcherTrips?.dispatcher_trips;

  const { data, isLoading, error } = useGetUserTripsQuery(dispatcherUserId);
  const handleTrackTrip = (tripId: string) => {
    

    
    router.push(`/dashboard/track-order/${tripId}`);
  };

  const trips: DispatcherTrips = data?.trips;

  const handleSelectedRiderId = (riderId: string) => {
    dispatch(setSelectedRiderId(riderId));
  };

  const handleSelectedDriverId = (driverId: string) => {
    dispatch(setSelectedDriverId(driverId));
  };
  useEffect(() => {
    //redirect based on delete

    if (error) {
      setDispatcherTrips({
        current_trips: 0,
        dispatcher_trips: [],
        delivered_trips: 0,
        total_trip_count: 0,
        cancelled_trips: 0,
        total_earnings: 0,
      });
    } else {
      setDispatcherTrips(trips);
    }
  }, [trips, error, setDispatcherTrips]);


  const handleDeselect = useCallback(() => {
    dispatcherRole === "Driver"
      ? dispatch(setSelectedDriverId(""))
      : dispatch(setSelectedRiderId(""));
  }, [dispatch, setSelectedDriverId, setSelectedRiderId]);


  return {
    dispatcherRole,
    dispatcherTrips,
    
    error,
    
    dispatcherUserId,
    handleTrackTrip,
    selectedDispatcher,
    dispatcherError,
    isLoading,
    handleDeselect,
    handleSelectedRiderId,
    handleSelectedDriverId,
    dispatcherLoading,
    dispatcherId,
    total_trip_count,
    handleSetDispatcherRole,
    selectedDriverId,
    selectedRiderId,
    allDispatcherTrips,
  };
};

interface DispatcherTrips {
  dispatcher_trips: UserTrip[];
  total_trip_count: number;
  delivered_trips: number;
  current_trips: number;
  cancelled_trips: number;
  total_earnings: number;
}
