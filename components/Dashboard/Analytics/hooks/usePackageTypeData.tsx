import { useAnalytics } from "./useAnalytics"

export const usePackageTypeData = ()=> {
    const {
        tripMonths,
        tripMonthsLoading,
        tripMonthsError,
        conditionalMonthsData: bulkyItems,
        conditionalDataLoading: bulkyItemsLoading,
        conditionalDataError: bulkyItemsError,
        totalMonthsData,
        totalMonthsDataError,
        totalMonthsDataLoading,
      } = useAnalytics({trip_column: 'package_type', trip_column_condition: 'Bulky Items'})
      
      //deliverd trips stats
    
      const {
        conditionalMonthsData: clothes,
        conditionalDataLoading: clothesLoading,
        conditionalDataError: clothesError,
      } = useAnalytics({trip_column: 'package_type', trip_column_condition: 'Clothes'});
    
      const {
        conditionalMonthsData: documents,
        conditionalDataLoading: documentsLoading,
        conditionalDataError: documentsError,
      } = useAnalytics({trip_column: 'package_type', trip_column_condition: 'Documents'})
      
      const {
        conditionalMonthsData: electronics,
        conditionalDataLoading: electronicsLoading,
        conditionalDataError: electronicsError,
      } = useAnalytics({trip_column: 'package_type', trip_column_condition: 'Electronics'})

      const {
        conditionalMonthsData: fragile,
        conditionalDataLoading: fragileLoading,
        conditionalDataError: fragileError,
      } = useAnalytics({trip_column: 'package_type', trip_column_condition: 'Fragile'})

      const {
        conditionalMonthsData: others,
        conditionalDataLoading: othersLoading,
        conditionalDataError: othersError,
      } = useAnalytics({trip_column: 'package_type', trip_column_condition: 'Others'})

      const loading = documentsLoading || clothesLoading ||bulkyItemsLoading || tripMonthsLoading || totalMonthsDataLoading || electronicsLoading || fragileLoading || othersLoading;
      const error = documentsError || clothesError ||bulkyItemsError || tripMonthsError || totalMonthsDataError || electronicsError || fragileError || othersError;;

      return {clothes, documents, bulkyItems, tripMonths, totalMonthsData, loading,  error, electronics, fragile, others}
}
  
  