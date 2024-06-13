'use client'
import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";
import { setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useCallback } from "react";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_role: "customer" | "dispatcher" | "driver" | string; // Allows custom roles
  onboard: boolean;
  date_updated: string;
  date_created: string;
}



export const useGetAllUsers = ({limit, offset}: {limit?: number, offset?:number}) => {
  const dispatch = useAppDispatch();
  const { usersData,  } = useAppSelector(state=>state.dashboardTables)
  
  
  let endpoint = 'users';
  offset && limit ? endpoint = `users?limit=${limit}&offset=${offset}` : limit ? endpoint = `users?limit=${limit}` : ''
  const { data, isLoading, error } = useGetAllUsersQuery(endpoint);
  
  
  const users = data?.users;
  const total_number_of_pages = data?.total_number_of_pages
    useEffect(()=> {
        dispatch(setTableData({table: "usersData", data:users}))
    }, [dispatch, users])  

    
  const handleSetSelectedUser = useCallback( (userId:string):void => {
    dispatch(setSelectedUserId(userId))
  
}, [dispatch])

  return { usersData, data, users, isLoading, error, total_number_of_pages, handleSetSelectedUser };
};
