"use client";
// next
import { usePathname } from "next/navigation";
import Link from "next/link";
//ui + icons
import { MdInsertChartOutlined } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { TbRoute, TbUser, TbLayoutDashboard } from "react-icons/tb";
import { RiFileListLine } from "react-icons/ri";
import { ActiveSection } from "@/lib/store/slice/dashboardSlice";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/navigation";

export function DashboardBottomNav({
  activeSection,
  setActiveSection,
}: {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}) {
  
  const router = useRouter();

  

  

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 top-auto z-50 flex justify-center items-center p-4 h-20 shadow-2xl gap-3 md:gap-5 w-full bg-white dark:bg-secondary-dark font-medium">
      
      <DashboardBottomNavElement
        activeSection={activeSection}
        navTitle="Orders"
        
        setActiveSection={setActiveSection}
        Icon={RiFileListLine}
        url="orders"
      />
      
      <DashboardBottomNavElement
        activeSection={activeSection}
        navTitle="Users"
        
        setActiveSection={setActiveSection}
        Icon={LuUsers}
        url="users"
      />
      
     

      <DashboardBottomNavElement
        activeSection={activeSection}
        navTitle="Overview"
        
        setActiveSection={setActiveSection}
        Icon={TbLayoutDashboard}
        url="/"
      />
      

      <DashboardBottomNavElement
        activeSection={activeSection}
        navTitle="Analytics"
        
        setActiveSection={setActiveSection}
        Icon={MdInsertChartOutlined}
        url="analytics"
      />
      
      
      <DashboardBottomNavElement
        activeSection={activeSection}
        navTitle="Profile"
        
        setActiveSection={setActiveSection}
        Icon={TbUser}
        url="profile"
      />
      
    </nav>
  );
}

const DashboardBottomNavElement = ({
  
  setActiveSection,
  
  navTitle,
  Icon,
  url
}: {
  navTitle: ActiveSection;
  
  Icon: IconType
  setActiveSection: (activeSection: ActiveSection) => void;
  activeSection: ActiveSection;
  url: string;
}) => {

  const path = usePathname();

  return (
    <div className="flex flex-col justify-center items-center ">
      <Link href={`/dashboard/${url}`} className="w-full">
      <Button
        onClick={() => setActiveSection(navTitle)}
        variant={path.startsWith(`/dashboard/${url}`) || (navTitle === 'Overview' && path === '/dashboard') ? "default" : "secondary"}
        className="border-none"
      >
        <Icon className="h-5 w-5  " />
      </Button>
      </Link>
      <p
        className={`text-[12px] ${
          path.startsWith(`/dashboard/${url}`) || (navTitle === 'Overview' && path === '/dashboard')
            ? "text-primary-shade dark:text-white"
            : ""
        }`}
      >
        {navTitle}
      </p>
    </div>
  );
};