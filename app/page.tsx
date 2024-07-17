"use client";
//next + react + redux+custom hook

import { useHome } from "@/components/Home/hook/useHome";
//main components
import DashboardTopNav from "@/components/Dashboard/Nav/DashboardTopNav";
import OtherActions from "@/components/Home/OtherActions";
import QuickOrder from "@/components/Home/QuickOrder";
import TrackPackage from "@/components/Home/TrackPackage";
import UserStats from "@/components/Home/UserStats";
import SmallScreenTopNav from "@/components/Nav/SmallScreenTopNav";
import OrderHistory from "@/components/Order/OrderHistory";


export default function Home() {
  const {path } = useHome();
  
  return (
    <>
    
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
