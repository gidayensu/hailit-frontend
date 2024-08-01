"use client";
import { useDispatcherProfile } from "@/components/Dashboard/Users/Dispatchers/hooks/useDispatcherProfile";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  setSelectedDriverId,
  setSelectedRiderId
} from "@/lib/store/slice/dashboardSlice";
import { useRouter } from "next/navigation";
import { useGetTrip } from "./useGetTrip";

export const useViewDispatcher = () => {
  const router = useRouter();
  const {handleSetDispatcherRole} = useDispatcherProfile();
  const {trip, dispatcher} = useGetTrip();
  const dispatch = useAppDispatch();


  

  
  const handleViewDispatcher = () => {
  
    if (trip?.trip_medium === "Motor") {
      
      handleSetDispatcherRole("Rider")
      dispatch(setSelectedRiderId(dispatcher?.dispatcher_id));
    } else {
      
      handleSetDispatcherRole("Driver")
      dispatch(setSelectedDriverId(dispatcher?.dispatcher_id));
    }
    router.push("/dashboard/dispatchers/dispatcher-details");
  };

  return {    

    handleViewDispatcher,
    
  };
};
