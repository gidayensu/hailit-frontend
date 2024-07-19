"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  ActiveSection,
  setActiveSection,
} from "@/lib/store/slice/dashboardSlice";
import { useState } from "react";
//icons + ui
import { Separator } from "@/components/ui/separator";
//main components

import { DashboardBottomNav } from "@/components/Dashboard/Nav/DashboardBottomNav";
import DashboardSideBar from "@/components/Dashboard/Nav/DashboardSideBar";
import DashboardTopNav from "@/components/Dashboard/Nav/DashboardTopNav";

import { useGetAdminQuery } from "@/lib/store/apiSlice/hailitApi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dashMin, setDashMin] = useState<boolean>(false);
  const { user_id } = useAppSelector((state) => state.user);

  const { data, isLoading, error } = useGetAdminQuery(user_id);

  const isAdmin = data?.admin;

  const dispatch = useAppDispatch();
  const { activeSection } = useAppSelector((state) => state.dashboard);

  const handleDashMin = () => {
    setDashMin(() => !dashMin);
  };

  const handleActiveSection = (section: ActiveSection) => {
    dispatch(setActiveSection(section));
  };

  if (!isAdmin) {
    return (
      <main className="flex items-center justify-center gap-4 bg-[#f7f7f7]  dark:bg-primary-dark ">
        {children}
      </main>
    );
  }
  return (
    <>
      <DashboardTopNav />

      <main className="flex gap-4  mb-20 lg:mb-0 xl:max-w-full bg-[#f7f7f7]  dark:bg-primary-dark ">
        <DashboardSideBar
          dashMin={dashMin}
          handleActiveSection={handleActiveSection}
          handleDashMin={handleDashMin}
        />
        <article
          className={`flex flex-col gap-4 w-full ${
            dashMin
              ? "lg:ml-[70px] lg:w-[calc(100vw-70px)] transition-all duration-300"
              : "lg:ml-[200px] lg:w-[calc(100vw-200px)] transition-all duration-300"
          } px-6 py-4`}
          // style={{ width: '100%', maxWidth: `${dashMin ? "calc(100% - 70px)" : "calc(100% - 170px)"}` }}
        >
          <section className="space-y-4">
            <h1 className="font-bold text-3xl">{activeSection}</h1>
            <Separator className="bg-black opacity-70 dark:bg-slate-50" />
          </section>

          {children}
        </article>
      </main>
      <DashboardBottomNav
        activeSection={activeSection}
        setActiveSection={handleActiveSection}
      />
    </>
  );
}
