'use client'
import Pagination from "@/components/Shared/Pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { extractShortDate, extractBeforeComma } from "@/lib/utils";
import { useState } from "react";
import { useGetTrips } from "../hooks/useGetTrips";
import SkeletonTable from "../SkeletonTable";
import { Button } from "@/components/ui/button";

export function AllTripsData({setAddTrip}:{setAddTrip: (arg:boolean)=>void}) {
  
  const handleAddTripClick = () => {
    
    setAddTrip(true);
  };
  const [page, setPage] = useState<number> (1);
  const {data, tripsData, total_number_of_pages, handleTrackTrip, isLoading, error}  = useGetTrips({ page, table:"trips"});
 
  return (
    <>
    <Button className="md:w-1/6 w-1/3" onClick={handleAddTripClick}> Add trip</Button>
    <div className="flex flex-col max-w-fit   gap-2 p-4  rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
      
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
          {isLoading && <SkeletonTable cells={14} rows={10} />}

          {error && <div> Error Occurred </div>}
          {data && tripsData &&
            tripsData.map((trip: any) => (
              <TableRow key={trip.trip_id} onClick={()=>handleTrackTrip(trip.trip_id)}>
                <TableCell className="font-medium">{trip.trip_id}</TableCell>
                <TableCell>{`${trip.first_name}  ${trip.last_name}`}</TableCell>
                <TableCell>
                  {extractShortDate(trip.trip_request_date)}
                </TableCell>
                <TableCell className=" line-clamp-1">{extractBeforeComma(trip.pickup_location)}</TableCell>
                <TableCell>{trip.sender_number}</TableCell>
                <TableCell className="truncate">{extractBeforeComma(trip.drop_off_location)}</TableCell>
                <TableCell>{trip.recipient_number}</TableCell>
                <TableCell>
                  {trip.trip_completion_date
                    ? extractShortDate(trip.trip_completion_date)
                    : "TBD"}
                </TableCell>
                <TableCell>{trip.trip_medium}</TableCell>
                <TableCell>{trip.trip_cost}</TableCell>
                <TableCell className="">
                  <div
                    className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${
                      trip.payment_status ? "bg-green-500 " : "bg-red-500 "
                    }`}
                  >
                    <p>{trip.payment_status ? "Paid" : "Not Paid"}</p>
                  </div>
                </TableCell>
                {/* <TableCell>{trip.payment_method}</TableCell> */}
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
                <TableCell><span className="text-decoration: underline">view</span></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
      
    <div>

    </div>
    <Pagination totalPages={total_number_of_pages} setPage={setPage}  storageKey="AllTrips"/>
    </>
  );
}

const tableHeadings = [
  "Trip id",
  "Ordered by",
  "Booked On",
  "Pickup",
  "Pickup Contact",
  "Drop off",
  "Drop off Contact",
  "Delivered On",
  "Medium",
  "Amount",
  "Payment Status",
  // "Payment Method",
  "Delivery Status",
  "View"
];
