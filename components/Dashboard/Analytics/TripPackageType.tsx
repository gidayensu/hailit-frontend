import * as Highcharts from "highcharts";
import { useSetTheme } from "../Nav/hook/useSetTheme";
import ChartContainer from "./ChartContainer";
import { usePackageTypeData } from "./hooks/usePackageTypeData";

export default function TripPackageType() {
  const { theme } = useSetTheme();

  const {
    clothes,
    documents,
    bulkyItems,
    tripMonths,
    loading,
    electronics,
    fragile,
    others,
  } = usePackageTypeData();

  const packageOption: Highcharts.Options = {
    chart: {
      backgroundColor: theme === "dark" ? "#1E1E1E" : "white",
    },
    title: { text: "Package Types " },
    xAxis: {
      categories: tripMonths,
      title: { text: "Months" },
    },
    yAxis: { title: { text: "Trip Counts" } },
    series: [
      {
        name: "Documents ",

        type: "column",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (documents && documents[index]) || 0,
          })),
      },
      {
        name: "Clothes ",
        type: "column",
        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (clothes && clothes[index]) || 0,
          })),
      },
      {
        name: "Bulky Items",
        type: "column",
        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (bulkyItems && bulkyItems[index]) || 0,
          })),
      },
      {
        name: "Others",
        type: "column",
        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (others && others[index]) || 0,
          })),
      },
      {
        name: "Electronics",
        type: "column",
        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (electronics && electronics[index]) || 0,
          })),
      },
      {
        name: "Fragile",
        type: "column",
        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (fragile && fragile[index]) || 0,
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
              textOutcolumn: "none",
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
  

  return <ChartContainer chartOptions={packageOption} loading={loading} />;
}
