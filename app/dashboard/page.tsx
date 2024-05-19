'use client'
import { useState } from "react"

//icons + ui


import { TbRoute, TbUser, TbUserEdit, TbLayoutDashboard, TbLayoutSidebarRightCollapseFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { RiSteering2Line, RiFileListLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";


//main components
import { RecentTripTable } from "@/components/dashboard-components/recent-trips";
import TrackOrder from "@/components/dashboard-components/track-order";
import CustomerProfile from "@/components/forms/customer-profile";
import { Button } from "@/components/ui/button";
import { DashboardBottomNav } from "@/components/dashboard-bottom-nav";
import DashboardTopNav from "@/components/dashboard-top-nav";

export default function Dashboard () {
    const [dashMin, setDashMin] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('Overview');

    
    const handleDashMin = ()=> {
        setDashMin(()=>!dashMin)
    }

    const handleActiveSection = (section:string)=> {
        setActiveSection(section)
    }
    return (
      <>
      <DashboardTopNav/>
      <main className="flex gap-4 w-full  bg-[#f7f7f7] dark:bg-[#121212]">
        {/* Side Bar */}
        <article
          className={`hidden lg:flex flex-col fixed  ${
            dashMin ? "w-[60px]" : "md:w-[150px] w-[60px]"
          } py-4  px-2 bg-blue-500 h-[600px] text-white z-50  items-center justify-between rounded-xl mt-2 ml-4`}
        >
          <div className="flex flex-col gap-5">
            <div
              className="flex items-center justify-center  w-full h-8 rounded-lg  cursor-pointer "
              onClick={handleDashMin}
            >
              {dashMin && (
                <TbLayoutSidebarRightCollapseFilled className="text-2xl" />
              )}

              {!dashMin && (
                <div className="flex gap-2">
                  <p>Hailit</p>
                  <TbLayoutSidebarLeftCollapseFilled className="text-2xl" />
                </div>
              )}
            </div>
            <Separator className="bg-white dark:bg-slate-50" />
            <DashboardSections
              dashMin={dashMin}
              sectionName="Overview"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbLayoutDashboard className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Orders"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <RiFileListLine className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Track Order"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbRoute className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Users"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbUser className="text-2xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Riders"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <MdOutlineSportsMotorsports className="text-2xl -scale-x-100" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Drivers"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <RiSteering2Line className="text-2xl -scale-x-100" />
            </DashboardSections>
          </div>
           
           <div className="text-center w-full ml-2">
          <DashboardSections
            dashMin={dashMin}
            sectionName="Edit Profile"
            onClickFunc={handleActiveSection}
            activeSection={activeSection}
          >
            <TbUserEdit className="text-2xl " />
          </DashboardSections>

          <DashboardSections
            dashMin={dashMin}
            sectionName="Logout"
            onClickFunc={handleActiveSection}
            activeSection={activeSection}
          >
            <IoLogOutOutline className="text-2xl " />
          </DashboardSections>

          </div>   
        </article>
        {/* Other sections */}
        <article
          className={`flex flex-col gap-4 w-full ${
            dashMin ? "lg:ml-[70px]" : "lg:ml-[170px]"
          } lg:ml-[170px] px-6 py-4`}
        >
          {/* OVERVIEW */}
          <section className="space-y-4">
            <h1 className="font-bold text-3xl mt-2">{activeSection}</h1>
            <Separator className="bg-black opacity-70 dark:bg-slate-50"/>
          </section>
          {activeSection === "Overview" && (
            <section className="space-y-6 w-full">
              <div className="flex flex-col md:flex-row w-full gap-4">
                <Container className="flex flex-col gap-4 w-full md:w-1/4 h-40 rounded-xl">
                  <div className="flex items-center justify-center py-4 gap-2">
                    <RiFileListLine className="text-3xl" />
                    <p className="font-bold text-lg">Total Deliveries</p>
                  </div>
                </Container>
                <Container className="flex flex-col gap-4 w-full md:w-1/4 h-40 rounded-xl">
                  <p>Pending Deliveries</p>
                </Container>
                <Container className="flex flex-col gap-4 w-full md:w-1/4 h-40 rounded-xl">
                  <p>In transit</p>
                </Container>
                <Container className="flex flex-col gap-4 w-full md:w-1/4 h-40 rounded-xl">
                  <p>Payments</p>
                </Container>
              </div>
              <div className="flex flex-col lg:flex-col gap-4 w-full ">
                <div className="flex flex-col w-full lg:w-full  gap-2 p-4 h-full rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-[#1e1e1e] dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
                  <h3 className="font-bold">Most Recent Trips</h3>
                  <RecentTripTable />
                </div>
              </div>
            </section>
          )}
          {/* ORDERS */}

          {activeSection === "Orders" &&
          <section>
            <RecentTripTable />
          </section>
          }

          {/* USERS */}
          {activeSection === "Users" &&
          <>
          <section className="flex gap-2">
            <Button variant={'empty'}  className="space-x-1 bg-black hover:bg-[#1e1e1e] hover:dark:bg-white text-white  dark:border  dark:text-[#121212] dark:bg-slate-50">
                <MdOutlineSportsMotorsports className="text-xl -scale-x-100"/>
                <p>Riders</p>
                </Button>
              
                <Button variant={'empty'}  className="space-x-1 bg-black hover:bg-[#1e1e1e] hover:dark:bg-white text-white  dark:border  dark:text-[#121212] dark:bg-slate-50">
                <RiSteering2Line className="text-xl "/>
                <p>Drivers</p>
                </Button>
            </section>
          <section>
            <RecentTripTable />
          </section>
          </>
          }
          
          {/* TRACK ORDER */}
          { activeSection === "Track Order" &&
          (<>
          
            
            <section>
              <TrackOrder/>
            </section>
            </>
          )
          }

          {/* EDIT PROFILE */}
          { activeSection === "Edit Profile" &&
            <section>
            <CustomerProfile/>
          </section>
          }
        </article>
      </main>
      <DashboardBottomNav activeSection={activeSection} onClickFunc={handleActiveSection}/>
      </>
    );
}

export const DashboardSections = ({children, dashMin, sectionName, activeSection, onClickFunc}:{children: React.ReactNode, dashMin: boolean, sectionName: string, activeSection: string, onClickFunc: (section:string)=>void})=> {
    return (
    <div onClick={()=>onClickFunc(sectionName)} className={`flex h-10 p-2  items-center w-full hover:text-blue-500 hover:bg-white rounded-md text-sm ${ dashMin ? "justify-center" : "md:justify-between justify-center"}  cursor-pointer ${activeSection === sectionName ? 'bg-white text-blue-500': ''}`} >
          <div className="flex items-center justify-center gap-2 ">
            {children}
            {!dashMin && <p className="hidden md:inline text-md font-bold"> {sectionName} </p>}
          </div>
        </div>)
}