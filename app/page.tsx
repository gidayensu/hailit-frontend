"use client";
//next + react + redux

import BigLoader from "@/components/Shared/BigLoader";
import { useRouter } from "next/navigation";
import { supabaseSession } from "@/lib/supabaseAuth";
import { useEffect, useState } from "react";
//main components
import UserStats from "@/components/Home/UserStats";
import DashboardTopNav from "@/components/Dashboard/Nav/DashboardTopNav";
import QuickOrder from "@/components/Home/QuickOrder";
import TrackPackage from "@/components/Home/TrackPackage";
import OrderHistory from "@/components/Order/OrderHistory";
import OtherActions from "@/components/Home/OtherActions";

export type Deliveries = boolean;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) {
    return <BigLoader/>
  }
  return (
    <>
      <div className="md:hidden">
        <DashboardTopNav />
      </div>
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
