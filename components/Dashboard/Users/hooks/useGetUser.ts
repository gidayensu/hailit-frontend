'use client'
import { useGetUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setActiveSection, setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { useCallback } from "react";
import { User } from "./useGetAllUsers";
import { useRouter } from "next/navigation";
export const useGetUser = (customerId:string)=> {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { data, isLoading, error } = useGetUserQuery(customerId);
    const user:User = data?.user;

    const handleSelectUser= useCallback( ()=> {
        dispatch(setSelectedUserId(customerId))
        dispatch(setActiveSection("Users"))
        router.push('/dashboard/users/user-details')
    }, [customerId, dispatch])
    return {user, isLoading, error, handleSelectUser}
}