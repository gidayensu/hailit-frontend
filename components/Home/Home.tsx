"use client";
//next + react + redux+custom hook

import { useHome } from "./hooks/useHome";
//main components
import OtherActions from "@/components/Home/OtherActions";
import QuickOrder from "@/components/Home/QuickOrder";
import TrackPackage from "@/components/Home/TrackPackage";
import UserStats from "@/components/Home/UserStats";
import SmallScreenTopNav from "@/components/Nav/SmallScreenTopNav";
import OrderHistory from "@/components/Order/OrderHistory";
import SecondaryModal from "../Shared/SecondaryModal";

export default function Home() {
  const { path, closeHomeModal, homeModalRef } = useHome();

  return (
    <>
      {!path.startsWith("/dashboard") && (
        <div className="md:hidden">
          <SmallScreenTopNav />
        </div>
      )}
      <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-primary-dark relative mb-20 ">
        <SecondaryModal
          closeModal={closeHomeModal}
          modalRef={homeModalRef}
          info={
            <p>
                Drivers and riders are <b> not available</b> at this time for <b>Express Delivery</b>
            </p>
            
          }
          note={true}
        />
        <section className=" w-full flex items-center justify-center">
          <TrackPackage />
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3">
          <UserStats />
          <QuickOrder />
          <OtherActions />
          <OrderHistory />
        </section>
      </main>
    </>
  );
}
