'use client'
import { useState } from "react";
import { FaStar, FaRegStar } from 'react-icons/fa'
import Pagination from "@/components/Shared/Pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonTable from "../SkeletonTable";
import { LuCheckCircle2, LuXCircle } from "react-icons/lu";
import { useGetVehicles } from "./hook/useGetVehicles";
import { Vehicle } from "./hook/useGetVehicles";

export function Vehicles() {
    const limit = 7;
  const [offset, setOffset] = useState<number> (limit);
    const {data, vehicles, error, isLoading, total_number_of_pages} = useGetVehicles({limit, offset})

  if (error) {
    return (
      <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center">
  
          Error occurred!...Our Fault
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
            vehicles.map((vehicle: Vehicle) => (
              <TableRow key={vehicle.vehicle_id}>
                <TableCell>{vehicle.vehicle_name}</TableCell>
                <TableCell>{vehicle.vehicle_type}</TableCell>
                <TableCell>{vehicle.vehicle_model}</TableCell>
                <TableCell>{vehicle.plate_number} </TableCell>                
                <TableCell> {vehicle.availability ? (
                    <LuCheckCircle2 className="text-green-500 text-2xl" />
                    ) : (
                        <LuXCircle className="text-red-500 text-2xl" />
                        )}</TableCell>
                <TableCell>
                    {vehicle.plate_number} 
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
    <Pagination limit={limit} offset={offset} setOffset={setOffset} totalPages={total_number_of_pages}/>
    </>
  );
}

const tableHeadings = [
  "Name",
  "Type",
  "Model",
  "Number Plate",
  "Available",
  "Actions"
  
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


