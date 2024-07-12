import { useAnalytics } from "./useAnalytics"

export const useTripStatusData = ()=> {
    const {
        tripMonths,
        tripMonthsLoading,
        tripMonthsError,
        conditionalMonthsData: cancelled,
        conditionalDataLoading: cancelledLoading,
        conditionalDataError: cancelledError,
        totalMonthsData,
        totalMonthsDataError,
        totalMonthsDataLoading,
      } = useAnalytics({trip_column: 'trip_status', trip_column_condition: 'Cancelled'})
      
      //deliverd trips stats
    
      const {
        conditionalMonthsData: delivered,
        conditionalDataLoading: deliveredLoading,
        conditionalDataError: deliveredError,
      } = useAnalytics({trip_column: 'trip_status', trip_column_condition: 'Delivered'})
    
      const {
        conditionalMonthsData: inTransit,
        conditionalDataLoading: inTransitLoading,
        conditionalDataError: inTransitError,
      } = useAnalytics({trip_column: 'trip_status', trip_column_condition: 'In Transit'})
      const {
        conditionalMonthsData: booked,
        conditionalDataLoading: bookedLoading,
        conditionalDataError: bookedError,
      } = useAnalytics({trip_column: 'trip_status', trip_column_condition: 'Booked'})
      const {
        conditionalMonthsData: pickedUp,
        conditionalDataLoading: pickedUpLoading,
        conditionalDataError: pickedUpError,
      } = useAnalytics({trip_column: 'trip_status', trip_column_condition: 'Picked Up'})


      const sumPending = () => {
        const pending: number[] = [];
        if(booked && pickedUp && inTransit) {
            
          booked.forEach((tripCount:number, index:number) => {
            
            pending.push((booked[index] || 0) + (pickedUp[index] || 0) + (inTransit[index] || 0))
          });
          
        }
        
        return pending;
      }

      const pending = sumPending();

      const loading = pickedUpLoading || bookedLoading || inTransitLoading || deliveredLoading ||cancelledLoading || tripMonthsLoading || totalMonthsDataLoading;
      const error = pickedUpError || bookedError || inTransitError || deliveredError ||cancelledError || tripMonthsError || totalMonthsDataError;

      return {delivered, cancelled, tripMonths, totalMonthsData, loading, pending, error}
}
  //cancelled trips && tripMonths, && totaltrips
  