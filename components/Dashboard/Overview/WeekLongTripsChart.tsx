import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSetTheme } from '../Nav/hook/useSetTheme';
import { StatsLoadingSkeleton } from '@/components/Order/skeletons/StatsLoadingSkeleton';

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.

// { name: categories[0], y: data[0] },
export default function WeekLongTripsChart ({props,categories, loading, data }:{props?: HighchartsReact.Props, loading:boolean, categories: string[], data: string[]}) {
  const { theme } = useSetTheme();
  
  const lineOption: Highcharts.Options = {
    chart: {
      backgroundColor: theme==="dark" ? "#1E1E1E" : "white",
      
      
    },
    title: { text: "Current Week Trips" },
    xAxis: {
      categories: categories,
      title: { text: "Days",
        
      },
      
      
    },
    yAxis: { title: { text: "Trip Count" } },
    series: [
      {
        name: "Number of Trips",
        
        type: "spline",
          className: 'text-red-500',

        data: categories && categories.map((category, index) => ({
          name: category,
          y: parseFloat(data ? data[index] : '0'),
          style: {
            color: 'red' // Color for y-axis title
          }
        })),
      
              
      },
    ],
    
    
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [{
          enabled: true,
  
      }, {
          enabled: true,
  
          format: '{point.percentage:.1f}%',
          style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
          },
          filter: {
              operator: '>',
              property: 'percentage',
              value: 10
          }
      }]
      },
    },
  };
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  
  return (
    <div className='w-full flex items-center justify-center rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100 p-2 h-full'>
    
        {loading && 
        <StatsLoadingSkeleton/>
        }
{!loading &&
        <HighchartsReact
          highcharts={Highcharts}
          options={lineOption}
          ref={chartComponentRef}
          {...props}
        />
}
    </div>
    
  );
};