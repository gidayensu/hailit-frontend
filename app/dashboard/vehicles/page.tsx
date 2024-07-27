"use client";
import AllVehiclesTable from "@/components/Dashboard/Vehicles/AllVehiclesTable";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const AllVehicles = () => {
  return <AllVehiclesTable />;
};

export default withAdminCheck(AllVehicles);
