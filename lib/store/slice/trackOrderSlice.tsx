import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderDetails {
    trip_id: string,
    trip_type:string,
    trip_medium: string,
    scheduled: boolean,
    package_type: string,
    pickup_location: string,
    drop_off_location: string,
    sender_number: string,     
    recipient_number: string,
    package_value: string,
    additional_information: string
}

const initialState: OrderDetails = {
    trip_id: '',
    trip_type:'',
    trip_medium: '',
    scheduled: false,
    package_type: '',
    pickup_location: '',
    drop_off_location: '',
    sender_number: '',     
    recipient_number: '',
    package_value: '',
    additional_information: ''
}
export const trackOrderSlice = createSlice({
    name: 'trackOrder',
    initialState,
    reducers: {
        setTrackedOrder (state, action:PayloadAction<OrderDetails>) {
            state.trip_id = action.payload.trip_id
            state.trip_type = action.payload.trip_type
            state.trip_medium = action.payload.trip_medium
            state.scheduled = action.payload.scheduled
            state.pickup_location = action.payload.pickup_location
            state.drop_off_location = action.payload.drop_off_location
            state.sender_number = action.payload.sender_number
            state.recipient_number = action.payload.recipient_number
            state.package_value = action.payload.package_value
            state.additional_information = action.payload.additional_information
        }
    }
})

export const { setTrackedOrder } = trackOrderSlice.actions