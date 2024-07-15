'use client'
import { TripStatus } from "@/components/Order/types/Types";
import { useDeleteTripMutation, useGetDriverQuery, useGetRiderQuery, useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection, setSelectedDriverId, setSelectedRiderId, setDispatcherRole, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";
import { useCallback, useEffect, useState } from "react";
import { useDeleteDispatcher } from "./useDeleteDispatcher";
import { useRouter } from "next/navigation";
import { UserTrip } from "../../hooks/useUserProfile";
//useDispatcherProfile uses dispatcherRole to determine what to deselect (what to dispatch to go back to either all users/drivers/riders)
//router.back() would have been best if pages were used to navigate the dashboard. Since only states are used, states have to be changed
//to have a 'go back' experience. 

export type DispatcherRole = "Rider" | "Driver";

export const useDispatcherProfile = ()=> {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const {dispatcherRole, selectedDriverId, selectedRiderId } = useAppSelector(state=>state.dashboard)

    const handleSetDispatcherRole = (dispatcherRole: DispatcherRole) => {

        dispatch(setDispatcherRole(dispatcherRole))
    }
    
    const {data:driverData, isLoading:driverLoading, error:driverError} = useGetDriverQuery(selectedDriverId);
    const {data:riderData, isLoading:riderLoading, error:riderError} = useGetRiderQuery(selectedRiderId);

    
        //dispathcerId is the id of the dispatcher in the rider/driver table
    const dispatcherId = dispatcherRole === "Driver" ? driverData?.driver?.driver_id : riderData?.rider?.rider_id
    
    const {
        handleDeleteDispatcher, 
        deleteError: dispatcherDeleteError,
        deleteLoading: dispatcherDeleteLoading,
        deleteSuccess: dispatcherDeleteSuccess
    } = useDeleteDispatcher({dispatcherId, userRole: dispatcherRole});
    
    const driver = driverData?.driver;
    const rider = riderData?.rider
    
    const roleMapping = {
        Driver: {
            dispatcherUserId: driverData?.driver?.user_id,
            selectedDispatcher: {...driver, user_role: dispatcherRole},
            dispatcherLoading: driverLoading,
            dispatcherError: driverError,
            
        },
        Rider: {
            dispatcherUserId: riderData?.rider?.user_id,
            selectedDispatcher: {...rider, user_role: dispatcherRole},
            dispatcherLoading: riderLoading,
            dispatcherError: riderError,
            
        }
    };

    
    
    const {
      dispatcherError,
      //dispatcherUserId is the user_id of the dispatcher in the users table
      dispatcherUserId,
      selectedDispatcher,
      dispatcherLoading,

    } = roleMapping[dispatcherRole];
    
    
    
    const [dispatcherTrips, setDispatcherTrips] = useState<dispatcherTrips>({
        current_trips: 0,
        dispatcher_trips: [],
        delivered_trips: 0,
        total_trip_count: 0,
        cancelled_trips: 0,
        total_earnings: 0
    });

    const total_trip_count = dispatcherTrips?.total_trip_count;

    const allDispatcherTrips = dispatcherTrips?.dispatcher_trips;
    
    const {data, isLoading, error } = useGetUserTripsQuery(dispatcherUserId);
    const handleTrackTrip = (tripId:string)=> {
        dispatch(setActiveSection('Track Order'))
        
        dispatch (setSelectedTripId(tripId))
        router.push('/dashboard/track-order')
      }
    
    const trips = data?.trips

    
    
    const handleSelectedRiderId = (riderId: string)=> {
        dispatch(setSelectedRiderId(riderId))
    }
    const handleSelectedDriverId = (driverId: string)=> {
        dispatch(setSelectedDriverId(driverId))
    }
    useEffect(()=>{
        if(error) {
            setDispatcherTrips({
                current_trips: 0,
                dispatcher_trips: [],
                delivered_trips: 0,
                total_trip_count: 0,
                cancelled_trips:0, 
                total_earnings: 0
            })
        }else {

            setDispatcherTrips(trips)
        }
    }, [trips, error, setDispatcherTrips])

    const [deleteTrip, {data:deleteData, error:deleteError, isLoading:deleteLoading}] = useDeleteTripMutation();
    
    const handleDeselect = useCallback( ()=> {
        dispatcherRole === "Driver" ?   dispatch(setSelectedDriverId('')) : dispatch(setSelectedRiderId(''))
    }, [dispatch, setSelectedDriverId, setSelectedRiderId])
    
    const handleDeleteTrip = (tripId:string)=> {
        deleteTrip(tripId)
        const trips = dispatcherTrips.dispatcher_trips.filter(trip=>trip.trip_id !==tripId)
        deleteData ? setDispatcherTrips((prevTrips=>({...prevTrips, dispatcher_trips: trips}))) : deleteError
    }
    
    
    
    return {
      dispatcherTrips,
      handleDeleteTrip,
      error,
      deleteError,
      dispatcherUserId,
      handleTrackTrip,
      selectedDispatcher,
      dispatcherError,
      isLoading,
      handleDeselect,
      handleSelectedRiderId,
      handleSelectedDriverId,
      dispatcherLoading,
      handleDeleteDispatcher,
      dispatcherDeleteError,
      dispatcherDeleteLoading, 
      dispatcherDeleteSuccess,
      total_trip_count,
      handleSetDispatcherRole,
      selectedDriverId, selectedRiderId,
      allDispatcherTrips
    };
}

  
interface dispatcherTrips {
    dispatcher_trips: UserTrip[],
    total_trip_count: number, 
    delivered_trips: number, 
    current_trips: number, 
    cancelled_trips: number
    total_earnings: number
 
}
