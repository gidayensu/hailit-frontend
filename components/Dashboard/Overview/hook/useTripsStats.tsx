import { useGetCurrentMonthTripCountsQuery } from "@/lib/store/apiSlice/hailitApi"
interface CurrentMonthStats {
    total_trips_current_month: number;
    revenue_current_month: number;
    cancelled_current_month: number;
    delivered_current_month: number;
    pending_current_month: number;
    delivered_percentage_difference: number;
    revenue_percentage_difference: number;
    pending_percentage_difference: number;
    total_trips_percentage_difference: number;
    cancelled_percentage_difference:number;
  }
export const useTripsStats = ()=> {
    const {data:monthStats, isLoading, error,} = useGetCurrentMonthTripCountsQuery('', {
      pollingInterval:5000,
      skipPollingIfUnfocused: true
    });
    
    const currentMonthStats:CurrentMonthStats = monthStats;
    
    return {currentMonthStats, isLoading, error}
}