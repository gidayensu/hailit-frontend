"use client";

import UserTripsTable from "../UserTripsTable";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";

export default function DispatcherTripsTable() {
  const {
    allDispatcherTrips,
    error,
    isLoading,
  } = useDispatcherProfile();

  
  
  return (
      <UserTripsTable error={error} isLoading={isLoading} userTrips={allDispatcherTrips}/>
  );
}

