"use client";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import AllUsersTable from "@/components/Dashboard/Users/AllUsersTable";
import { Vehicles } from "@/components/Dashboard/Vehicles/Vehicles";

const AllVehicles = () => {
  return <Vehicles />;
};

export default withAdminCheck(AllVehicles);
