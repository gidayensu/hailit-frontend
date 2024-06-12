import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryChoice {
    trip_area: string,
    trip_type:string,
    trip_medium: string,
    scheduled: boolean,
    package_type: string
}

const initialState: DeliveryChoice = {
    trip_area: '',
    trip_type:'',
    trip_medium: '',
    scheduled: false,
    package_type: '',
}

export const deliveryChoiceSlice = createSlice({
    name: 'delivery choice',
    initialState, 
    reducers: {
        setTripArea (state, action:PayloadAction<string>) {
            state.trip_area = action.payload;
        },
        setTripType (state, action:PayloadAction<string>) {
            state.trip_type = action.payload;
        },
        setTripMedium (state, action:PayloadAction<string>) {
            state.trip_medium = action.payload;
        },
        setScheduled (state, action:PayloadAction<boolean>) {
            state.scheduled = action.payload;
        },
        setPackageType (state,action:PayloadAction<string>) {
            state.package_type = action.payload;
        },
        resetDeliveryChoices (state) {
            state.trip_type = '';
            state.trip_medium = '';
            state.trip_area = '';
            state.package_type = '';
            state.scheduled = false;
            
        }
    }

})

export const {setTripType, setTripMedium, setTripArea, setPackageType, setScheduled, resetDeliveryChoices} = deliveryChoiceSlice.actions;