import {
    useGetTripRevenueByMonthQuery
} from "@/lib/store/apiSlice/hailitApi";
  
  
  export const useTripRevenue = () => {
  
    const {data: revenueData, isLoading:revenueLoading, error:revenueError} = useGetTripRevenueByMonthQuery('');

    
    const tripMonths = revenueData?.tripMonths
    const revenue = revenueData?.revenue; 

    
    
  
    
    
    return {
      tripMonths,
      revenueLoading,
      revenue,
      revenueError,
      
      
    };
  };
  