'use client'
import { useGetUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { User } from "./useUsersTable";
export const useGetUser = (customerId:string)=> {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { data, isLoading, error } = useGetUserQuery(customerId);
    const user:User = data?.user;

    const handleSelectUser= useCallback( ()=> {
        dispatch(setSelectedUserId(customerId))
        
        router.push('/dashboard/users/user-details')
    }, [customerId, dispatch])
    return {user, isLoading, error, handleSelectUser}
}