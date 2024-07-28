"use client";
import TrackOrder from "@/components/Dashboard/TrackOrder/TrackOrderDetailsDash";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import TrackOrderFormDash from "@/components/Dashboard/TrackOrder/TrackOrderFormDash";
const TrackOrderDashboard = () => {
  return <TrackOrderFormDash />;
};

export default withAdminCheck(TrackOrderDashboard);
