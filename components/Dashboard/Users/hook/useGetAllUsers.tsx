'use client'
import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";
import { setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";

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

  return { usersData, data, users, isLoading, error, total_number_of_pages };
};
