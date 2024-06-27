'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SkeletonTable from "../SkeletonTable";
  
import { extractShortDate, extractBeforeComma } from "@/lib/utils";

import { useGetTrips } from "../hooks/useGetTrips";

export function RecentTripTable() {
    
  const {overviewData, handleTrackTrip, isLoading, error}  = useGetTrips({page: 1, table:"overview"});

    if (error) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!...Our Fault</p>
        
      </div>
    }
    return (
      <Table >
    
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
          {
            isLoading && <SkeletonTable rows={7} cells={9}/>
          }
          {overviewData && overviewData.map((trip:any) => (
            
            <TableRow key={trip.trip_id} onClick={()=>handleTrackTrip(trip.trip_id)}>
              <TableCell className="font-medium">{trip.trip_id} </TableCell>
              
              <TableCell>{extractShortDate(trip.trip_request_date)} </TableCell>
              <TableCell className="w-44 text-wrap line-clamp-1 text-ellipsis">{extractBeforeComma(trip.pickup_location)}</TableCell>
              
              <TableCell className="truncate">{extractBeforeComma(trip.drop_off_location)}</TableCell>
              
              <TableCell>{trip.trip_completion_date ? extractShortDate(trip.trip_completion_date): 'TBD'}</TableCell>
              <TableCell>{trip.trip_cost}</TableCell>
              <TableCell>
                <div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.payment_status ? 'bg-green-500 ': 'bg-red-500 '}`}>
                    <p>
                        {trip.payment_status? 'Paid' : 'Not Paid'}
                    </p>
                </div>
                </TableCell>
              
              <TableCell><div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.trip_status === "Delivered"
                ? "  bg-green-500"
                : trip.trip_status === "Picked Up"
                ? "  bg-sky-600"
                : trip.trip_status === "In Transit"
                ? " bg-amber-500 "
                : trip.trip_status === "Booked"
                ? " bg-slate-600 dark:text-slate-50"
                : " bg-red-500"}`}>
                    <p>
                        {trip.trip_status}
                    </p>
                </div></TableCell>
              
                <TableCell><span className="text-decoration: underline">view</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  const tableHeadings = [
    "Trip id",
    "Booked On",
    "Pickup",
    "Drop off",
    "Delivered On",
    "Amount",
    "Payment Status",
    "Delivery Status",
    "View"
  ];
  