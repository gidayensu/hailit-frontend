'use client'
import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";
import { setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useCallback } from "react";
import { setActiveSection, setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { usePrefetchData } from "../../hooks/usePrefetchData";
import { UserRole } from "@/lib/store/slice/userSlice";
import { useSearchAndSort } from "../../hooks/useSearchAndSort";


export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_role: UserRole; 
  onboard: boolean;
  date_updated: string;
  date_created: string;
}



export const useGetAllUsers = (page:number) => {
  const dispatch = useAppDispatch();
  const { usersData,  } = useAppSelector(state=>state.dashboardTables)
  const {selectedUserId} = useAppSelector(state=>state.dashboard)
  
  const {
    handleSort, 
    sortDetails,
    dataLoading: usersLoading,
    handleSearch:handleUserSearch,
    searchRef: userSearchRef,
    endPoint,
    setDataLoading: setUsersLoading,
  } = useSearchAndSort({table: "Users Table", columns: tableHeadings, endPoint: "users?"});
  
  const { data, isLoading, error, isSuccess } = useGetAllUsersQuery(`${endPoint}&page=${page}`);
  
  
  const users = data?.users;
  const total_number_of_pages = data?.total_number_of_pages
  const total_items = data?.total_items;
  //prefetch users data
  const {handlePrefetchData} = usePrefetchData({endpoint: 'users?', page, prefetchOption: 'getAllUsers', total_number_of_pages});

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
      setUsersLoading(true)
      if(users) {
        setUsersLoading(false)
        dispatch(setTableData({table: "usersData", data:users}))
      }
  }, [dispatch, users])  


  const handleSetSelectedUser = useCallback( (userId:string):void => {
    dispatch(setSelectedUserId(userId))
  
}, [dispatch])

  return {
    usersData,
    data,
    handleSort,
    sortDetails,
    usersLoading,
    users,
    isLoading,
    error,
    total_number_of_pages,
    handleSetSelectedUser,
    handleRidersSection,
    handleDriversSection,
    total_items,
    selectedUserId,
    handleUserSearch,
    userSearchRef,
    isSuccess,


  };
};

const tableHeadings = [
  "First Name",
  "Last Name",
  "Email",
  "Phone Number",
  "User Role",
  "Onboard Status",
  "Date Joined",
];
