"use client";
import { useUserProfile } from "./hooks/useUserProfile";

import UserTripsTable from "./UserTripsTable";
export default function NonDispatcherTripsTable() {
  const {
    customerTrips,
    error,
    isLoading,
  } = useUserProfile();

  
  return (
    <UserTripsTable
      userTrips={customerTrips}
      error={error}
      isLoading={isLoading}
    />
  );
}


