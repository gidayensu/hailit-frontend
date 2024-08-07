"use client";
import NoData from "@/components/Shared/NoData";
import ClientTripsPagination from "@/components/Shared/Pagination/ClientTripsPagination";
import { useClientTripsPagination } from "@/components/Shared/Pagination/hooks/useClientTripsPagination";
import Container from "@/components/ui/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { extractBeforeComma, extractShortDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardTableItemLoader from "../DashboardTableItemLoader";
import SkeletonTable from "../SkeletonTable";
import { UserTrip } from "./hooks/useUserProfile";

export default function UserTripsTable({
  userTrips,
  error,
  isLoading,
}: {
  userTrips: any;
  error: any;
  isLoading: boolean;
}) {
  const {nextPage, prevPage, totalPages, currentTrips, tripsPerPage, currentPage, } = useClientTripsPagination({trips: userTrips, tripsPerPage:5})
  const router = useRouter();

  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string>("");

  const handleTrackTrip = (tripId: string) => {
    setTripLoading(true);
    setSelectedTripId(tripId);
    router.push(`/dashboard/track-order/${tripId}`);
  };

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
  //  <Container className="rounded-xl flex justify-center items-center">
  return (
    <div className="flex flex-col w-full">
    <Container className="w-full rounded-xl flex justify-center items-center flex-col">
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeadings.map((tableHeading) => (
            <TableHead key={tableHeading}>{tableHeading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <SkeletonTable rows={6} cells={7} />}
        {currentTrips &&
          currentTrips.map((trip: UserTrip) => (
            <>
              {tripLoading && selectedTripId === trip.trip_id && (
                <DashboardTableItemLoader />
              )}
              <TableRow
                key={trip.trip_id}
                onClick={() => handleTrackTrip(trip.trip_id)}
                className={`cursor-pointer ${
                  tripLoading && selectedTripId === trip.trip_id
                    ? "opacity-10"
                    : ""
                }`}
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
                    className={`flex item-center justify-center rounded-lg w-16 border font-medium text-[11px] ${
                      trip.payment_status
                        ? "bg-green-200  border-green-500 text-green-800 "
                        : "bg-red-200 text-red-800 border-red-500 "
                    }`}
                  >
                    <p>{trip.payment_status ? "Paid" : "Not Paid"}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    className={`flex item-center justify-center border rounded-lg w-16  text-[11px] medium ${
                      trip.trip_status === "Delivered"
                        ? "bg-green-200  border-green-500 text-green-800"
                        : trip.trip_status === "Picked Up"
                        ? "bg-sky-200 border-sky-500 text-sky-800"
                        : trip.trip_status === "In Transit"
                        ? "bg-amber-200 border-amber-500 text-amber-800"
                        : trip.trip_status === "Booked"
                        ? "bg-slate-200 border-slate-500 text-slate-800"
                        : "bg-red-200 text-red-800 border-red-500"
                    }`}
                  >
                    <p>{trip.trip_status}</p>
                  </div>
                </TableCell>
              </TableRow>
            </>
          ))}
      </TableBody>
    </Table>
    </Container>
    {userTrips?.length > tripsPerPage && (
        <ClientTripsPagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} totalPages={totalPages}/>
        
        
      )}
    </div>
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
