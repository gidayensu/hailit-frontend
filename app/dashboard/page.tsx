"use client";
//icons + ui

import Overview from "@/components/Dashboard/Overview/Overview";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import { useAppDispatch } from "@/lib/store/hooks";
import { setActiveSection } from "@/lib/store/slice/dashboardSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveSection("Overview"));
  }, [dispatch, setActiveSection]);

  return <Overview />;
};

export default withAdminCheck(Dashboard);
