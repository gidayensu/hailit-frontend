'use client'
import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";
import { setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useCallback } from "react";
import { setActiveSection, setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { usePrefetchData } from "../../hooks/usePrefetchData";
import { UserRole } from "@/lib/store/slice/userSlice";

type UserProps = "user_id" | "first_name" | "last_name" | "email" | "phone_number" | "user_role" | "onboard" | "date_updated" | "date_created" 
export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  // user_role had string type. Was probably done so to fix a bug. 
  user_role: UserRole; 
  onboard: boolean;
  date_updated: string;
  date_created: string;
}



export const useGetAllUsers = (page:number) => {
  const dispatch = useAppDispatch();
  const { usersData,  } = useAppSelector(state=>state.dashboardTables)
  const {selectedUserId} = useAppSelector(state=>state.dashboard)
  
  
  // let endpoint = 'users';
  // offset && limit ? endpoint = `users?limit=${limit}&offset=${offset}` : limit ? endpoint = `users?limit=${limit}` : ''
  const { data, isLoading, error } = useGetAllUsersQuery(`users?page=${page}`);
  
  
  const users = data?.users;
  const total_number_of_pages = data?.total_number_of_pages
  const total_items = data?.total_items;
  //prefetch users data
  const {handlePrefetchData} = usePrefetchData({endpoint: 'users', page, prefetchOption: 'getAllUsers', total_number_of_pages});

  useEffect(()=> {
    handlePrefetchData();
  }, [handlePrefetchData])




    const handleDriversSection = ()=> {
      dispatch(setActiveSection("Drivers"))
    }
    const handleRidersSection = ()=> {
      dispatch(setActiveSection("Riders"))
    }

   
  


    //set users data 
    useEffect(()=> {
      
      
      dispatch(setTableData({table: "usersData", data:users}))
  }, [dispatch, users])  


  const handleSetSelectedUser = useCallback( (userId:string):void => {
    dispatch(setSelectedUserId(userId))
  
}, [dispatch])

  return { usersData, data, users, isLoading, error, total_number_of_pages, handleSetSelectedUser, handleRidersSection, handleDriversSection, total_items, selectedUserId  };
};
