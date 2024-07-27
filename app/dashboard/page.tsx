"use client";
//icons + ui

import Overview from "@/components/Dashboard/Overview/Overview";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const Dashboard = () => {

  return <Overview />;
};

export default withAdminCheck(Dashboard);
