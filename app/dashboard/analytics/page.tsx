
"use client"
import AnalyticsSection from "@/components/Dashboard/Analytics/AnalyticsSection";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";

const  Analytics = ()=> {
    
  return (
    <AnalyticsSection/>
  );
}

export default withAdminCheck(Analytics)