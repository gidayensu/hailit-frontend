'use client'
import { Separator } from "@/components/ui/separator"
import { userLogout } from "@/lib/store/actions"
import { useAppDispatch } from "@/lib/store/hooks"
import { ActiveSection } from "@/lib/store/slice/dashboardSlice"
import { supabaseSignOut } from "@/lib/supabaseAuth"
import { useRouter } from "next/navigation"
import { IoLogOutOutline } from "react-icons/io5"
import { MdInsertChartOutlined, MdOutlineSportsMotorsports } from "react-icons/md"
import { RiFileListLine, RiMotorbikeFill, RiSteering2Line } from "react-icons/ri"
import { TbLayoutDashboard, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled, TbRoute, TbUser, TbUserEdit } from "react-icons/tb"
import DashboardSections from "./DashboardSections"

export default function DashboardSideBar({
  dashMin,
  handleDashMin,
  handleActiveSection,
  
}: {
  dashMin: boolean;
  handleDashMin: () => void;
  handleActiveSection: (section: ActiveSection) => void;
  
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignOut = () => {
    dispatch(userLogout());
    supabaseSignOut();
    router.push("/");
  };
  return (
    <article
      className={`hidden lg:flex flex-col fixed lg:h-[440px] ${
        dashMin
          ? "w-[60px] transition-all duration-300"
          : "md:w-[180px] w-[60px] transition-all duration-300"
      } py-4  px-2  bg-primary-color h-[600px] text-white z-50  items-center justify-start rounded-xl mt-2 ml-4 mb-10`}
    >
      <div className="flex flex-col gap-1 ">
        <div
          className="flex items-center justify-center  w-full h-8 rounded-lg  cursor-pointer "
          onClick={handleDashMin}
        >
          {dashMin && (
            <TbLayoutSidebarRightCollapseFilled className="text-2xl" />
          )}

          {!dashMin && (
            <div className="flex gap-2 transition-all duration-300">
              <p>Hailit</p>
              <TbLayoutSidebarLeftCollapseFilled className="text-2xl transition-all duration-300" />
            </div>
          )}
        </div>
        <Separator className="bg-white dark:bg-slate-50" />
        <DashboardSections
          dashMin={dashMin}
          sectionName="Overview"
          onClickFunc={handleActiveSection}
          
          url="/"
        >
          <TbLayoutDashboard className="text-2xl" />
        </DashboardSections>

        <DashboardSections
          dashMin={dashMin}
          sectionName="Orders"
          onClickFunc={handleActiveSection}
          
          url="orders"
        >
          <RiFileListLine className="text-2xl" />
        </DashboardSections>

        <DashboardSections
          dashMin={dashMin}
          sectionName="Track Order"
          onClickFunc={handleActiveSection}
          
          url="track-order"
        >
          <TbRoute className="text-2xl" />
        </DashboardSections>

        <DashboardSections
          dashMin={dashMin}
          sectionName="Users"
          onClickFunc={handleActiveSection}
          
          url="users"
        >
          <TbUser className="text-2xl" />
        </DashboardSections>

        <DashboardSections
          dashMin={dashMin}
          sectionName="Riders"
          onClickFunc={handleActiveSection}
          
          url="dispatchers/riders"
        >
          <MdOutlineSportsMotorsports className="text-2xl -scale-x-100" />
        </DashboardSections>

        <DashboardSections
          dashMin={dashMin}
          sectionName="Drivers"
          onClickFunc={handleActiveSection}
          
          url="dispatchers/drivers"
        >
          <RiSteering2Line className="text-2xl -scale-x-100" />
        </DashboardSections>
        <DashboardSections
          dashMin={dashMin}
          sectionName="Vehicles"
          onClickFunc={handleActiveSection}
          
          url="vehicles"
        >
          <RiMotorbikeFill className="text-2xl -scale-x-100" />
        </DashboardSections>
        <DashboardSections
          dashMin={dashMin}
          sectionName="Analytics"
          onClickFunc={handleActiveSection}
          
          url="analytics"
        >
          <MdInsertChartOutlined className="text-2xl -scale-x-100" />
        </DashboardSections>
        <DashboardSections
          dashMin={dashMin}
          sectionName="Profile"
          onClickFunc={handleActiveSection}
          
          url="profile"
        >
          <TbUserEdit className="text-2xl " />
        </DashboardSections>

        <DashboardSections
          dashMin={dashMin}
          sectionName="Sign Out"
          onClickFunc={handleSignOut}
          url="#"
        >
          <IoLogOutOutline className="text-2xl " />
        </DashboardSections>
      </div>

      
    </article>
  );
}