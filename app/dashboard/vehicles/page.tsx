"use client";
import { Vehicles } from "@/components/Dashboard/Vehicles/Vehicles";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const AllVehicles = () => {
  return <Vehicles />;
};

export default withAdminCheck(AllVehicles);
