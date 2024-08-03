"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";

//main components
import SendPackage from "./DeliveryChoices/SendPackage";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";

export default function PrelimOrderChoices() {
  //redirect users who are not customers
  const { user_role } = useAppSelector((state) => state.user);
  user_role && user_role !== "Customer" ? redirect("/authentication") : "";

  return (
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="flex flex-col items-center justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Delivery Details</span>
          <p className="text-lg">Select city, day of delivery, and medium</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-center items-center mb-24">
          <SendPackage />
        </MiddleSectionContainer>
      </main>
    
  );
}
