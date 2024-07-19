import * as Highcharts from "highcharts";
import { useSetTheme } from "../Nav/hook/useSetTheme";
import ChartContainer from "./ChartContainer";
import { useTripRevenue } from "./hooks/useTripRevenue";

export default function TripRevenueChart() {
  const { theme } = useSetTheme();

  const { revenue, tripMonths, revenueLoading,  } =
    useTripRevenue();

  const revenueOption: Highcharts.Options = {
    chart: {
      backgroundColor: theme === "dark" ? "#1E1E1E" : "white",
    },
    title: { text: "Trip Revenue " },
    xAxis: {
      categories: tripMonths,
      title: { text: "Months" },
    },
    yAxis: { title: { text: "Revenue" } },
    series: [
      {
        name: "Revenue ",

        type: "column",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (revenue && revenue[index]) || 0,
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
  
  return (
    <ChartContainer chartOptions={revenueOption} loading={revenueLoading} />
  );
}
