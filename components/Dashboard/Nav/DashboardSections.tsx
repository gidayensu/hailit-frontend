import { ActiveSection } from "@/lib/store/slice/dashboardSlice";
export default function DashboardSections({
    children,
    dashMin,
    sectionName,
    activeSection,
    onClickFunc,
  }: {
    children: React.ReactNode;
    dashMin: boolean;
    sectionName: ActiveSection;
    activeSection: string;
    onClickFunc: (section: ActiveSection) => void;
  }) {
    return (
      <div
        onClick={() => onClickFunc(sectionName)}
        className={`flex h-8 p-2  items-center w-full hover:text-primary-color hover:bg-white rounded-md text-[12px] ${
          dashMin ? "justify-center transition-all duration-300" : "md:justify-between justify-center transition-all duration-300"
        }  cursor-pointer ${
          activeSection === sectionName ? "bg-white text-primary-color" : ""
        }`}
      >
        <div className="flex items-center justify-center gap-2 transition-all duration-300 transform translate-x-[100%] md:translate-x-0">
          {children}
          {!dashMin && (
            <p className="hidden md:inline text-md font-bold transition-all duration-300 transform translate-x-[100%] md:translate-x-0"> {sectionName} </p>

          )}
        </div>
      </div>
    );
  }
  