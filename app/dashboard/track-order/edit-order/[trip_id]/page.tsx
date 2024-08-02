"use client";
import EditTrip from "@/components/Dashboard/TrackOrder/Actions/EditTrip";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const EditOrderDashboard = () => {
  return <EditTrip />;
};

export default withAdminCheck(EditOrderDashboard);
