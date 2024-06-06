import { useGetAllRidersQuery } from "@/lib/store/apiSlice/hailitApi";

export function useGetAllRiders({limit, offset}: {limit?: number, offset?:number}) {
  let endpoint = "riders";
  offset && limit
    ? (endpoint = `riders?limit=${limit}&offset=${offset}`)
    : limit
    ? (endpoint = `riders?limit=${limit}`)
    : "";
  const { data, isLoading, error } = useGetAllRidersQuery(endpoint);
  const riders = data?.riders;
  const total_number_of_pages = data?.total_number_of_pages;
  return {data, riders, total_number_of_pages, error, isLoading}
}
