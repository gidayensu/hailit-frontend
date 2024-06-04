import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TripStatus {
    tripStatus: string
    tripStage: number, 
}

export interface DashboardDetails {
    activeSection: string,
    selectedUserId: string,
    selectedTripId: string,
    trackingOrder: boolean,
    assignedDispatcherId: string, 
    assignedDispatcherName: string,
    assignedDispatcherVehicle: string,
    assignedDispatcherPlate: string,
    assignedDispatcherPhone: string,
    tripStatus: string,
    tripStage: number,
    previousSelectedTripId : string

}

export interface AssignedDispatcherDetails {
    assignedDispatcherId: string, 
    assignedDispatcherName: string,
    assignedDispatcherVehicle: string,
    assignedDispatcherPlate: string,
    assignedDispatcherPhone: string,
}

export const initialState: DashboardDetails = {
    activeSection: 'Overview',
    selectedUserId: '',
    selectedTripId: '',
    trackingOrder: false,
    assignedDispatcherId: '', 
    assignedDispatcherName: '', 
    assignedDispatcherVehicle: '', 
    assignedDispatcherPlate: '', 
    assignedDispatcherPhone: '',
    tripStatus: '',
    tripStage: 0,
    previousSelectedTripId : ''
}
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setActiveSection (state, action:PayloadAction<string>) {
            state.activeSection = action.payload           
            
        },
        setTripStatus(state, action:PayloadAction<TripStatus>) {
            state.tripStage = action.payload.tripStage
            state.tripStatus = action.payload.tripStatus

        },
        setSelectedTripId (state, action:PayloadAction<string>) {
            state.selectedTripId = action.payload           
            
        },

        setTrackingOrder (state, action:PayloadAction<boolean>) {
            state.trackingOrder = action.payload           
            
        },
        setAssignedDispatcher (state, action:PayloadAction<AssignedDispatcherDetails>) {
            state.assignedDispatcherId = action.payload.assignedDispatcherId
            state.assignedDispatcherName = action.payload.assignedDispatcherName
            state.assignedDispatcherVehicle = action.payload.assignedDispatcherVehicle
            state.assignedDispatcherPlate = action.payload.assignedDispatcherPlate,
            state.assignedDispatcherPhone = action.payload.assignedDispatcherPhone
        },
        setPreviousSelectedTripId (state, action: PayloadAction<[string]>) {
            const tripId = [...action.payload];
            state.previousSelectedTripId = tripId[0];   
        }
        
    }
})

export const { setActiveSection, setSelectedTripId, setTrackingOrder, setAssignedDispatcher, setTripStatus, setPreviousSelectedTripId } = dashboardSlice.actions