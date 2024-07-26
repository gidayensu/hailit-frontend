'use client'
import Pagination from "@/components/Shared/Pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useState } from "react";
import { LuCheckCircle2, LuXCircle } from "react-icons/lu";
import SkeletonTable from "../SkeletonTable";
import SearchTable from "../TableComponents/SearchTable";
import TablesHeadings from "../TableComponents/TablesHeadings";

import { useGetVehicle } from "./hooks/useGetVehicle";
import { useGetVehicles, Vehicle } from "./hooks/useGetVehicles";



export function Vehicles() {
    const {handleSelectVehicle} = useGetVehicle()
  const [page, setPage] = useState<number> (1);
 
    const {
      
      error,
      vehicles,
      isSuccess,
      total_number_of_pages,
      tableHeadings,
      handleSort,
      sortDetails,
      
      vehiclesLoading,
      handleVehicleSearch,
      vehicleSearchRef,
      
    } = useGetVehicles(page);

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
    <div className="w-full flex items-end justify-end">

    <SearchTable ref={vehicleSearchRef} handleSearch={handleVehicleSearch} isSuccess={isSuccess}/>
    </div>
    <div className="flex flex-col w-full   gap-2 p-4 rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
      <Table>
        <TableHeader>
          <TablesHeadings handleSort={handleSort} sortDetails={sortDetails} tableHeadings={tableHeadings} />
        </TableHeader>
        <TableBody>
          {vehiclesLoading && <SkeletonTable rows={5} cells={5} />}
          {/* vehicles of length 0 is only possible when searching  */}
          {vehicles && vehicles.length === 0 &&
          <div className="text-3xl font-bold flex flex-col items-center justify-center h-44">
          <p >
    
            No vehicle matched your search
          </p>
        </div>
          }
          {!vehiclesLoading && !error &&
            vehicles?.map((vehicle: Vehicle) => (
              <TableRow key={vehicle?.vehicle_id} onClick={()=>handleSelectVehicle(vehicle?.vehicle_id)}>
                <TableCell>{vehicle?.vehicle_name}</TableCell>
                <TableCell>{vehicle?.vehicle_type}</TableCell>
                <TableCell>{vehicle?.vehicle_model}</TableCell>
                <TableCell>{vehicle?.plate_number}</TableCell>                
                <TableCell> {vehicle?.available ? (
                    <LuCheckCircle2 className="text-green-500 text-2xl" />
                    ) : (
                        <LuXCircle className="text-red-500 text-2xl" />
                        )}</TableCell>
                
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
    <Pagination storageKey="Vehicles"  setPage={setPage} totalPages={total_number_of_pages}/>
    </>
  );
}








