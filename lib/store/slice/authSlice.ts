import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Auth {
    authenticationState: boolean;
 
}

const initialState:Auth = {
    authenticationState: false,
 
}

export const supabaseAuthSlice = createSlice({
    name: "supabase auth",
    initialState,
    reducers: {
        setAuthState(state, action:PayloadAction<boolean>) {
            state.authenticationState = action.payload;
        }, 
 
    }
})

export const { setAuthState, } = supabaseAuthSlice.actions