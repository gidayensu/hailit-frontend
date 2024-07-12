"use client";
//next + react + redux

import BigLoader from "@/components/Shared/BigLoader";
import { redirect, useRouter } from "next/navigation";
import { supabaseSession } from "@/lib/supabaseAuth";
import { useEffect, useState } from "react";
//main components
import UserStats from "@/components/Home/UserStats";
import DashboardTopNav from "@/components/Dashboard/Nav/DashboardTopNav";
import SmallScreenTopNav from "@/components/Nav/SmallScreenTopNav";
import QuickOrder from "@/components/Home/QuickOrder";
import TrackPackage from "@/components/Home/TrackPackage";
import OrderHistory from "@/components/Order/OrderHistory";
import OtherActions from "@/components/Home/OtherActions";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
export type Deliveries = boolean;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();
  

  
  useEffect(() => {
    const checkSession = async () => {
      const session = await supabaseSession();
      
      if (!session) {
        router.push('/profile');
      } else {
        setLoading(false);
      }
    };
    
    checkSession();
  }, [router]);
  
  //redirect users who are not customers
  const {user_role} = useAppSelector(state=>state.user);
  user_role && user_role !== "Customer" ? redirect('/profile') : ''

  if (loading) {
    return <BigLoader/>
  }
  return (
    <>
    {
      path.startsWith('/dashboard') && 

      <div className="md:hidden">
        <DashboardTopNav />
      </div>
    }
    {
      !path.startsWith('/dashboard') && 

      <div className="md:hidden">
        <SmallScreenTopNav />
      </div>
    }
      <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-primary-dark relative mb-20 ">
        <section className=" w-full flex items-center justify-center">
          <TrackPackage />
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3">

        <UserStats/>        
        <QuickOrder/>
        <OtherActions/>
        <OrderHistory />
        </section>
        

      </main>
    </>
  );
}
