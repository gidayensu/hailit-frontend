import * as Highcharts from 'highcharts';
import { useSetTheme } from '../Nav/hook/useSetTheme';
import ChartContainer from './ChartContainer';
import { useTripStatusData } from './hooks/useTripStatusData';
// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.

// { name: categories[0], y: data[0] },
export default function TripStatusChart () {
  const { theme } = useSetTheme();

  //cancelled trips && tripMonths, && totaltrips
  const {delivered, cancelled, tripMonths, totalMonthsData, loading, error, pending} = useTripStatusData();
  const statusOption: Highcharts.Options = {
    chart: {
      backgroundColor: theme==="dark" ? "#1E1E1E" : "white",
      
      
    },
    responsive: {  
      rules: [{  
        condition: {  
          maxWidth: 1000  
        }  }]
      },
    title: { text: "Trip Status" },
    xAxis: {
      categories: tripMonths,
      title: { text: "Months",
        
      },
      
      
    },
    yAxis: { title: { text: "Trip Counts" } },
    series: [
      {
        name: "Cancelled Trips",
        color: 'red',
        type: "column",
          className: 'text-red-500',

        data: tripMonths && tripMonths.map((month:string, index:number) => ({
          name: month,
          y: cancelled && cancelled[index] || 0,
          
        })),
      
              
      },
      {
        name: "Delivered Trips",
        
        type: "column",
          className: 'text-red-500',

        data: tripMonths && tripMonths.map((month:string, index:number) => ({
          name: month,
          y: delivered && delivered[index] || 0,
          
        })),
      
              
      },
      {
        name: "Pending",
        
        type: "column",
          className: 'text-red-500',

        data: tripMonths && tripMonths.map((month:string, index:number) => ({
          name: month,
          y: pending && pending[index] || 0,
          
        })),
      
              
      },
      {
        name: "All Trips",
        
        type: "column",
          className: 'text-red-500',

        data: tripMonths && tripMonths.map((month:string, index:number) => ({
          name: month,
          y: totalMonthsData && totalMonthsData[index] || 0,
          
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
  
  
  return (
    <ChartContainer chartOptions={statusOption} loading={loading}/>  
  );
};