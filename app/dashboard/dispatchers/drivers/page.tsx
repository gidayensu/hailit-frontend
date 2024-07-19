"use client";
import { AllDrivers } from "@/components/Dashboard/Users/Dispatchers/AllDriversTable";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const AllDriversDashboard = () => {
  return <AllDrivers />;
};

export default withAdminCheck(AllDriversDashboard);
