"use client";
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
import { useUserProfile } from "./hook/useUserProfile";
import NoData from "@/components/Shared/NoData";

export default function UserTripsTable() {
  const {
    userTrips,
    handleDeleteTrip,
    error,
    deleteError,
    handleTrackTrip,
    isLoading,
  } = useUserProfile();
  if (error) {
    return (
      <div>
        
          
        <div className="h-1/3 md:w-full md:mt-2 mt-4 flex lg:md-0 items-center justify-center ">
        <NoData
          noDataText="User has made no other orders"
          textClassName="font-semibold text-center"
        />
      </div>
    
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
        {isLoading && <SkeletonTable rows={7} cells={8} />}
        {userTrips &&
          userTrips?.customer_trips.map((trip: any) => (
            <TableRow
              key={trip.trip_id}
              onClick={() => handleTrackTrip(trip.trip_id)}
            >
              <TableCell className="font-medium">{trip.trip_id} </TableCell>

              
              <TableCell className="w-44 text-wrap line-clamp-1 text-ellipsis">
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
                  className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${
                    trip.paymentStatus ? "bg-green-600 " : "bg-red-500 "
                  }`}
                >
                  <p>{trip.payment_status ? "Paid" : "Not Paid"}</p>
                </div>
              </TableCell>

              <TableCell>
                <div
                  className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${
                    trip.trip_status === "Delivered"
                      ? "  bg-green-500"
                      : trip.trip_status === "Picked Up"
                      ? "  bg-sky-600"
                      : trip.trip_status === "In Transit"
                      ? " bg-amber-500 "
                      : trip.trip_status === "Booked"
                      ? " bg-slate-600 dark:text-slate-50"
                      : " bg-red-500"
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
