'use client'
import { useState } from "react"

//icons + ui

import { LuUser } from "react-icons/lu";
import { TbLayoutDashboard, TbLayoutSidebarRightCollapseFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { RiSteering2Line, RiFileListLine } from "react-icons/ri";
import { IoLogOutOutline, IoAnalyticsOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/ui/container";

//main components
import OrderSummaryLessDetail from "@/components/order-components/order-summary-less-detail";

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
        <main className="flex gap-4 w-full h-full  bg-[#f7f7f7]">
      <article  className={`flex flex-col fixed  ${dashMin ? "w-[60px]" : "md:w-[150px] w-[60px]" } py-4  px-2 bg-blue-500 h-[600px] text-white z-50  items-center justify-between rounded-xl mt-2 ml-4`}>
        
        <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center  w-full h-8 rounded-lg  cursor-pointer " onClick={handleDashMin}>
        {
        dashMin &&        
                <TbLayoutSidebarRightCollapseFilled className="text-2xl" />
        }

        {
            !dashMin && 
            <div className="flex gap-2">
                <p>Hailit</p>
                <TbLayoutSidebarLeftCollapseFilled className="text-2xl" />
            </div>
        }
        
        </div>
        <Separator className="bg-white"/>
        <DashboardSections dashMin={dashMin} sectionName="Overview" onClickFunc={handleActiveSection} activeSection={activeSection}>
            <TbLayoutDashboard className="text-2xl" />
        </DashboardSections>

        <DashboardSections dashMin={dashMin} sectionName="Orders" onClickFunc={handleActiveSection} activeSection={activeSection} >
            <RiFileListLine className="text-2xl" />
        </DashboardSections>

        <DashboardSections dashMin={dashMin} sectionName="Track Order" onClickFunc={handleActiveSection} activeSection={activeSection}>
            <IoAnalyticsOutline className="text-2xl" />
        </DashboardSections>

        <DashboardSections dashMin={dashMin} sectionName="Users" onClickFunc={handleActiveSection} activeSection={activeSection}>
            <LuUser className="text-2xl" />
        </DashboardSections>

        <DashboardSections dashMin={dashMin} sectionName="Riders" onClickFunc={handleActiveSection} activeSection={activeSection}>
            <MdOutlineSportsMotorsports className="text-2xl -scale-x-100" />
        </DashboardSections>
        
        <DashboardSections dashMin={dashMin} sectionName="Drivers" onClickFunc={handleActiveSection} activeSection={activeSection}>
            <RiSteering2Line className="text-2xl -scale-x-100" />
        </DashboardSections>
        </div>

        <DashboardSections dashMin={dashMin} sectionName="Logout" onClickFunc={handleDashMin} activeSection={activeSection}>
            <IoLogOutOutline className="text-2xl -scale-x-100 mr-2" />
        </DashboardSections>
      </article>
      {/* Other sections */}
      <article className={`flex flex-col gap-4 w-full ${dashMin ? 'ml-[70px]': 'ml-[170px]'} ml-[170px] px-6 py-4`}>
        {/* Active Session */}
        <section className="space-y-4">
            <h1 className="font-bold text-3xl mt-4">
                {activeSection}
            </h1>
            <Separator className="bg-black opacity-70"/>
        </section>
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
            <div className="flex flex-col lg:flex-row gap-4 w-full">
                <div className="flex flex-col w-full lg:w-2/4 border gap-2 p-4 h-full rounded-xl">
                        <div className="space-y-2 mb-3">
                            <h3 className="font-bold">Most Recent Trips</h3>
                            <Separator/>
                        </div>
                        <OrderSummaryLessDetail deliveryStatus="Booked" packageType="Others" />
                        <OrderSummaryLessDetail deliveryStatus="Delivering" packageType="Gadgets" />
                        <OrderSummaryLessDetail deliveryStatus="Cancelled" packageType="Fragile" />
                        <OrderSummaryLessDetail deliveryStatus="Cancelled" packageType="Parcel" />
                        <OrderSummaryLessDetail deliveryStatus="Booked" packageType="Fragile" />
                        <OrderSummaryLessDetail deliveryStatus="Picked up" packageType="Food" />
                </div>
                
                <div className="flex flex-col w-full lg:w-2/4 border gap-2 p-4 h-full rounded-xl">
                        <p>sdfsdfsdf</p>
                </div>
            </div>
            
        </section>
      </article>
      </main>
    );
}

export const DashboardSections = ({children, dashMin, sectionName, activeSection, onClickFunc}:{children: React.ReactNode, dashMin: boolean, sectionName: string, activeSection: string, onClickFunc: (section:string)=>void})=> {
    return (
    <div onClick={()=>onClickFunc(sectionName)} className={`flex h-10 p-2  items-center w-full hover:text-blue-500 hover:bg-white rounded-md text-sm ${ dashMin ? "justify-center" : "md:justify-between justify-center"} hover:text-white cursor-pointer ${activeSection === sectionName ? 'bg-white text-blue-500': ''}`} >
          <div className="flex items-center justify-center gap-2 ">
            {children}
            {!dashMin && <p className="hidden md:inline text-md font-bold"> {sectionName} </p>}
          </div>
        </div>)
}