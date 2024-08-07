"use client";
import DispatcherDetails from "@/components/Dashboard/Users/Dispatchers/DispatcherDetails";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const Dispatcher = () => {
  return <DispatcherDetails />;
};

export default withAdminCheck(Dispatcher);
