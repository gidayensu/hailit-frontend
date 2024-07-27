'use client'
import { PackageType, TripArea, TripMedium, TripStatus } from "@/components/Order/types/Types";
import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { User } from "./useUsersTable";
import { useGetUser } from "./useGetUser";
import { PaymentMethod } from "@/components/Order/types/Types";

//useUserProfile uses userRole to determine what to deselect (what to dispatch to go back to either all users/drivers/riders)
//router.back() would have been best if pages were used to navigate the dashboard. Since only states are used, states have to be changed
//to have a 'go back' experience. 
export const useUserProfile = ()=> {
    
    const {selectedUserId} = useAppSelector(state=>state.dashboard);
    const {user} = useGetUser(selectedUserId)
    const [userTrips, setUserTrips] = useState<UserTrips>({
        current_trips: 0,
        customer_trips: [],
        delivered_trips: 0,
        total_trip_count: 0,
        cancelled_trips: 0
    });

    const customerTrips = userTrips?.customer_trips
    

    const {data, isLoading, error } = useGetUserTripsQuery(selectedUserId);
    
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
        } else {

            setUserTrips(trips)
        }
    }, [trips, error])

    
    
    
    
    
    const selectedUser:User = user;
    return {userTrips, customerTrips,  error,  selectedUser, isLoading,  }
}

export interface UserTrip {
    trip_id: string;
    dispatcher_id: string;
    trip_medium: TripMedium;
    trip_status: TripStatus
    package_value: string;
    trip_area: TripArea;
    recipient_number: string;
    sender_number: string;
    package_type: PackageType;
    pickup_location: string;
    drop_off_location: string;
    additional_information: string;
    trip_request_date: null | Date | string;
    trip_completion_date: null | Date | string;
    trip_cost: string;
    payment_status: boolean;
    payment_method: PaymentMethod | '';
  }
  
interface UserTrips {
    customer_trips: UserTrip[],
    total_trip_count: number, 
    delivered_trips: number, 
    current_trips: number, 
    cancelled_trips: number
 
}
