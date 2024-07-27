import { useEffect } from "react";
import { usePrefetchData } from "./usePrefetchData";
import { useSearchAndSortWithEndpoint } from "./useSearchAndSortWithEndpoint";
import { useGetAllTripsQuery, useGetAllDriversQuery, useGetAllUsersQuery, useGetAllVehiclesQuery, useGetAllRidersQuery } from "@/lib/store/apiSlice/hailitApi";
import { EndpointNames } from "./usePrefetchData";
import { QueryEndpoint } from "./useSearchAndSortWithEndpoint";


export const useGetTableData = ({page,  pollingInterval = 0, table, }:{page:number; table:TableType; pollingInterval?:number}) => {
  
  
  const {
    handleSort, 
    sortDetails,
    dataLoading,
    handleSearch,
    searchRef,
    endpoint,
    setDataLoading,
    isSearch
  } = useSearchAndSortWithEndpoint({table, columns: tableColumns[table], endpoint: queryEndpoints[table]});
  
  const { data, isLoading, error, isSuccess } = fetchQueries[table](`${endpoint}&page=${page}`, {
    pollingInterval:pollingInterval,
    skipPollingIfUnfocused: true
  });
  
  
  const total_number_of_pages = data?.total_number_of_pages;
  const total_items = data?.total_items

  const {handlePrefetchData} = usePrefetchData({endpoint: endpoint, page, prefetchOption: prefetchEndpoints[table], total_number_of_pages});
  
  //prefetch useEffect

  useEffect(()=> {
    handlePrefetchData()
  }, [handlePrefetchData])
  
  useEffect(() => {
    setDataLoading(true)
    
    if(data) {
      setDataLoading(false)

    }
    
  }, [data, ]); 

  return {
    dataLoading,
    total_number_of_pages,
    data,
    isLoading,
    error,
    total_items,
    searchRef,
    sortDetails,
    handleSort,
    isSearch,
    handleSearch,
    isSuccess
  };
};


export enum TableType {
  TripsTable = "Trips Table",
  VehiclesTable = "Vehicles Table",
  RidersTable = "Riders Table",
  DriversTable = "Drivers Table",
  UsersTable = "Users Table"
}


interface PrefetchEndPointNames {
  [key: string]: EndpointNames;
  
}

interface QueryEndPointNames {
  [key: string]: QueryEndpoint;
}


const prefetchEndpoints: PrefetchEndPointNames = {
  [TableType.TripsTable] : "getAllTrips",
  [TableType.RidersTable] : "getAllRiders",
  [TableType.UsersTable] : "getAllUsers",
  [TableType.VehiclesTable]: "getAllUsers",
  [TableType.DriversTable]: "getAllDrivers"
}

const fetchQueries = {
  [TableType.TripsTable] : useGetAllTripsQuery,
  [TableType.RidersTable] : useGetAllRidersQuery,
  [TableType.UsersTable] : useGetAllUsersQuery,
  [TableType.VehiclesTable]: useGetAllVehiclesQuery,
  [TableType.DriversTable]: useGetAllDriversQuery

} 

const queryEndpoints: QueryEndPointNames = {
  [TableType.TripsTable]: "trips?",
  [TableType.UsersTable]: "users?",
  [TableType.VehiclesTable]: "vehicles?",
  [TableType.RidersTable]: "riders?",
  [TableType.DriversTable]: "drivers?"
}

const TRIPS_TABLE_COLUMNS = [
  "Trip id",
  "Ordered by",
  "Booked On",
  "Pickup",
  "Pickup Contact",
  "Drop off",
  "Drop off Contact",
  "Delivered On",
  "Medium",
  "Amount",
  "Payment Status",
  // "Payment Method",
  "Delivery Status",
  "View"
 ]
const USERS_TABLE_COLUMNS = [
  "First Name",
  "Last Name",
  "Phone Number",
  "Email",
  "User Role",
  "Onboard Status",
  "Date Joined",
];
const VEHICLES_TABLE_COLUMNS = [
  "Name",
  "Type",
  "Model",
  "Number Plate",
  "Available",
  
] 
const tableColumns = {
  [TableType.UsersTable]: USERS_TABLE_COLUMNS,
  [TableType.VehiclesTable]: VEHICLES_TABLE_COLUMNS,
  [TableType.DriversTable]: VEHICLES_TABLE_COLUMNS,
  [TableType.RidersTable]: VEHICLES_TABLE_COLUMNS,
  [TableType.TripsTable]: TRIPS_TABLE_COLUMNS,
  
}

