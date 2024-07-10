
import HighchartsReact from "highcharts-react-official";
import TripStatusChart from "./TripStatusChart";
import TripAreaChart from "./TripAreaChart";
import TripMediumChart from "./TripMediumChart";
import TripPackageType from "./TripPackageType";
// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.



export default function AnalyticsSection(props: HighchartsReact.Props) {
  

  return (
    <main className="w-full flex flex-col gap-5 mb-10">
      
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
