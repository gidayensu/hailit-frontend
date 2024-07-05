"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import SkeletonTable from "../../SkeletonTable";
import NoData from "@/components/Shared/NoData";
import { extractBeforeComma, extractShortDate } from "@/lib/utils";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";
import { UserTrip } from "./hooks/useDispatcherProfile";


export default function DispatcherTripsTable({userRole}:{userRole: "Driver" | "Rider"}) {
  const {
    dispatcherTrips,
    handleDeleteTrip,
    error,
    deleteError,
    handleTrackTrip,
    isLoading,
  } = useDispatcherProfile(userRole);

  
  
  if (error) {
    return (
      
        
          
        <div className="h-80 md:w-80 flex items-center justify-center  ">
        <NoData
          noDataText="User has made no orders"
          textClassName="font-semibold text-center"
        />
      </div>
    
      
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeadings.map((tableHeading, index) => (
            <TableHead key={index}>{tableHeading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <SkeletonTable rows={6} cells={7} />}
        {dispatcherTrips &&
          dispatcherTrips?.dispatcher_trips.map((trip: UserTrip) => (
            <TableRow
              key={trip.trip_id}
              onClick={() => handleTrackTrip(trip.trip_id)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{trip.trip_id} </TableCell>

              
              <TableCell className="w-44 text-wrap line-clamp-1 text-ellipsis mb-2">
                {extractBeforeComma(trip.pickup_location)}
              </TableCell>

              <TableCell className="w-44">
                {extractBeforeComma(trip.drop_off_location)}
              </TableCell>

              <TableCell>
                {trip.trip_completion_date
                  ? extractShortDate(trip.trip_completion_date)
                  : "TBD"}
              </TableCell>
              <TableCell>{trip.trip_cost}</TableCell>
              <TableCell>
                <div
                  className={`flex item-center justify-center rounded-lg w-16 border  text-[12px] ${
                    trip.payment_status ? "bg-green-200  border-green-500 text-green-800 " : "bg-red-200 text-red-800 border-red-500 "
                  }`}
                >
                  <p>{trip.payment_status ? "Paid" : "Not Paid"}</p>
                </div>
              </TableCell>

              <TableCell>
                <div
                  className={`flex item-center justify-center border rounded-lg w-16  text-[12px]  ${
                    trip.trip_status === "Delivered"
                    ? "  bg-green-200  border-green-500 text-green-800"
                    : trip.trip_status === "Picked Up"
                    ? "  bg-sky-200 border-sky-500 text-sky-800"
                    : trip.trip_status === "In Transit"
                    ? " bg-amber-200 border-amber-500 text-amber-800"
                    : trip.trip_status === "Booked"
                    ? " bg-slate-200 border-slate-500 text-slate-800"
                    : " bg-red-200 text-red-800 border-red-500"
                  }`}
                >
                  <p>{trip.trip_status}</p>
                </div>
              </TableCell>

              
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

const tableHeadings = [
  "Trip id",
  "Pickup",
  "Drop off",
  "Delivered On",
  "Amount",
  "Payment Status",
  "Delivery Status",
];
