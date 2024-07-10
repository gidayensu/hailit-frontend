'use client'
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/store/hooks"
import { supabaseSignOut } from "@/lib/supabaseAuth"
import { userLogout } from "@/lib/store/actions"
import { TbLayoutDashboard, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled, TbRoute, TbUser, TbUserEdit } from "react-icons/tb"
import { PiMotorcycleFill } from "react-icons/pi";
import { RiMotorbikeFill } from "react-icons/ri";
import DashboardSections from "./DashboardSections"
import { Separator } from "@/components/ui/separator"
import { RiFileListLine, RiSteering2Line } from "react-icons/ri"
import { IoLogOutOutline } from "react-icons/io5"
import { MdOutlineSportsMotorsports } from "react-icons/md"
import { MdInsertChartOutlined } from "react-icons/md";
import { ActiveSection } from "@/lib/store/slice/dashboardSlice"

export default function DashboardSideBar ({dashMin, handleDashMin, handleActiveSection, activeSection}: {dashMin: boolean, handleDashMin: ()=>void, handleActiveSection: (section: ActiveSection)=>void, activeSection:ActiveSection }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignOut = ()=> {
    dispatch(userLogout())
    supabaseSignOut();
    router.push('/')
  }  
    return (
        <article
          className={`hidden lg:flex flex-col fixed lg:h-[440px] ${
            dashMin ? "w-[60px] transition-all duration-300" : "md:w-[150px] w-[60px] transition-all duration-300"
          } py-4  px-2  bg-primary-color h-[600px] text-white z-50  items-center justify-start rounded-xl mt-2 ml-4 mb-10`}
        >
          <div className="flex flex-col gap-1 ">
            <div
              className="flex items-center justify-center  w-full h-8 rounded-lg  cursor-pointer "
              onClick={handleDashMin}
            >
              {dashMin && (
                <TbLayoutSidebarRightCollapseFilled className="text-xl" />
              )}

              {!dashMin && (
                <div className="flex gap-2 transition-all duration-300">
                  <p>Hailit</p>
                  <TbLayoutSidebarLeftCollapseFilled className="text-xl transition-all duration-300" />
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
              <TbLayoutDashboard className="text-xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Orders"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <RiFileListLine className="text-xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Track Order"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbRoute className="text-xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Users"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbUser className="text-xl" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Riders"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <MdOutlineSportsMotorsports className="text-xl -scale-x-100" />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Drivers"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <RiSteering2Line className="text-xl -scale-x-100" />
            </DashboardSections>
            <DashboardSections
              dashMin={dashMin}
              sectionName="Vehicles"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <RiMotorbikeFill className="text-xl -scale-x-100" />
            </DashboardSections>
            <DashboardSections
              dashMin={dashMin}
              sectionName="Analytics"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <MdInsertChartOutlined className="text-xl -scale-x-100" />
            </DashboardSections>
            <DashboardSections
              dashMin={dashMin}
              sectionName="Profile"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbUserEdit className="text-xl " />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Sign Out"
              onClickFunc={handleSignOut}
              activeSection={activeSection}
            >
              <IoLogOutOutline className="text-xl " />
            </DashboardSections>
          </div>

          {/* <div className="text-center w-full ml-2">
            <DashboardSections
              dashMin={dashMin}
              sectionName="Profile"
              onClickFunc={handleActiveSection}
              activeSection={activeSection}
            >
              <TbUserEdit className="text-xl " />
            </DashboardSections>

            <DashboardSections
              dashMin={dashMin}
              sectionName="Sign Out"
              onClickFunc={handleSignOut}
              activeSection={activeSection}
            >
              <IoLogOutOutline className="text-xl " />
            </DashboardSections>
          </div> */}
        </article>
    )
}