"use client";
import DashboardProfile from "@/components/Dashboard/Profile";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const Profile = () => {
  
  return (
    <DashboardProfile/>
  );
};

export default withAdminCheck(Profile);
