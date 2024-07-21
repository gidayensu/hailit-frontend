import { useAnalytics } from "./useAnalytics"

export const useTripMediumData = ()=> {
    const {
        tripMonths,
        tripMonthsLoading,
        tripMonthsError,
        conditionalMonthsData: car,
        conditionalDataLoading: carLoading,
        conditionalDataError: carError,
        totalMonthsData,
        totalMonthsDataError,
        totalMonthsDataLoading,
      } = useAnalytics({trip_column: 'trip_medium', trip_column_condition: 'Car'})
      
      //deliverd trips stats
    
      const {
        conditionalMonthsData: motor,
        conditionalDataLoading: motorLoading,
        conditionalDataError: motorError,
      } = useAnalytics({trip_column: 'trip_medium', trip_column_condition: 'Motor'});
    
      const {
        conditionalMonthsData: truck,
        conditionalDataLoading: truckLoading,
        conditionalDataError: truckError,
      } = useAnalytics({trip_column: 'trip_medium', trip_column_condition: 'Truck'})
      

      const loading = truckLoading || motorLoading ||carLoading || tripMonthsLoading || totalMonthsDataLoading;
      const error = truckError || motorError ||carError || tripMonthsError || totalMonthsDataError;

      return {motor, truck, car, tripMonths, totalMonthsData, loading,  error}
}
  
  