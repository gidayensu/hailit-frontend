"use client";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import AddOrder from "@/components/Dashboard/Orders/AddOrder";
const TrackOrderDashboard = () => {
  return <AddOrder />;
};

export default withAdminCheck(TrackOrderDashboard);
