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

export function useGetVehicles({limit, offset}: {limit?: number, offset?:number}) {
    let endpoint = "vehicles";
    offset && limit
      ? (endpoint = `vehicles?limit=${limit}&offset=${offset}`)
      : limit
      ? (endpoint = `vehicles?limit=${limit}`)
      : "";
  const { data, isLoading, error } = useGetAllVehiclesQuery(endpoint);
  const vehicles = data?.vehicles;
  const total_number_of_pages = data?.total_number_of_pages;
  
  return {data, vehicles, error, isLoading, total_number_of_pages}
}
