'use client'
import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { UserRole } from "@/lib/store/slice/userSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { usePrefetchData } from "../../hooks/usePrefetchData";
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
  const router = useRouter();
  const {
    handleSort, 
    sortDetails,
    dataLoading: usersLoading,
    handleSearch:handleUserSearch,
    searchRef: userSearchRef,
    endpoint,
    setDataLoading: setUsersLoading,
    isSearch
  } = useSearchAndSort({table: "Users Table", columns: tableHeadings, endpoint: "users?"});
  
  const { data, isLoading, error, isSuccess } = useGetAllUsersQuery(`${endpoint}&page=${page}`);
  
  
  const users = data?.users;
  const total_number_of_pages = data?.total_number_of_pages
  const total_items = data?.total_items;
  //prefetch users data
  const {handlePrefetchData} = usePrefetchData({endpoint: endpoint, page, prefetchOption: 'getAllUsers', total_number_of_pages});

  useEffect(()=> {
    handlePrefetchData();
  }, [handlePrefetchData])




    const handleDriversSection = ()=> {
      router.push('/dashboard/drivers')
    }
    const handleRidersSection = ()=> {
      router.push('/dashboard/riders')
    }

    //set users data 
    useEffect(()=> {
      setUsersLoading(true)
      if(users) {
        setUsersLoading(false)
        
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
    isSearch

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
