'use client'
import DispatcherDetails from "@/components/Dashboard/Users/Dispatchers/DispatcherDetails";
import { AllDrivers } from "@/components/Dashboard/Users/Dispatchers/AllDriversTable";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const  AllDriversDashboard = ()=> {

  
  return (
    <DispatcherDetails/>
  );
}

export default withAdminCheck(AllDriversDashboard)