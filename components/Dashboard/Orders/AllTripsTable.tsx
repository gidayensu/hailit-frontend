import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetAllTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import SkeletonTable from "../SkeletonTable";
import { extractDateWithDayFromDate } from "@/lib/utils";
import {  useAppDispatch } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";

export function AllTripsTable() {
  const dispatch = useAppDispatch();
  const handleTrackTrip = (tripId:string)=> {
    dispatch(setActiveSection('Track Order'))
    dispatch (setTrackingOrder(true))
    dispatch (setSelectedTripId(tripId))
  }  

  const { data, isLoading, error } = useGetAllTripsQuery(`trips`);
  
  let trips = [];
  
  if (data) {
    trips = data.trips;
  }


  return (
    <div className="flex flex-col w-full   gap-2 p-4 h-full rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Trip id</TableHead>
            <TableHead>Ordered by</TableHead>
            <TableHead>Booked On</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Pickup Contact</TableHead>
            <TableHead>Drop off</TableHead>
            <TableHead>Drop off Contact</TableHead>
            <TableHead>Delivered On</TableHead>
            <TableHead>Medium</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Delivery Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <SkeletonTable cells={12} rows={10} />}
          {data &&
            trips.map((trip: any) => (
              <TableRow key={trip.trip_id} onClick={()=>handleTrackTrip(trip.trip_id)}>
                <TableCell className="font-medium">{trip.trip_id}</TableCell>
                <TableCell>{trip.first_name + ' ' + trip.last_name}</TableCell>
                <TableCell>
                  {extractDateWithDayFromDate(trip.trip_request_date)}
                </TableCell>
                <TableCell>{trip.pickup_location}</TableCell>
                <TableCell>{trip.sender_number}</TableCell>
                <TableCell>{trip.drop_off_location}</TableCell>
                <TableCell>{trip.recipient_number}</TableCell>
                <TableCell>
                  {trip.trip_completion_date
                    ? extractDateWithDayFromDate(trip.trip_completion_date)
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
                <TableCell>{trip.payment_method}</TableCell>
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
    </div>
  );
}
