'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trip } from "@/lib/store/slice/tripSlice";
import SkeletonTable from "../SkeletonTable";
  
import { extractShortDate, extractBeforeComma } from "@/lib/utils";

import { useGetTrips } from "../hooks/useGetTrips";

export function RecentTripTable() {
    
  const {overviewData, handleTrackTrip, isLoading, error}  = useGetTrips({page: 1, table:"overview"});

    if (error) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!</p>
        
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
          {overviewData && overviewData.map((trip:Trip) => (
            
            <TableRow key={trip?.trip_id} onClick={()=>handleTrackTrip(trip?.trip_id)} >
              <TableCell className="font-medium">{trip?.trip_id} </TableCell>
              
              <TableCell>{extractShortDate(trip.trip_request_date)} </TableCell>
              <TableCell className="w-44 text-wrap text-ellipsis">{extractBeforeComma(trip?.pickup_location)}</TableCell>
              
              <TableCell className="truncate line-clamp-1 w-44">{extractBeforeComma(trip?.drop_off_location)}</TableCell>
              
              <TableCell>{trip?.trip_completion_date ? extractShortDate(trip.trip_completion_date): 'TBD'}</TableCell>
              <TableCell>{trip?.trip_cost}</TableCell>
              <TableCell>
                <div className={`flex item-center justify-center rounded-md w-16 border font-medium text-[11px] ${trip?.payment_status ? 'bg-green-200  border-green-500 text-green-800': 'bg-red-200 text-red-800 border-red-500 '}`}>
                    <p>
                        {trip?.payment_status? 'Paid' : 'Not Paid'}
                    </p>
                </div>
                </TableCell>
              
              <TableCell><div className={`flex item-center justify-center rounded-md w-16 border font-medium text-[11px] ${trip?.trip_status === "Delivered"
                ? "  bg-green-200  border-green-500 text-green-800"
                : trip.trip_status === "Picked Up"
                ? "  bg-sky-200 border-sky-500 text-sky-800"
                : trip.trip_status === "In Transit"
                ? " bg-amber-200 border-amber-500 text-amber-800"
                : trip.trip_status === "Booked"
                ? " bg-slate-200 border-slate-500 text-slate-800"
                : " bg-red-200 text-red-800 border-red-500"
                }`}>
                    <p>
                        {trip?.trip_status}
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
  