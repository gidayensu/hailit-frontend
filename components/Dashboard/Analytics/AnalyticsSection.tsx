import TripAreaChart from "./TripAreaChart";
import TripMediumChart from "./TripMediumChart";
import TripPackageType from "./TripPackageType";
import TripRevenueChart from "./TripRevenueChart";
import TripStatusChart from "./TripStatusChart";


export default function AnalyticsSection() {
  return (
    <main className="w-full flex flex-col gap-5 mb-10">
      <div className="w-full">
        <TripRevenueChart />
      </div>
      <div className="flex flex-col md:flex-row w-full gap-5">
        <div className="w-full md:w-1/2">
          <TripStatusChart />
        </div>
        <div className="w-full md:w-1/2">
          <TripAreaChart />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-5">
        <div className="w-full md:w-1/2">
          <TripMediumChart />
        </div>
        <div className="w-full md:w-1/2">
          <TripPackageType />
        </div>
      </div>
    </main>
  );
}
