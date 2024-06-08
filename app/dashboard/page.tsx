"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection } from "@/lib/store/slice/dashboardSlice";
import { useState } from "react";

//icons + ui
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { RiSteering2Line } from "react-icons/ri";
//main components
import { DashboardBottomNav } from "@/components/Dashboard/Nav/DashboardBottomNav";
import BigLoader from "@/components/Shared/BigLoader";
import DashboardSideBar from "@/components/Dashboard/Nav/DashboardSideBar";
import DashboardTopNav from "@/components/Dashboard/Nav/DashboardTopNav";
import { AllTripsTable } from "@/components/Dashboard/Orders/AllTripsTable";
import Overview from "@/components/Dashboard/Overview/Overview";
import TrackOrder from "@/components/Dashboard/TrackOrder/TrackOrderDetails";
import { AllUsers } from "@/components/Dashboard/Users/AllUsersTable";
import { AllDrivers } from "@/components/Dashboard/Users/Dispatchers/AllDrivers";
import { AllRiders } from "@/components/Dashboard/Users/Dispatchers/AllRiders";
import CustomerProfile from "@/components/Form/EditCustomerProfile";
import { useGetAdminQuery } from "@/lib/store/apiSlice/hailitApi";

export default function Dashboard() {

  const [dashMin, setDashMin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {activeSection} = useAppSelector(state=>state.dashboard);
  const {user_id} = useAppSelector(state=>state.user)  

  const handleDashMin = () => {
    setDashMin(() => !dashMin);
  };

  const handleActiveSection = (section: string) => {
    dispatch(setActiveSection(section))
    
  };

  const {data, isLoading, error} = useGetAdminQuery(user_id)
  let isAdmin = null;
  if(data) {
    isAdmin = data.admin
  }
  return (
    <>
    {
      isLoading && <BigLoader/>
    }


    { isAdmin && <>
    
      <DashboardTopNav />

      <main className="flex gap-4 w-full h-screen bg-[#f7f7f7]  dark:bg-primary-dark ">
        
        <DashboardSideBar
          activeSection={activeSection}
          dashMin={dashMin}
          handleActiveSection={handleActiveSection}
          handleDashMin={handleDashMin}
        />
        
        <article className={`flex flex-col gap-4 w-full ${dashMin ? "lg:ml-[70px]" : "lg:ml-[170px]"} lg:ml-[170px] px-6 py-4`}>
          <section className="space-y-4">
            <h1 className="font-bold text-3xl mt-2">{activeSection}</h1>
            <Separator className="bg-black opacity-70 dark:bg-slate-50" />
          </section>
          
          {activeSection === "Overview" && <Overview />}
         
          {activeSection === "Orders" &&  <AllTripsTable /> }

          {activeSection === "Users" && (
            <>
              <section className="lg:hidden flex gap-2">
                <Button
                  variant={"empty"}
                  className="space-x-1 bg-black hover:bg-secondary-dark hover:dark:bg-white text-white  dark:border  dark:text-primary-dark dark:bg-slate-50"
                >
                  <MdOutlineSportsMotorsports className="text-xl -scale-x-100" />
                  <p>Riders</p>
                </Button>

                <Button
                  variant={"empty"}
                  className="space-x-1 bg-black hover:bg-secondary-dark hover:dark:bg-white text-white  dark:border  dark:text-primary-dark dark:bg-slate-50"
                >
                  <RiSteering2Line className="text-xl " />
                  <p>Drivers</p>
                </Button>
              </section>
              <section>
                <AllUsers />
              </section>
              
            </>
          )}

          {activeSection === "Track Order" && <TrackOrder /> }

          {activeSection === "Riders" && <AllRiders />}

          {activeSection === "Drivers" && <AllDrivers />}
          
          {activeSection === "Edit Profile" &&  <CustomerProfile /> }
        </article>
      </main>
      <DashboardBottomNav activeSection={activeSection}  onClickFunc={handleActiveSection}  />
      </>
}

{(isAdmin === false || error) && (
        <section className="flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark min-h-screen gap-4">
          <h2 className="font-bold text-2xl">Page Not Found</h2>
          <Link href={"/"}>
            
            <Button>Return Home </Button>
          </Link>
        </section>
      )}
    </>
  );
}
