
"use client"
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import { AllTripsTable } from "@/components/Dashboard/Orders/AllTripsTable";
const  AllTrips = ()=> {

  
  return (
    <AllTripsTable/>
  );
}

export default withAdminCheck(AllTrips)