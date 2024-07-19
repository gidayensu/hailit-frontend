"use client";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";

import TrackOrder from "@/components/Order/TrackOrder/UserTrackOrder";
import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";

export default function TrackDelivery() {
  //redirect users who are not customers
  const { user_role } = useAppSelector((state) => state.user);
  user_role && user_role !== "Customer" ? redirect("/authentication") : "";
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-7xl font-bold">Track</span>
        <p className="text-3xl">Your Deliveries</p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center  p-5">
        <TrackOrder />
      </MiddleSectionContainer>
    </main>
  );
}
