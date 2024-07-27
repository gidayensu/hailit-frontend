'use client'
import { useGetAllVehiclesQuery } from "@/lib/store/apiSlice/hailitApi";
import { useEffect } from "react";
import { usePrefetchData } from "../../hooks/usePrefetchData";
import { useSearchAndSort } from "../../hooks/useSearchAndSort";

export type VehicleType = "car" | "truck" | "motor"
export interface Vehicle {
    vehicle_id: string,
    vehicle_name: string, 
    vehicle_model: string, 
    plate_number: string,
    vehicle_type: VehicleType,
    insurance_details: string,
    road_worthy: string,
    available: boolean
}




export function useGetVehicles(page:number) {
  const {
    handleSort, 
    sortDetails,
    dataLoading: vehiclesLoading,
    handleSearch:handleVehicleSearch,
    searchRef: vehicleSearchRef,
    endpoint,
    setDataLoading: setVehiclesLoading,
    isSearch
  } = useSearchAndSort({table: "Vehicles Table", columns: tableHeadings, endpoint: "vehicles?"});
  
  //prefetch vehicles data

  const { data, isLoading, error, isSuccess, } = useGetAllVehiclesQuery(`${endpoint}&page=${page}`);
  
  const vehicles = data?.vehicles;
  const total_number_of_pages = data?.total_number_of_pages;
  const total_items = data?.total_items;


  useEffect(()=>{
    
    data && !isLoading? setVehiclesLoading(false) : setVehiclesLoading(true);

  }, [data, setVehiclesLoading])

  const {handlePrefetchData} = usePrefetchData({endpoint: endpoint, page, prefetchOption: 'getAllVehicles', total_number_of_pages});

    useEffect(()=> {
      handlePrefetchData();
    }, [handlePrefetchData])

  
    

  return {
    data,
    vehicles,
    error,
    isLoading,
    total_number_of_pages,
    tableHeadings,
    handleSort, 
    sortDetails,
    vehiclesLoading,
    handleVehicleSearch,
    isSuccess,
    total_items,
    vehicleSearchRef,
    isSearch
  };
}

const tableHeadings = [
  "Name",
  "Type",
  "Model",
  "Number Plate",
  "Available",
  
] 









// const vehicleSearchRef = useRef<any>(null);
  //  const [searchQuery, setSearchQuery] = useState<string>('');
  // // const { handleSort, sortDetails, setDataLoading: setVehiclesLoading, dataLoading:vehiclesLoading } = useSortTable({table: "Vehicles Table", columns: tableHeadings});
  // let endpoint = `vehicles?`;
  // if (sortDetails.column && sortDetails.sortDirection) {
  //   endpoint+= `&sortColumn=${sortDetails.column}&sortDirection=${sortDetails.sortDirection}`
  // }
  // if(searchQuery) {
  //   endpoint+=`&search=${searchQuery}`
  // }


  
  // const handleVehicleSearch = ({reset}:{reset?:boolean})=> {
  //   if(reset) {
  //     vehicleSearchRef.current.value = ''
  //   }
  //   setSearchQuery(vehicleSearchRef?.current?.value)
  // }
  