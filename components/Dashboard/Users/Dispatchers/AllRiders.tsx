'use client'
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import Pagination from "@/components/Shared/Pagination/Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonTable from "../../SkeletonTable";
import { useGetAllRiders } from "./hook/useGetAllRiders";
import { LuCheckCircle2, LuXCircle } from "react-icons/lu";

export function AllRiders() {
  const [page, setPage] = useState<number>(1);
  const {data, riders, total_number_of_pages, error, isLoading} = useGetAllRiders(page);
  if (error) {
    return (
      <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center">
  
          Error occurred!
        </p>
      </div>
    );
  }
  return (
    <>
    <div className="flex flex-col w-full   gap-2 p-4 rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
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
          {isLoading && <SkeletonTable rows={5} cells={8} />}
          {data &&
            riders.map((rider: any) => (
              <TableRow key={rider.rider_id}>
                <TableCell>{`${rider.first_name} ${rider.last_name}`}</TableCell>

                <TableCell>{rider.email}</TableCell>

                <TableCell>{rider.phone_number}</TableCell>
                <TableCell>{rider.license_number} </TableCell>
                <TableCell className="flex gap-1"><Rating rating = {rider.cumulative_rider_rating}/> ({rider.rider_rating_count})</TableCell>
                <TableCell> {rider.vehicle_name}</TableCell>
                <TableCell> {rider.plate_number}</TableCell>
                <TableCell> {rider.rider_availability == "Available" ? (
                      <LuCheckCircle2 className="text-green-500 text-2xl" />
                    ) : (
                      <LuXCircle className="text-red-500 text-2xl" />
                    )}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
    <Pagination   setPage={setPage} totalPages={total_number_of_pages} storageKey="AllRiders"/>
    </>
  );
}

const tableHeadings = [
  "Full Name",
  "Email",
  "Phone Number",
  "License Number",
  "Rating",
  "Vehicle Name",
  "Vehicle Number",
  "Availability",
];


const Rating = ({ rating }: {rating: number }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex gap-1 ">
      {Array(fullStars)
        .fill('full stars')
        .map((_, index) => (
          <FaStar key={index} className="text-amber-500"/>
        ))}
      
      {Array(emptyStars)
        .fill('empty stars')
        .map((_, index) => (
          <FaRegStar key={index} />
        )) 
        }
    </div>
  );
};


