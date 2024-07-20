"use client";
import { userLogout } from "@/lib/store/actions";
import { useAppDispatch } from "@/lib/store/hooks";
import { supabaseLogOut } from "@/lib/supabaseAuth";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  
  const dispatch = useAppDispatch();


  const router = useRouter();

  

  //log user out
  const handleLogOut = () => {
    supabaseLogOut();
    dispatch(userLogout());
    router.push("/");
  };

  return {
    handleLogOut,
  };
};
