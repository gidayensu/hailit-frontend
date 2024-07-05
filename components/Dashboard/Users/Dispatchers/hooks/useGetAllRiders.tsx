import { useGetAllRidersQuery } from "@/lib/store/apiSlice/hailitApi";
import { usePrefetchData } from "@/components/Dashboard/hooks/usePrefetchData";
import { useEffect } from "react";
export function useGetAllRiders(page:number) { 
  const { data, isLoading, error } = useGetAllRidersQuery(`riders?page=${page}`);
  const riders = data?.riders;
  const total_number_of_pages = data?.total_number_of_pages;
  const {handlePrefetchData} = usePrefetchData({page, endpoint: 'riders', prefetchOption: 'getAllRiders', total_number_of_pages})

  useEffect(()=> {
    handlePrefetchData();
  }, [])

  return {data, riders, total_number_of_pages, error, isLoading};
}
