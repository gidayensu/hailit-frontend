'use client'

import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import { AllRiders } from "@/components/Dashboard/Users/Dispatchers/AllRidersTable";
const  AllRidersDashboard = ()=> {

  
  return (
    <AllRiders/>
  );
}

export default withAdminCheck(AllRidersDashboard)