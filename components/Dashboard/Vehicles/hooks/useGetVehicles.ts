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
    endPoint,
    setDataLoading: setVehiclesLoading,
  } = useSearchAndSort({table: "Vehicles Table", columns: tableHeadings, endPoint: "vehicles?"});
  
  //prefetch vehicles data

  const { data, isLoading, error, isSuccess } = useGetAllVehiclesQuery(`${endPoint}&page=${page}`);
  const vehicles = data?.vehicles;
  const total_number_of_pages = data?.total_number_of_pages;
  


  useEffect(()=>{
    setVehiclesLoading(true)

    if(data) {
      setVehiclesLoading(false)
    }
  }, [data, setVehiclesLoading])

  const {handlePrefetchData} = usePrefetchData({endpoint: endPoint, page, prefetchOption: 'getAllVehicles', total_number_of_pages});

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
    
    vehicleSearchRef
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
  // let endPoint = `vehicles?`;
  // if (sortDetails.column && sortDetails.sortDirection) {
  //   endPoint+= `&sortColumn=${sortDetails.column}&sortDirection=${sortDetails.sortDirection}`
  // }
  // if(searchQuery) {
  //   endPoint+=`&search=${searchQuery}`
  // }


  
  // const handleVehicleSearch = ({reset}:{reset?:boolean})=> {
  //   if(reset) {
  //     vehicleSearchRef.current.value = ''
  //   }
  //   setSearchQuery(vehicleSearchRef?.current?.value)
  // }
  