import { useGetAllRidersQuery } from "@/lib/store/apiSlice/hailitApi";

export function useGetAllRiders(page:number) { 
  const { data, isLoading, error } = useGetAllRidersQuery(`riders?page=${page}`);
  const riders = data?.riders;
  const total_number_of_pages = data?.total_number_of_pages;
  return {data, riders, total_number_of_pages, error, isLoading};
}
