import * as Highcharts from "highcharts";

import { useSetTheme } from "../../Theme/hooks/useSetTheme";
import ChartContainer from "./ChartContainer";
import { useTripAreaData } from "./hooks/useTripAreaData";

export default function TripAreaChart() {
  const { theme, systemTheme } = useSetTheme();

  const {
    kumasi,
    accra,
    tripMonths,
    totalMonthsData,
    loading,
    interCity,
    
  } = useTripAreaData();
  //accra trips && tripMonths, && totaltrips

  const areaOption: Highcharts.Options = {
    chart: {
      backgroundColor: theme === "dark" || (theme === "system" && systemTheme === "dark") ? "#1E1E1E" : "white",
    },
    title: { text: "Trip Area " },
    xAxis: {
      categories: tripMonths,
      title: { text: "Months" },
    },
    yAxis: { title: { text: "Trip Counts" } },
    series: [
      {
        name: "Accra ",

        type: "column",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (accra && accra[index]) || 0,
          })),
      },
      {
        name: "Kumasi ",

        type: "column",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (kumasi && kumasi[index]) || 0,
          })),
      },
      {
        name: "Inter City",

        type: "column",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (interCity && interCity[index]) || 0,
          })),
      },
      {
        name: "All Trips",

        type: "column",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (totalMonthsData && totalMonthsData[index]) || 0,
          })),
      },
    ],

    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
          },
          {
            enabled: true,

            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
  };
  

  return <ChartContainer chartOptions={areaOption} loading={loading} />;
}
