import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DispatcherTrip } from "@/components/Order/hooks/useGetUserTrips";



const initialState: DispatcherTripsDetails = {
    tripId: '',
    trip: {
        trip_id: '',
  trip_medium: '',
  trip_status: 'Booked',
  trip_stage: 0,
  trip_type: '',
  pickup_location: '',
  drop_off_location: '',
  package_type: '',
  trip_commencement_date: null,
  trip_completion_date: null,
  trip_cost: 0,
  trip_request_date: null,
  payment_method: '',
  recipient_number: '',
  sender_number: '',
  payment_status: false,
  customer_id: '',
  dispatcher_id: '',
  dispatcher_rating: null,
  rated: false,
  rating_comment: '',
  promo_code: '',
  trip_area: '',
  additional_information: '',
  user_id: '',
  rating_count: 0,
  cumulative_rating: '',
      },
    dispatcherDeliveredTrips: [],
    dispatcherCurrentTrips: [],
    totalEarnings: 0,
    
        
    
    dispatcherCurrentTripsCount: 0,
    dispatcherDeliveredTripsCount: 0,
    dispatcherPreviousTrips: [], 
    dispatcherEarnings: 0

}

export const dispatcherSlice = createSlice({
    name: "dispatcher",
    initialState,
    reducers: {
        setDispatcherTripDetails (state, action:PayloadAction<DispatcherTripsDetails>) {
            
            return action.payload
        },
        setDispatcherTripId (state, action:PayloadAction<string>) {
            state.tripId = action.payload
        },
        setDispatcherTrip (state, action:PayloadAction<any>) {
            
            state.trip = action.payload
        },
        setDispatcherStats (state, action:PayloadAction<DispatcherStats>) {
            state.dispatcherDeliveredTripsCount = action.payload.dispatcherDeliveredTripsCount
            state.dispatcherCurrentTripsCount = action.payload.dispatcherCurrentTripsCount
            state.totalEarnings = action.payload.totalEarnings
        }
        
    }

})

export const {
  setDispatcherTrip,
  setDispatcherStats,
  setDispatcherTripId,
  setDispatcherTripDetails,
} = dispatcherSlice.actions;


interface DispatcherTripsDetails {
    tripId: string,
    trip: any
    dispatcherDeliveredTrips: [],
    totalEarnings: number,
    dispatcherCurrentTrips: [],
    dispatcherPreviousTrips: [],
    dispatcherCurrentTripsCount: number, 
    dispatcherDeliveredTripsCount: number,
    dispatcherEarnings: number,
}



interface DispatcherStats {
    dispatcherDeliveredTripsCount: number,
    totalEarnings: number,
    dispatcherCurrentTripsCount: number
}


