
import { useRef } from "react";
import { StatsLoadingSkeleton } from "@/components/Order/skeletons/StatsLoadingSkeleton"
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function  ChartContainer ({loading, chartOptions}:{loading:boolean,  chartOptions: Highcharts.Options }) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    return (
        <div className='w-full flex items-center justify-center rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100 p-2 h-full'>
          
        {loading && 
        <div className='h-52 md:h-72 flex items-center justify-center'>

        <StatsLoadingSkeleton/>
    </div>
        }
{!loading &&
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartComponentRef}
        />
}
    </div>
    
    )
}