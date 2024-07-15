import { useGetAllTripsQuery, usePrefetch } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveSection, setEditingOrder, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";
import { setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useCallback, useEffect, useState } from "react";
import { usePrefetchData } from "./usePrefetchData";
import { useRouter } from "next/navigation";

export const useGetTrips = ({page, table}: {page: number, table:string}) => {
  const {tripsData, overviewData}  = useAppSelector(state => state.dashboardTables);
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const router = useRouter();
  
  
  const dispatch = useAppDispatch();
  
  const handleTrackTrip = useCallback((tripId: string) => {
    setTripLoading(true);
    setSelectedTripId(tripId)  
    router.push(`/dashboard/track-order/${tripId}`)
    dispatch(setEditingOrder(false));
  }, [dispatch])

  
  // let endpoint = 'trips';
  // offset && limit ? endpoint = `trips?limit=${limit}&offset=${offset}` : limit ? endpoint = `trips?limit=${limit}` : '';
  
  const { data, isLoading, error } = useGetAllTripsQuery(`trips?page=${page}`, {
    pollingInterval:3000,
    skipPollingIfUnfocused: true
  });
  
  const trips = data?.trips;
  const total_number_of_pages = data?.total_number_of_pages;
  const total_items = data?.total_items

  const {handlePrefetchData} = usePrefetchData({endpoint: 'trips', page, prefetchOption: 'getAllTrips', total_number_of_pages});
  
  //prefetch useEffect

  useEffect(()=> {
    handlePrefetchData()
  }, [handlePrefetchData])
  
  useEffect(() => {
    if (table === "trips") {
      dispatch(setTableData({table: "tripsData", data: trips}));
    } else {
      dispatch(setTableData({table: "overviewData", data: trips}));
    }
  }, [trips, table, dispatch]); 

  return { total_number_of_pages, data, trips, tripsData, overviewData, handleTrackTrip, isLoading, error , total_items, selectedTripId, tripLoading};
};
