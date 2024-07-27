'use client'
import ItemsCount from "@/components/Shared/Pagination/ItemsCount";
import Pagination from "@/components/Shared/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Trip } from "@/lib/store/slice/tripSlice";
import { extractBeforeComma, extractShortDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import DashboardTableItemLoader from "../DashboardTableItemLoader";
import { TableType, useGetTableData } from "../hooks/useGeTableData";
import SkeletonTable from "../SkeletonTable";
import SearchTable from "../TableComponents/SearchTable";
import TablesHeadings from "../TableComponents/TablesHeadings";
import { useAllTripsTable } from "./hooks/useAllTripsTable";
export function AllTripsTable() {
  
  const { tripLoading, selectedTripId, tripTrack, } =
    useAllTripsTable();
    const [page, setPage] = useState<number> (1);
  const {
    dataLoading:tripsLoading,
    total_number_of_pages,
    error,
    data,
    total_items,
    searchRef:tripSearchRef,
    isSuccess,
    sortDetails,
    
    handleSort,
    handleSearch:handleTripSearch,
    isSearch
  
  }  = useGetTableData({page, table:TableType.TripsTable});

  const trips = data?.trips

  return (
    <>
    <div className="w-full flex items-end justify-between gap-2">
    <Link href={'/dashboard/orders/add-order'}>
    
    <Button  > New order</Button>
    </Link>

    <SearchTable ref={tripSearchRef} handleSearch={handleTripSearch} isSuccess={isSuccess}/>
    </div>
    <div className="flex flex-col max-w-fit   gap-2 p-4  rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
      
      <Table>
        <TableHeader>
        <TablesHeadings handleSort={handleSort} sortDetails={sortDetails} tableHeadings={tableHeadings} sortableHeadings={sortableHeadings}/>
        </TableHeader>
          {trips && trips.length === 0 &&
          <div className=" w-full text-3xl font-bold flex flex-col items-center justify-center h-44">
          <p >
    
            No trip matched your search
          </p>
        </div>
          }
        <TableBody>
          {tripsLoading && !error && <SkeletonTable cells={13} rows={9} />}
          {error && <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center">
  
          Error occurred!
        </p>
      </div>}
          {trips && !error && !tripsLoading &&
            trips.map((trip: TripsWithUser) => (
              <>
              { tripLoading && selectedTripId === trip.trip_id &&

            <DashboardTableItemLoader/>
            }
              <TableRow key={trip.trip_id} onClick={()=>tripTrack(trip.trip_id)} className={`cursor-pointer ${tripLoading && selectedTripId === trip.trip_id ?  'opacity-10': ''}`}>
                <TableCell className="font-medium">{trip.trip_id}</TableCell>
                <TableCell>{`${trip.first_name}  ${trip.last_name}`}</TableCell>
                <TableCell>
                  {extractShortDate(trip.trip_request_date)}
                </TableCell>
                <TableCell className=" line-clamp-1">{extractBeforeComma(trip.pickup_location)}</TableCell>
                <TableCell>{trip.sender_number}</TableCell>
                <TableCell className="truncate text-wrap">{extractBeforeComma(trip.drop_off_location)}</TableCell>
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
                    className={`flex item-center justify-center rounded-lg w-16  text-[11px] border ${
                      trip.payment_status ? "bg-green-200  border-green-500 text-green-800 " : "bg-red-200 text-red-800 border-red-500"
                    }`}
                  >
                    <p>{trip.payment_status ? "Paid" : "Not Paid"}</p>
                  </div>
                </TableCell>
                {/* <TableCell>{trip.payment_method}</TableCell> */}
                <TableCell>
                  <div
                    className={`flex item-center border justify-center rounded-lg font-medium w-16  text-[11px] ${
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
                <TableCell><span className="text-decoration: underline">view</span></TableCell>
              </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
    </div>
      
    <div className="flex md:flex-row flex-col">{
      total_number_of_pages && 
      <ItemsCount currentItemsCount={trips.length} item="Trips" page={page} total_items={total_items} total_number_of_pages={total_number_of_pages} />
      }
    <Pagination totalPages={total_number_of_pages} setPage={setPage}  storageKey="AllTrips" isSearch={isSearch}/>
    </div>
    </>
  );
}

const sortableHeadings = [
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
]
const tableHeadings = [
 ...sortableHeadings,
  "View"
];
export interface TripsWithUser extends Trip {
  first_name: string;
  last_name: string;
}
