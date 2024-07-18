import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Auth {
    authenticated: boolean;
 
}

const initialState:Auth = {
    authenticated: false,
 
}

export const supabaseAuthSlice = createSlice({
    name: "supabase auth",
    initialState,
    reducers: {
        setAuthState(state, action:PayloadAction<boolean>) {
            state.authenticated = action.payload;
        }, 
 
    }
})

export const { setAuthState, } = supabaseAuthSlice.actions