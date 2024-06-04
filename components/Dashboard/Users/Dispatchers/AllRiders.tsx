import {  useGetAllRidersQuery } from "@/lib/store/apiSlice/hailitApi";
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


export function AllRiders() {
    const {data, isLoading, error} = useGetAllRidersQuery(`riders`);
    
    let riders = [];
    if (data) {
      riders = data.riders;
    }

    if (error) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!...Our Fault</p>
        
      </div>
    }
    return (
      <div className="flex flex-col w-full   gap-2 p-4 h-full rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
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
            isLoading && <SkeletonTable rows={5} cells={8}/>
          }
          {data && riders.map((rider:any) => (
            
            <TableRow key={rider.rider_id}>
              
              
              <TableCell>{`${rider.first_name} ${rider.last_name}`}</TableCell>
              
              
              <TableCell>{rider.email}</TableCell>
              
              <TableCell>{rider.phone_number}</TableCell>
              <TableCell>{rider.license_number} </TableCell>
              <TableCell>{`${rider.cumulative_rider_rating} (${rider.rider_rating_count})` }</TableCell>
              <TableCell > {rider.vehicle_name}</TableCell>
              <TableCell > {rider.plate_number}</TableCell>
              <TableCell > {rider.trip_count}</TableCell>            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  
  