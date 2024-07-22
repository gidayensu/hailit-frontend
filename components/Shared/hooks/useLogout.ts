"use client";
import { userLogout } from "@/lib/store/actions";
import { useAppDispatch } from "@/lib/store/hooks";
import { supabaseLogOut } from "@/lib/supabaseAuth";

export const useLogout = () => {
  
  const dispatch = useAppDispatch();



  

  //log user out
  const handleLogOut = () => {
    supabaseLogOut();
    dispatch(userLogout());

  };

  return {
    handleLogOut,
  };
};
