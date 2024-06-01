import { useGetAllDriversQuery } from "@/lib/store/apiSlice/hailitApi";
import SkeletonTable from "../../SkeletonTable";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { extractDateWithDayFomDate } from "@/lib/utils";


export function AllDrivers() {
    const {data:driversData, isLoading:loadingDrivers, error:errorDrivers} = useGetAllDriversQuery(`drivers`);
    
    let drivers = [];
    if (driversData) {
      drivers = driversData.drivers;
    }

    if (errorDrivers) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!...Our Fault</p>
        <p>We are fixing it</p>
      </div>
    }
    return (
      <div className="flex flex-col w-full   gap-2 p-4  rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-[#1e1e1e] dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
      <Table>
    
        <TableHeader>
          <TableRow>
          
            
            <TableHead>Full Name</TableHead>
            
            
            <TableHead>Email</TableHead>
            
            <TableHead>Phone Number</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead >Rating</TableHead>
            <TableHead >Vehicle Name</TableHead>
            <TableHead >Vehicle Number</TableHead>
            <TableHead className="font-bold">Trip Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            loadingDrivers && <SkeletonTable rows={7} cells={8}/>
          }
          {driversData && drivers.map((driver:any) => (
            
            <TableRow key={driver.driver_id}>
              
              
              <TableCell>{`${driver.first_name} ${driver.last_name}`}</TableCell>
              
              
              <TableCell>{driver.email}</TableCell>
              
              <TableCell>{driver.phone_number}</TableCell>
              <TableCell>{driver.license_number} </TableCell>
              <TableCell>{`${driver.cumulative_driver_rating} (${driver.driver_rating_count})` }</TableCell>
              <TableCell > {driver.vehicle_name}</TableCell>
              <TableCell > {driver.plate_number}</TableCell>
              <TableCell > {driver.trip_count}</TableCell>            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  
  