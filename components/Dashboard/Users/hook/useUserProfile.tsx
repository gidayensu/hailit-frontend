'use client'
import { useCallback, useEffect, useState } from "react";
import { useGetUserTrips } from "../../hooks/useGetUserTrips";
import {  useGetUserTripsQuery, useLazyDeleteTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { User } from "./useGetAllUsers";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { useGetUser } from "./useGetUser";
import { UserRole } from "@/lib/store/slice/userSlice";

//useUserProfile uses userRole to determine what to deselect (what to dispatch to go back to either all users/drivers/riders)
//router.back() would have been best if pages were used to navigate the dashboard. Since only states are used, states have to be changed
//to have a 'go back' experience. 
export const useUserProfile = (userRole?: UserRole)=> {
    const {selectedUserId} = useAppSelector(state=>state.dashboard);
    const {user} = useGetUser(selectedUserId)
    const {usersData} = useAppSelector(state=>state.dashboardTables);
    const [userTrips, setUserTrips] = useState<UserTrips>({
        current_trips: 0,
        customer_trips: [],
        delivered_trips: 0,
        total_trip_count: 0,
        cancelled_trips: 0
    });

    const dispatch = useAppDispatch();

    const {data, isLoading, error } = useGetUserTripsQuery(selectedUserId);
    const { handleTrackTrip} = useGetUserTrips(selectedUserId);
    const trips = data?.trips
    
    useEffect(()=>{
        if(error) {
            setUserTrips({
                current_trips: 0,
                customer_trips: [],
                delivered_trips: 0,
                total_trip_count: 0,
                cancelled_trips:0
            })
        }else {

            setUserTrips(trips)
        }
    }, [trips, error])

    const [deleteTrip, {data:deleteData, error:deleteError, isLoading:deleteLoading}] = useLazyDeleteTripQuery();
    
    const handleDeselect = useCallback( ()=> {
        
        dispatch(setSelectedUserId(''))
    }, [dispatch, setSelectedUserId])
    
    const handleDeleteTrip = (tripId:string)=> {
        deleteTrip(tripId)
        const customerTrips = userTrips.customer_trips.filter(trip=>trip.trip_id !==tripId)
        deleteData ? setUserTrips((prevTrips=>({...prevTrips, customer_trips: customerTrips}))) : deleteError
    }
    
    const selectedUser:User = usersData?.filter((user:User)=>user.user_id === selectedUserId)[0] || user;
    return {userTrips, handleDeleteTrip, error, deleteError, handleTrackTrip, selectedUser, isLoading, handleDeselect }
}

interface UserTrip {
    trip_id: string;
    dispatcher_id: string;
    trip_medium: "Motor" | "Car" | "Bicycle" | string;
    trip_status: "Requested" | "Pending" | "In Progress" | "Delivered" | "Cancelled";
    package_value: string;
    trip_area: string;
    recipient_number: string;
    sender_number: string;
    package_type: string;
    pickup_location: string;
    drop_off_location: string;
    additional_information: string;
    trip_request_date: string;
    trip_cost: string;
    payment_status: boolean;
    payment_method: "Cash on Delivery" | "Mobile Money" | "Card" | string;
  }
  
interface UserTrips {
    customer_trips: UserTrip[],
    total_trip_count: number, 
    delivered_trips: number, 
    current_trips: number, 
    cancelled_trips: number
 
}
