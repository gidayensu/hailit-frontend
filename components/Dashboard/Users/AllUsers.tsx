'use client'
import { useState } from "react";
import UserDetails from "./UserDetails";
import AllUsersTable from "./AllUsersTable";
import { useUserProfile } from "./hooks/useUserProfile";
import { useAppSelector } from "@/lib/store/hooks";
export default function AllUsers () {
    
    const {selectedUserId} = useAppSelector((state)=>state.dashboard)
    
    
        return (
            <>
            {!selectedUserId &&
            <AllUsersTable />
            }
            {selectedUserId &&
            <UserDetails   />}
            </>
        )
}