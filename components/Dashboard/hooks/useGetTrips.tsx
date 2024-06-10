import { useGetAllTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId, setTrackingOrder, setEditingOrder } from "@/lib/store/slice/dashboardSlice";
import { setOverviewData, setTripsData, setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useEffect, useCallback } from "react";

export const useGetTrips = ({limit, offset, table}: {limit?: number, offset?:number, table:string}) => {
  const {tripsData, overviewData}  = useAppSelector(state => state.dashboardTables);

  const dispatch = useAppDispatch();
  
  const handleTrackTrip = useCallback((tripId: string) => {
    dispatch(setActiveSection('Track Order'));
    dispatch(setTrackingOrder(true));
    dispatch(setSelectedTripId(tripId));
    dispatch(setEditingOrder(false));
  }, [dispatch])

  let endpoint = 'trips';
  offset && limit ? endpoint = `trips?limit=${limit}&offset=${offset}` : limit ? endpoint = `trips?limit=${limit}` : '';
  
  const { data, isLoading, error } = useGetAllTripsQuery(endpoint);
  
  const trips = data?.trips;
  const total_number_of_pages = data?.total_number_of_pages;
  
  useEffect(() => {
    if (table === "trips") {
      dispatch(setTableData({table: "tripsData", data: trips}));
    } else {
      dispatch(setTableData({table: "overviewData", data: trips}));
    }
  }, [trips, table, dispatch]); 

  return { total_number_of_pages, data, trips, tripsData, overviewData, handleTrackTrip, isLoading, error };
};
