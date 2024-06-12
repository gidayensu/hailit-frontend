import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TripStatus, TripStage } from "./dashboardSlice";

;

interface DispatcherTripsDetails {
    tripId: string,
    tripStatus: TripStatus,
    tripStage: TripStage
    dispatcherDeliveredTrips: [],
    totalEarnings: number,
    dispatcherCurrentTrips: [],
    dispatcherPreviousTrips: [],
    dispatcherCurrentTripsCount: number, 
    dispatcherDeliveredTripsCount: number,
    dispatcherEarnings: number,
    commencementDate: null | Date,
    completionDate: null | Date,
    
}


interface StatusUpdate {
    tripId: string,
    tripStatus: TripStatus,
    tripStage: TripStage,
}
interface DispatcherStats {
    dispatcherDeliveredTripsCount: number,
    totalEarnings: number,
    dispatcherCurrentTripsCount: number
}



const initialState: DispatcherTripsDetails = {
    tripId: '',
    tripStatus: "Booked",
    dispatcherDeliveredTrips: [],
    dispatcherCurrentTrips: [],
    totalEarnings: 0,
    tripStage: 1,
    commencementDate: null, 
    completionDate: null,
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
            console.log(action.payload)
            return action.payload
        },
        setDispatcherTripStatus (state, action:PayloadAction<StatusUpdate>) {
            state.tripId = action.payload.tripId
            state.tripStatus = action.payload.tripStatus
            state.tripStage = action.payload.tripStage
        },
        setDispatcherStats (state, action:PayloadAction<DispatcherStats>) {
            state.dispatcherDeliveredTripsCount = action.payload.dispatcherDeliveredTripsCount
            state.dispatcherCurrentTripsCount = action.payload.dispatcherCurrentTripsCount
            state.totalEarnings = action.payload.totalEarnings
        }
        
    }

})

export const {setDispatcherTripStatus, setDispatcherStats, setDispatcherTripDetails} = dispatcherSlice.actions;
