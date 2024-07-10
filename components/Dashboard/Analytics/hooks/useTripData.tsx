// ATTEMPT TO REFACTOR WILL REVISIT: TYPE ERRORS

// import { useAnalytics, TripColumn } from "./useAnalytics";
// import {
//     PackageType,
//     TripStatus,
//     TripArea,
//     TripMedium,
//     TripType,
//   } from "@/components/Order/types/Types";

// type Conditions = PackageType[] | TripStatus[] | TripArea[] | TripMedium[] | TripType[]

// const useTripData = (tripColumn: TripColumn, conditions: Conditions) => {
//   const {
//     tripMonths,
//     tripMonthsLoading,
//     tripMonthsError,
//     totalMonthsData,
//     totalMonthsDataError,
//     totalMonthsDataLoading,
//   } = useAnalytics({ trip_column: tripColumn });

//   const conditionData = conditions.map((condition) => {
//     const {
//       conditionalMonthsData,
//       conditionalDataLoading,
//       conditionalDataError,
//     } = useAnalytics({ trip_column: tripColumn, trip_column_condition: condition });

//     return { data: conditionalMonthsData, loading: conditionalDataLoading, error: conditionalDataError };
//   });

//   const loading = conditionData.some((condition) => condition.loading) || tripMonthsLoading || totalMonthsDataLoading;
//   const error = conditionData.some((condition) => condition.error) || tripMonthsError || totalMonthsDataError;

//   return {
//     tripMonths,
//     totalMonthsData,
//     loading,
//     error,
//     conditionData,
//   };
// };

// export default useTripData;


//OTHER COMPONENTS
// import useTripData from "./useTripData";

// export const useTripAreaData = () => {
//   const tripColumn = 'trip_area';
//   const conditions = ['Accra', 'Kumasi', 'Inter City'];

//   const { tripMonths, totalMonthsData, loading, error, conditionData } = useTripData(tripColumn, conditions);

//   const [accra, kumasi, interCity] = conditionData.map(condition => condition.data);

//   return { accra, kumasi, interCity, tripMonths, totalMonthsData, loading, error };
// };

