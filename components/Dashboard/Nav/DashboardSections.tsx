import { ActiveSection } from "@/lib/store/slice/dashboardSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSections({
    children,
    dashMin,
    sectionName,
    onClickFunc,
    url,
    
  }: {
    children: React.ReactNode;
    dashMin: boolean;
    sectionName: ActiveSection;
    onClickFunc?: ()=>void
    url:string
    
  }) {

    const path = usePathname();
    const fullUrl = `/dashboard/${url}`;
    
    return (
      <Link href={`/dashboard/${url}`}>
      <div
        onClick={onClickFunc}
        className={`flex h-8 p-2  items-center w-full hover:text-primary-color hover:bg-white rounded-md text-[12px] ${
          dashMin ? "justify-center transition-all duration-300" : "md:justify-between justify-center transition-all duration-300"
        }  cursor-pointer ${
          path.startsWith(fullUrl) || (sectionName === 'Overview' && path === '/dashboard') ? "bg-white text-primary-color" : ""
        }`}
        >
        <div className="flex items-center justify-center gap-2 transition-all duration-300 transform translate-x-[100%] md:translate-x-0">
          {children}
          {!dashMin && (
            <p className="hidden md:inline text-md font-bold transition-all duration-300 transform translate-x-[100%] md:translate-x-0"> {sectionName} </p>
            
          )}
        </div>
      </div>
          </Link>
    );
  }
  