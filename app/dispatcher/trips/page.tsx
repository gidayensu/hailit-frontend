"use client";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import OrderHistory from "@/components/Order/OrderHistory";
import { redirect } from "next/navigation";
import DispatcherHead from "@/components/Dispatcher/DispatcherHead";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
export default function Dispatcher() {
  const { user_role, first_name, last_name } = useGetDispatcher();

  if (user_role === "customer" || user_role === "admin" || !user_role) {
    redirect('/profile') 
}

  return (
    <>
        <TopSectionContainer>

        <DispatcherHead firstName={first_name} lastName={last_name} userRole={user_role} />
        </TopSectionContainer>
        <MiddleSectionContainer className="rounded-tr-none flex justify-center items-center">

                <OrderHistory />
        </MiddleSectionContainer>
    </>
  );
}
