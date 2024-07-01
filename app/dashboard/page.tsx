"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  ActiveSection,
  setActiveSection,
} from "@/lib/store/slice/dashboardSlice";
import { useState } from "react";
//icons + ui
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
//main components

import { DashboardBottomNav } from "@/components/Dashboard/Nav/DashboardBottomNav";
import DashboardSideBar from "@/components/Dashboard/Nav/DashboardSideBar";
import DashboardTopNav from "@/components/Dashboard/Nav/DashboardTopNav";
import AllTripsSection from "@/components/Dashboard/Orders/AllTripsSection";
import Overview from "@/components/Dashboard/Overview/Overview";
import TrackOrder from "@/components/Dashboard/TrackOrder/TrackOrderDetails";
import AllUsers from "@/components/Dashboard/Users/AllUsers";
import { AllDrivers } from "@/components/Dashboard/Users/Dispatchers/AllDrivers";
import { AllRiders } from "@/components/Dashboard/Users/Dispatchers/AllRiders";
import { Vehicles } from "@/components/Dashboard/Vehicles/Vehicles";
import CustomerProfile from "@/components/Form/EditCustomerProfile";
import { useCustomerProfile } from "@/components/Form/hooks/useCustomerProfile";
import BigLoader from "@/components/Shared/BigLoader";
import Loader from "@/components/Shared/Loader";
import { useGetAdminQuery } from "@/lib/store/apiSlice/hailitApi";
import ErrorComponent from "@/components/Shared/ErrorComponent";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const [dashMin, setDashMin] = useState<boolean>(false);

  const {
    isSuccess,
    isLoading: formLoading,
    handleSignOut,
  } = useCustomerProfile();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { activeSection } = useAppSelector((state) => state.dashboard);
  const { user_id } = useAppSelector((state) => state.user);

  const handleDashMin = () => {
    setDashMin(() => !dashMin);
  };

  const handleActiveSection = (section: ActiveSection) => {
    dispatch(setActiveSection(section));
  };

  const { data, isLoading, error } = useGetAdminQuery(user_id);
  const isAdmin = data?.admin;

  if (data && !isAdmin) {
    handleSignOut();
  }

  return (
    <>
      {isLoading && <BigLoader />}

      {isAdmin && !error && (
        <>
          <DashboardTopNav />

          <main className="flex gap-4  mb-20 lg:mb-0 xl:max-w-full bg-[#f7f7f7]  dark:bg-primary-dark ">
            <DashboardSideBar
              activeSection={activeSection}
              dashMin={dashMin}
              handleActiveSection={handleActiveSection}
              handleDashMin={handleDashMin}
            />
            <article
              className={`flex flex-col gap-4 w-full ${
                dashMin ? "lg:ml-[70px] lg:w-[calc(100vw-70px)] transition-all duration-300" : "lg:ml-[170px] lg:w-[calc(100vw-170px)] transition-all duration-300"
              } px-6 py-4`}
              // style={{ width: '100%', maxWidth: `${dashMin ? "calc(100% - 70px)" : "calc(100% - 170px)"}` }}
            >
              <section className="space-y-4">
                <h1 className="font-bold text-3xl">{activeSection}</h1>
                <Separator className="bg-black opacity-70 dark:bg-slate-50" />
              </section>

              {activeSection === "Overview" && <Overview />}

              {activeSection === "Orders" && <AllTripsSection />}

              {activeSection === "Vehicles" && <Vehicles />}

              {activeSection === "Users" && (
                <>
                  <section>
                    <AllUsers />
                  </section>
                </>
              )}

              {activeSection === "Track Order" && <TrackOrder />}

              {activeSection === "Riders" && <AllRiders />}

              {activeSection === "Drivers" && <AllDrivers />}

              {/* {activeSection === "Analytics" && <TripsDonut />} */}
              {activeSection === "Profile" && (
                <section className="flex flex-col items-center md:items-start md:justify-start justify-center gap-4">
                  <div className="flex flex-col gap-2 w-full items-start justify-start">
                    <CustomerProfile />
                  <Button
                    type="submit"
                    className="max-w-sm w-full h-14"
                    form="customerProfileUpdate"
                    variant={"outline"}
                  >
                    {formLoading ? <Loader /> : isSuccess ? "Saved" : "Save"}
                  </Button>
                  <span className="max-w-sm w-full lg:hidden flex items-center justify-center  ">
                    <p>OR</p>
                  </span>
                  <Button
                    className="max-w-sm w-full h-14 lg:hidden"
                    onClick={handleSignOut}
                  >
                    Logout
                  </Button>
                  </div>
                  {/* Form submit button placed here because the form is used at different places with different button position */}
                </section>
              )}
            </article>
          </main>
          <DashboardBottomNav
            activeSection={activeSection}
            onClickFunc={handleActiveSection}
          />
        </>
      )}

      {(isAdmin === false || error) && (
        <section className="flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark min-h-screen gap-4">
          <ErrorComponent
            errorMessage="Page Not Found"
            errorCode={404}
            onClickFunc={handleSignOut}
          />
        </section>
      )}
    </>
  );
}
