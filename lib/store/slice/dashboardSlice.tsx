import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export type TripStatus= "Booked" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled" 
export type ActiveSection =
  | "Overview"
  | "Orders"
  | "Vehicles"
  | "Users"
  | "Track Order"
  | "Riders"
  | "Drivers"
  | "Analytics"
  | "Sign Out"
  | "Profile";

export type TripStage = 1 | 2 | 3 | 4;

export interface TripStatusDBUpdate {
    trip_status: TripStatus,
        trip_stage: TripStage,
        trip_commencement_date: null | Date,
        trip_completion_date: null | Date,
}
export interface TripStatusandStage{
    tripStatus: TripStatus
    tripStage: TripStage, 
    tripCommencementDate: null | Date,
    tripCompletionDate: null | Date
}

export interface DashboardDetails {
    activeSection: ActiveSection,
    selectedUserId: string,
    selectedTripId: string,
    trackingOrder: boolean,
    editingOrder: boolean,
    assignedDispatcherId: string,     
    tripStatus: string,
    tripStage: TripStage,
    previousSelectedTripId : string

}

export interface AssignedDispatcherDetails {
    assignedDispatcherId: string, 
    
}

export const initialState: DashboardDetails = {
    activeSection: 'Overview',
    selectedUserId: '',
    selectedTripId: '',
    trackingOrder: false,
    assignedDispatcherId: '', 
    tripStatus: '',
    tripStage: 1,
    previousSelectedTripId : '',
    editingOrder: false,
}
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setActiveSection (state, action:PayloadAction<ActiveSection>) {
            state.activeSection = action.payload           
            
        },
        setTripStatus(state, action:PayloadAction<TripStatusandStage>) {
            state.tripStage = action.payload.tripStage
            state.tripStatus = action.payload.tripStatus

        },
        setSelectedTripId (state, action:PayloadAction<string>) {
            state.selectedTripId = action.payload           
            
        },

        setSelectedUserId (state, action:PayloadAction<string>) {
            state.selectedUserId = action.payload           
            
        },

        setTrackingOrder (state, action:PayloadAction<boolean>) {
            state.trackingOrder = action.payload           
            
        },
        setEditingOrder (state, action:PayloadAction<boolean>) {
            state.editingOrder = action.payload           
            
        },
        
        setPreviousSelectedTripId (state, action: PayloadAction<[string]>) {
            const tripId = [...action.payload];
            state.previousSelectedTripId = tripId[0];   
        }
        
    }
})

export const { setActiveSection, setSelectedTripId, setTrackingOrder,  setTripStatus, setPreviousSelectedTripId, setEditingOrder, setSelectedUserId } = dashboardSlice.actions