'use client'
import { useAppSelector } from "@/lib/store/hooks";
import AllUsersTable from "./AllUsersTable";
import UserDetails from "./UserDetails";
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