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
  
import { extractDateWithDayFromDate } from "@/lib/utils";


export function AllDrivers() {
    const {data:driversData, isLoading:loadingDrivers, error:errorDrivers} = useGetAllDriversQuery(`drivers`);
    const drivers = driversData?.drivers;
    
    if (errorDrivers) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!...Our Fault</p>
        
      </div>
    }
    return (
      <div className="flex flex-col w-full   gap-2 p-4  rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
        <Table>
          <TableHeader>
            <TableRow>
            {
              tableHeadings.map((tableHeading, index)=>
                <TableHead key={index}>{tableHeading}</TableHead>
              )
            }
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingDrivers && <SkeletonTable rows={7} cells={8} />}
            {driversData &&
              drivers.map((driver: any) => (
                <TableRow key={driver.driver_id}>
                  <TableCell>{`${driver.first_name} ${driver.last_name}`}</TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.phone_number}</TableCell>
                  <TableCell>{driver.license_number} </TableCell>
                  <TableCell>{`${driver.cumulative_driver_rating} (${driver.driver_rating_count})`}</TableCell>
                  <TableCell> {driver.vehicle_name}</TableCell>
                  <TableCell> {driver.plate_number}</TableCell>
                  <TableCell> {driver.trip_count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  
  const tableHeadings = [
    "Full Name",
    "Email",
    "Phone Number",
    "License Number",
    "Rating",
    "Vehicle Name",
    "Vehicle Number",
    "Trip Count"
  ];
  