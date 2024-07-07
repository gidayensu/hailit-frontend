'use client'
import { useGetUserTrips } from "@/components/Dashboard/hooks/useGetUserTrips";
import { useDeleteTripMutation, useGetDriverQuery, useGetRiderQuery, useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedDriverId, setSelectedRiderId, setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { useCallback, useEffect, useState } from "react";
import { OrderStatus } from "@/components/Dashboard/TrackOrder/StatusSection/hook/useGetTrip";
import { useDeleteDispatcher } from "./useDeleteDispatcher";
//useDispatcherProfile uses userRole to determine what to deselect (what to dispatch to go back to either all users/drivers/riders)
//router.back() would have been best if pages were used to navigate the dashboard. Since only states are used, states have to be changed
//to have a 'go back' experience. 
export const useDispatcherProfile = (userRole: "Driver" | "Rider")=> {
    
    const {selectedDriverId, selectedRiderId} = useAppSelector(state=>state.dashboard);
    const {data:driverData, isLoading:driverLoading, error:driverError} = useGetDriverQuery(selectedDriverId);
    const {data:riderData, isLoading:riderLoading, error:riderError} = useGetRiderQuery(selectedRiderId);

        //dispathcerId is the id of the dispatcher in the rider/driver table
    const dispatcherId = userRole === "Driver" ? driverData?.driver?.driver_id : riderData?.rider?.rider_id
    
    const {
        handleDeleteDispatcher, 
        driverDeleteError, 
        driverDeleteLoading, 
        riderDeleteError, 
        riderDeleteLoading, 
        riderDeleteSuccess, 
        driverDeleteSuccess
    } = useDeleteDispatcher({dispatcherId, userRole});
    
    const driver = driverData?.driver;
    const rider = riderData?.rider
    
    const roleMapping = {
        Driver: {
            dispatcherUserId: driverData?.driver?.user_id,
            selectedDispatcher: {...driver, user_role: userRole},
            dispatcherLoading: driverLoading,
            dispatcherError: driverError,
            deleteLoading: driverDeleteLoading,
            deleteError: driverDeleteError,
            deleteSuccess: driverDeleteSuccess
        },
        Rider: {
            dispatcherUserId: riderData?.rider?.user_id,
            selectedDispatcher: {...rider, user_role: userRole},
            dispatcherLoading: riderLoading,
            dispatcherError: riderError,
            deleteLoading: riderDeleteLoading,
            deleteError: riderDeleteError,
            deleteSuccess: riderDeleteSuccess
        }
    };
    
    const {
      dispatcherError,
      //dispatcherUserId is the user_id of the dispatcher in the users table
      dispatcherUserId,
      selectedDispatcher,
      dispatcherLoading,
      deleteLoading: dispatcherDeleteLoading,
      deleteError: dispatcherDeleteError,
      deleteSuccess: dispatcherDeleteSuccess,
    } = roleMapping[userRole];
    
    
    
    const [dispatcherTrips, setDispatcherTrips] = useState<dispatcherTrips>({
        current_trips: 0,
        dispatcher_trips: [],
        delivered_trips: 0,
        total_trip_count: 0,
        cancelled_trips: 0,
        total_earnings: 0
    });

    //set selected rider id

    const dispatch = useAppDispatch();
    
    const {data, isLoading, error } = useGetUserTripsQuery(dispatcherUserId);
    const { handleTrackTrip} = useGetUserTrips(dispatcherUserId);
    
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
        userRole === "Driver" ?   dispatch(setSelectedDriverId('')) : dispatch(setSelectedRiderId(''))
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
      dispatcherDeleteSuccess
    };
}

export interface UserTrip {
    trip_id: string;
    dispatcher_id: string;
    trip_medium: "Motor" | "Car" | "Bicycle" | string;
    trip_status: OrderStatus
    package_value: string;
    trip_area: string;
    recipient_number: string;
    sender_number: string;
    package_type: string;
    pickup_location: string;
    drop_off_location: string;
    additional_information: string;
    trip_request_date: string;
    trip_completion_date: string;
    trip_cost: string;
    payment_status: boolean;
    payment_method: "Cash on Delivery" | "Mobile Money" | "Card" | string;
  }
  
interface dispatcherTrips {
    dispatcher_trips: UserTrip[],
    total_trip_count: number, 
    delivered_trips: number, 
    current_trips: number, 
    cancelled_trips: number
    total_earnings: number
 
}
