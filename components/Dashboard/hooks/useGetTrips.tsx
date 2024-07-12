import { useGetAllTripsQuery, usePrefetch } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection, setEditingOrder, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";
import { setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useCallback, useEffect } from "react";
import { usePrefetchData } from "./usePrefetchData";
export const useGetTrips = ({page, table}: {page: number, table:string}) => {
  const {tripsData, overviewData}  = useAppSelector(state => state.dashboardTables);

  const dispatch = useAppDispatch();
  
  const handleTrackTrip = useCallback((tripId: string) => {
    dispatch(setActiveSection('Track Order'));
    dispatch(setTrackingOrder(true));
    dispatch(setSelectedTripId(tripId));
    dispatch(setEditingOrder(false));
  }, [dispatch])

  
  // let endpoint = 'trips';
  // offset && limit ? endpoint = `trips?limit=${limit}&offset=${offset}` : limit ? endpoint = `trips?limit=${limit}` : '';
  
  const { data, isLoading, error } = useGetAllTripsQuery(`trips?page=${page}`, {
    pollingInterval:5000,
    skipPollingIfUnfocused: true
  });
  
  const trips = data?.trips;
  const total_number_of_pages = data?.total_number_of_pages;
  const total_items = data?.total_items;
  const {handlePrefetchData} = usePrefetchData({endpoint: 'trips', page, prefetchOption: 'getAllTrips', total_number_of_pages});
  
  //prefetch useEffect
  if (table) {
    handlePrefetchData()
  }

  // useEffect(()=> {
  //   handlePrefetchData()
  // }, [handlePrefetchData])
  
  if (table === "trips") {
    dispatch(setTableData({table: "tripsData", data: trips}));
  } 
  
  if(table === "overview") {
    dispatch(setTableData({table: "overviewData", data: trips}));
  }
  // useEffect(() => {
  //   if (table === "trips") {
  //     dispatch(setTableData({table: "tripsData", data: trips}));
  //   } 
    
  //   if(table === "overview") {
  //     dispatch(setTableData({table: "overviewData", data: trips}));
  //   }
  // }, [trips, table, dispatch]); 

  return { total_number_of_pages, data, trips, tripsData, overviewData, handleTrackTrip, isLoading, error, total_items };
};
