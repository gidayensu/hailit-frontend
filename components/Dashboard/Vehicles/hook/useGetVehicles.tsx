import { useGetAllVehiclesQuery } from "@/lib/store/apiSlice/hailitApi";

export interface Vehicle {
    vehicle_id: string,
    vehicle_name: string, 
    vehicle_model: string, 
    plate_number: string,
    vehicle_type: string,
    insurance_details: string,
    road_worthy: string,
    availability: boolean
}

export function useGetVehicles(page:number) {
    
  const { data, isLoading, error } = useGetAllVehiclesQuery(`vehicles?page=${page}`);
  const vehicles = data?.vehicles;
  const total_number_of_pages = data?.total_number_of_pages;
  
  return {data, vehicles, error, isLoading, total_number_of_pages}
}
