"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import ItemsCount from "@/components/Shared/Pagination/ItemsCount";
import Pagination from "@/components/Shared/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { extractBeforeComma, extractShortDate } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardTableItemLoader from "../DashboardTableItemLoader";
import { useGetTrips } from "../hooks/useGetTrips";
import SkeletonTable from "../SkeletonTable";
import { Trip } from "@/lib/store/slice/tripSlice";

export function AllTripsTable() {
  const [tripLoading, setTripLoading] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { tripsData, total_number_of_pages, isLoading, error, total_items } =
    useGetTrips({ page, table: "trips" });
  const router = useRouter();

  const tripTrack = (tripId: string) => {
    setTripLoading(true);
    setSelectedTripId(tripId);
    router.push(`/dashboard/track-order/${tripId}`);
  };

  const columns = useMemo<ColumnDef<TripsWithUser>[]>(
    () => [
      { accessorKey: "trip_id", header: "Trip id" },
      {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        id: "ordered_by",
        header: "Ordered by",
      },
      {
        accessorKey: "trip_request_date",
        header: "Booked On",
        cell: (info) => extractShortDate(info.getValue<string>()),
      },
      {
        accessorKey: "pickup_location",
        header: "Pickup",
        cell: (info) => extractBeforeComma(info.getValue<string>()),
      },
      { accessorKey: "sender_number", header: "Pickup Contact" },
      {
        accessorKey: "drop_off_location",
        header: "Drop off",
        cell: (info) => extractBeforeComma(info.getValue<string>()),
      },
      { accessorKey: "recipient_number", header: "Drop off Contact" },
      {
        accessorKey: "trip_completion_date",
        header: "Delivered On",
        cell: (info) =>
          info.getValue<string>()
            ? extractShortDate(info.getValue<string>())
            : "TBD",
      },
      { accessorKey: "trip_medium", header: "Medium" },
      { accessorKey: "trip_cost", header: "Amount" },
      {
        accessorKey: "payment_status",
        header: "Payment Status",
        cell: (info) => (
          <div
            className={`flex item-center justify-center rounded-lg w-16 text-[11px] border ${
              info.getValue<boolean>()
                ? "bg-green-200 border-green-500 text-green-800"
                : "bg-red-200 text-red-800 border-red-500"
            }`}
          >
            <p>{info.getValue<boolean>() ? "Paid" : "Not Paid"}</p>
          </div>
        ),
      },
      {
        accessorKey: "trip_status",
        header: "Delivery Status",
        cell: (info) => (
          <div
            className={`flex item-center border justify-center rounded-lg font-medium w-16 text-[11px] ${
              info.getValue<string>() === "Delivered"
                ? "bg-green-200 border-green-500 text-green-800"
                : info.getValue<string>() === "Picked Up"
                ? "bg-sky-200 border-sky-500 text-sky-800"
                : info.getValue<string>() === "In Transit"
                ? "bg-amber-200 border-amber-500 text-amber-800"
                : info.getValue<string>() === "Booked"
                ? "bg-slate-200 border-slate-500 text-slate-800"
                : "bg-red-200 text-red-800 border-red-500"
            }`}
          >
            <p>{info.getValue<string>()}</p>
          </div>
        ),
      },
      {
        id: "view",
        header: "View",
        cell: () => <span className="text-decoration: underline">view</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: tripsData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    
  });

  return (
    <>
      <Link href={"/dashboard/orders/add-order"}>
        <Button className="md:w-1/6 w-1/3">Add order</Button>
      </Link>
      <div className="flex flex-col max-w-fit gap-2 p-4 rounded-xl border border-slate-300 bg-white dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark dark:text-slate-100 cursor-pointer">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && <SkeletonTable cells={14} rows={10} />}
            {error && <div>Error Occurred</div>}
            {table.getRowModel().rows.map((row) => {
              const trip = row.original;
              return (
                <TableRow
                  key={row.id}
                  onClick={() => tripTrack(trip.trip_id)}
                  className={`cursor-pointer ${
                    tripLoading && selectedTripId === trip.trip_id
                      ? "opacity-10"
                      : ""
                  }`}
                >
                  {tripLoading && selectedTripId === trip.trip_id && (
                    <DashboardTableItemLoader />
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div>
        {tripsData && (
          <ItemsCount
            currentItemsCount={tripsData.length}
            item="Trips"
            page={page}
            total_items={total_items}
            total_number_of_pages={total_number_of_pages}
          />
        )}
      </div>
      <Pagination
        totalPages={total_number_of_pages}
        setPage={setPage}
        storageKey="AllTrips"
      />
    </>
  );
}

export interface TripsWithUser extends Trip {
  first_name: string;
  last_name: string;
}
