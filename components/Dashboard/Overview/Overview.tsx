//ui + icons
import { FaMoneyCheckAlt } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { RiFileList2Line } from "react-icons/ri";
import { LuPackageCheck, LuPackageX, LuPackage  } from "react-icons/lu";
import { TbPackages } from "react-icons/tb";
//main components
import { RecentTripTable } from "./RecentTripTable";
import StatsCard from "./StatsCard";
import { useTripsStats } from "./hook/useTripsStats";
import { reversePercentageDifference } from "@/lib/utils";
export default function Overview() {
  const {currentMonthStats, isLoading, error} = useTripsStats();
  const pendingPD = reversePercentageDifference(currentMonthStats?.pending_percentage_difference)
  const cancelledPD = reversePercentageDifference(currentMonthStats?.cancelled_percentage_difference)
  
  return (
    <section className="space-y-6 w-full">
      <div className="flex flex-col lg:flex-row  w-full gap-3">
      <StatsCard
          title="Revenue"
          subtitle="This Month&lsquo;s Revenue"
          loading={isLoading}
          mainCount={currentMonthStats?.revenue_current_month || 0}
          percentageDifference={currentMonthStats?.revenue_percentage_difference || 0}
          currency= {true}
        />
        <div className="grid grid-cols-2 lg:flex  lg:flex-row  w-full gap-3">

        <StatsCard
          title="Orders"
          subtitle="This Month&lsquo;s Orders"
          loading={isLoading}
          mainCount={currentMonthStats?.total_trips_current_month || 0}
          percentageDifference={currentMonthStats?.total_trips_percentage_difference || 0}
          
        />
        
        
        
        <StatsCard
          title="Delivered"
          subtitle="Delivered This Month"
          loading={isLoading}
          mainCount={currentMonthStats?.delivered_current_month || 0}
          percentageDifference={currentMonthStats?.delivered_percentage_difference || 0}
          
        />
        <StatsCard
          title="Pending"
          subtitle="Packages Not Delivered"
          loading={isLoading}
          mainCount={currentMonthStats?.pending_current_month || 0}
          percentageDifference={pendingPD || 0}
          reversed = {true}
        />
        <StatsCard
          title="Cancelled"
          subtitle="Cancelled This Month"
          loading={isLoading}
          mainCount={currentMonthStats?.cancelled_current_month || 0} 
          percentageDifference={cancelledPD || 0}
          reversed = {true}
        />
        </div>
        
      </div>
        <div className="flex flex-col w-full   gap-2 p-4  rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
          <h3 className="font-bold">Most Recent Trips</h3>
          <RecentTripTable />
        </div>
      <div className="flex flex-col gap-4 w-full ">
      </div>
    </section>
  );
}
