"use client";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import UserDetails from "@/components/Dashboard/Users/UserDetails";

const UserDetailsDashboard = () => {
  return <UserDetails />;
};

export default withAdminCheck(UserDetailsDashboard);
