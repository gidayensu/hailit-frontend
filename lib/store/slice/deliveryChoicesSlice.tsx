import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripMedium, TripArea, TripType, PaymentMethod, PackageType } from "@/components/Order/types/Types";

interface DeliveryChoice {
    trip_area: TripArea | '',
    trip_type:TripType | '',
    trip_medium: TripMedium | '',
    scheduled: boolean,
    package_type: PackageType | '',
    payment_method: PaymentMethod | '',
}

const initialState: DeliveryChoice = {
    trip_area: '',
    trip_type:'',
    trip_medium: '',
    scheduled: false,
    package_type: '',
    payment_method: ''
}

export const deliveryChoiceSlice = createSlice({
    name: 'delivery choice',
    initialState, 
    reducers: {
        setTripArea (state, action:PayloadAction<TripArea>) {
            state.trip_area = action.payload;
        },
        setTripType (state, action:PayloadAction<TripType>) {
            state.trip_type = action.payload;
        },
        setTripMedium (state, action:PayloadAction<TripMedium>) {
            state.trip_medium = action.payload;
        },
        setScheduled (state, action:PayloadAction<boolean>) {
            state.scheduled = action.payload;
        },
        setPackageType (state,action:PayloadAction<PackageType>) {
            state.package_type = action.payload;
        },
        setPaymentMethod (state, action:PayloadAction<PaymentMethod>) {
            state.payment_method = action.payload;
        },
        resetDeliveryChoices (state) {
            state.trip_type = '';
            state.trip_medium = '';
            state.trip_area = '';
            state.package_type = '';
            state.scheduled = false;
            state.payment_method = '';
            
        }
    }

})

export const {setTripType, setTripMedium, setTripArea, setPackageType, setScheduled, setPaymentMethod, resetDeliveryChoices} = deliveryChoiceSlice.actions;