'use client'
//main components
import SendPackage from "@/components/Home/SendPackage";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";


export default function NewOrder() {
  
   
    //redirect users who are not customers
  const {user_role} = useAppSelector(state=>state.user);
  user_role && user_role !== "Customer" ? redirect('/profile') : ''

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="flex flex-col items-center justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Delivery Details</span>
          <p className="text-lg">Select city, day of delivery, and medium</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-center items-center mb-24">
          <SendPackage/>
        </MiddleSectionContainer>
      </main>
    </>
  );
}
