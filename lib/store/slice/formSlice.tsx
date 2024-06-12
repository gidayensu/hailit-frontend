import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Form {
    newTripSuccess: boolean,
}



const initialState: Form = {
    
    newTripSuccess: false,
}

export const formSlice = createSlice({
    name: "onBoarding state",
    initialState,
    reducers: {
        setNewTripSuccess(state, action:PayloadAction<boolean>) {
            state.newTripSuccess = action.payload
        }
        
    }

})

export const { setNewTripSuccess} = formSlice.actions;
