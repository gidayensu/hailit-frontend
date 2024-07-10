import { useAnalytics } from "./useAnalytics"

export const useTripAreaData = ()=> {
    const {
        tripMonths,
        tripMonthsLoading,
        tripMonthsError,
        conditionalMonthsData: accra,
        conditionalDataLoading: accraLoading,
        conditionalDataError: accraError,
        totalMonthsData,
        totalMonthsDataError,
        totalMonthsDataLoading,
      } = useAnalytics({trip_column: 'trip_area', trip_column_condition: 'Accra'})
      
      //deliverd trips stats
    
      const {
        conditionalMonthsData: kumasi,
        conditionalDataLoading: kumasiLoading,
        conditionalDataError: kumasiError,
      } = useAnalytics({trip_column: 'trip_area', trip_column_condition: 'Kumasi'})
    
      const {
        conditionalMonthsData: interCity,
        conditionalDataLoading: interCityLoading,
        conditionalDataError: interCityError,
      } = useAnalytics({trip_column: 'trip_area', trip_column_condition: 'Inter City'})
      

      const loading = interCityLoading || kumasiLoading ||accraLoading || tripMonthsLoading || totalMonthsDataLoading;
      const error = interCityError || kumasiError ||accraError || tripMonthsError || totalMonthsDataError;

      return {kumasi, interCity, accra, tripMonths, totalMonthsData, loading,  error}
}
  
  