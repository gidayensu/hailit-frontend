"use client";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import AddOrder from "@/components/Dashboard/Orders/AddOrder";
const AddOrderDash = () => {
  return <AddOrder />;
};

export default withAdminCheck(AddOrderDash);
