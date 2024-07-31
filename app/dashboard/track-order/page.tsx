"use client";
import TrackOrderFormDash from "@/components/Dashboard/TrackOrder/TrackOrderFormDash";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
const TrackOrderDashboard = () => {
  return <TrackOrderFormDash />;
};

export default withAdminCheck(TrackOrderDashboard);
