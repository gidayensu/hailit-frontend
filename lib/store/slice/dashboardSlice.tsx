import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardDetails {
    activeSection: string,
    selectedUserId: string,
    selectedTripId: string,
    trackingOrder: boolean,
    
}

const initialState: DashboardDetails = {
    activeSection: 'Overview',
    selectedUserId: '',
    selectedTripId: '',
    trackingOrder: false
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
        
    }
})

export const { setActiveSection, setSelectedTripId, setTrackingOrder } = dashboardSlice.actions