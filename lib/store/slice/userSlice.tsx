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
        setUser(state, action:PayloadAction<User>) {
            
            return action.payload
            
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

export const {setUser, logUserOut} = userSlice.actions;
