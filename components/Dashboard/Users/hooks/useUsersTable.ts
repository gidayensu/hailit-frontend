'use client'
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { UserRole } from "@/lib/store/slice/userSlice";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";


export const useUsersTable = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number> (1);

  const handleSetSelectedUser = useCallback( (userId:string):void => {
    dispatch(setSelectedUserId(userId))
  
}, [dispatch])
  const [userLoading, setUserLoading] = useState<boolean>(false);
  
  const router = useRouter();
  const handleUserDetails = (userId:string)=> {
    handleSetSelectedUser(userId)
    setUserLoading(true)
    router.push('/dashboard/users/user-details')
  }
  return {
    handleUserDetails,
    page,
    setPage,
    userLoading
  };
};


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
