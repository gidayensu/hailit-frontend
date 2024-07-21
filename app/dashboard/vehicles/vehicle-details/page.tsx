"use client";

import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import Vehicle from "../../../../components/Dashboard/Vehicles/Vehicle";
const VehicleDetails = () => {
  return <Vehicle />;
};

export default withAdminCheck(VehicleDetails);
