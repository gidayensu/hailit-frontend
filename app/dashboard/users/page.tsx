"use client";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import AllUsersTable from "@/components/Dashboard/Users/AllUsersTable";

const AllUsers = () => {
  return <AllUsersTable />;
};

export default withAdminCheck(AllUsers);
