'use client'
import { useCallback } from "react";
import { useGetUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedUserId, setActiveSection } from "@/lib/store/slice/dashboardSlice";

export const useGetUser = (customerId:string)=> {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useGetUserQuery(customerId);
    const user = data?.user;

    const handleSelectUser= useCallback( ()=> {
        dispatch(setSelectedUserId(customerId))
        dispatch(setActiveSection("Users"))
    }, [customerId, dispatch])
    return {user, isLoading, error, handleSelectUser}
}