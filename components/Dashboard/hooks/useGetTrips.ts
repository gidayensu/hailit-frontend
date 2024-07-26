import { useGetAllTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setEditingOrder } from "@/lib/store/slice/dashboardSlice";
import { setTableData } from "@/lib/store/slice/dashboardTablesSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { usePrefetchData } from "./usePrefetchData";
import { useSearchAndSort } from "./useSearchAndSort";

export type TripsColumns = typeof tableHeadings[number]

type Table = "overview" | "trips"
export const useGetTrips = ({page, table}: {page: number, table:Table}) => {
  const { overviewData}  = useAppSelector(state => state.dashboardTables);
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const router = useRouter();
  
  const {
    handleSort, 
    sortDetails,
    dataLoading: tripsLoading,
    handleSearch:handleTripSearch,
    searchRef: tripSearchRef,
    endPoint,
    setDataLoading: setTripsLoading,
  } = useSearchAndSort({table: "Trips Table", columns: tableHeadings, endPoint: "trips?"});
  
  const dispatch = useAppDispatch();
  
  const handleTrackTrip = useCallback((tripId: string) => {
    setTripLoading(true);
    setSelectedTripId(tripId)  
    router.push(`/dashboard/track-order/${tripId}`)
    dispatch(setEditingOrder(false));
  }, [dispatch])

  
  
  
  const { data, isLoading, error, isSuccess } = useGetAllTripsQuery(`${endPoint}&page=${page}`, {
    pollingInterval:5000,
    skipPollingIfUnfocused: true
  });
  
  const trips = data?.trips;
  const total_number_of_pages = data?.total_number_of_pages;
  const total_items = data?.total_items

  const {handlePrefetchData} = usePrefetchData({endpoint: 'trips?', page, prefetchOption: 'getAllTrips', total_number_of_pages});
  
  //prefetch useEffect

  useEffect(()=> {
    handlePrefetchData()
  }, [handlePrefetchData])
  
  useEffect(() => {
    setTripsLoading(true)
    
    if(trips) {
      setTripsLoading(false)

    }
    
    if(table === "overview") {
      dispatch(setTableData({table: "overviewData", data: trips}));
    }
  }, [trips, table, dispatch]); 

  return {
    tripsLoading,
    total_number_of_pages,
    data,
    trips,
    overviewData,
    handleTrackTrip,
    isLoading,
    error,
    total_items,
    selectedTripId,
    tripLoading,
    tripSearchRef,
    sortDetails,
    handleSort,
    handleTripSearch,
    isSuccess
  };
};


const tableHeadings = [
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
] as const;