"use client";
//next + react + redux

import BigLoader from "@/components/Shared/BigLoader";
import { supabaseSession } from "@/lib/supabaseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
//main components
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";


export function useHome() {
  
  const router = useRouter();
  const path = usePathname();
  
  const {user_role} = useAppSelector(state=>state.user);

  
  //redirect without session or user is not customer
  useEffect(() => {
    const checkSession = async () => {
      const session = await supabaseSession();
        
      if (!session || user_role && user_role !== "Customer") {
        router.push('/authentication');
      return (<div className="flex items-center justify-center w-full">
        <BigLoader/>
      </div>)
      } 

    };
    
    checkSession();
  }, [router]);
  
  
    return {path}
 
  
}
