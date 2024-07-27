"use client"

type ActiveSection =
  | "Overview"
  | "Orders"
  | "Vehicles"
  | "Users"
  | "Track Order"
  | "Riders"
  | "Drivers"
  | "Analytics"
  | "Sign Out"
  | "Dashboard"
  | "Dispatcher Details"
  | "Profile";

import { usePathname } from "next/navigation";

export default function CurrentSection () {
    const path = usePathname();
    const baseUrl = `/dashboard`;

    let activeSection: ActiveSection = "Overview"; 
    path===(`/${baseUrl}/`) || path.startsWith(`/${baseUrl}/overview`) 
    ?
    activeSection = "Overview" 
    : path.startsWith(`${baseUrl}/users`) 
    ? activeSection = "Users"
    : path.startsWith(`${baseUrl}/orders`) 
    ? activeSection = "Orders"
    : path.startsWith(`${baseUrl}/vehicles`) 
    ? activeSection = "Vehicles"
    : path.startsWith(`${baseUrl}/track-order`) 
    ? activeSection = "Track Order"
    : path.startsWith(`${baseUrl}/dispatchers/riders`) 
    ? activeSection = "Riders"
    : path.startsWith(`${baseUrl}/dispatchers/drivers`) 
    ? activeSection = "Drivers"
    : path.startsWith(`${baseUrl}/dispatchers/dispatcher-details`) 
    ? activeSection = "Dispatcher Details"
    : path.startsWith(`${baseUrl}/analytics`) 
    ? activeSection = "Analytics"
    : activeSection = "Dashboard"
    
    
    console.log({path})
    return(<>
    {activeSection}
    </>)
}