import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "rider" | "driver" | "customer" | "admin" ;
export interface User {
    user_id: string,
    first_name: string,
    last_name: string,
    user_role: UserRole,
    email: string,
    onboard: boolean

}

const initialState:User = {
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    user_role: 'customer',
    onboard: false

}
export const userSlice = createSlice({
    name: "user state",
    initialState,
    reducers: {
        setUserState(state, action:PayloadAction<User>) {
            
            state.user_id = action.payload.user_id
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.user_role = action.payload.user_role
            state.onboard = action.payload.onboard
            
        },
        setUserOnBoard(state, action:PayloadAction<boolean>) {
            state.onboard = action.payload
        },

        logUserOut(state) {
            state.user_id = ''
            state.email = ''
            state.first_name = ''
            state.last_name = ''
            state.onboard = false

        }
    }

})

export const {setUserState, logUserOut, setUserOnBoard} = userSlice.actions;
