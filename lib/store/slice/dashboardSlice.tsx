import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
    assignedDispatcherPhone: ''
}
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setActiveSection (state, action:PayloadAction<string>) {
            state.activeSection = action.payload           
            
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
        }
        
    }
})

export const { setActiveSection, setSelectedTripId, setTrackingOrder, setAssignedDispatcher } = dashboardSlice.actions