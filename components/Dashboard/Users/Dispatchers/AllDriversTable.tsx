import ItemsCount from "@/components/Shared/Pagination/ItemsCount";
import Pagination from "@/components/Shared/Pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuCheckCircle2, LuXCircle } from "react-icons/lu";
import DashboardTableItemLoader from "../../DashboardTableItemLoader";
import { TableType, useGetTableData } from "../../hooks/useGetTableData";
import SkeletonTable from "../../SkeletonTable";
import SearchTable from "../../TableComponents/SearchTable";
import TablesHeadings from "../../TableComponents/TablesHeadings";
import { Rating } from "./AllRidersTable";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";

export function AllDrivers() {
  const [page, setPage] = useState<number> (1);
    
    
    const {handleSelectedDriverId, handleSetDispatcherRole, selectedDriverId,} = useDispatcherProfile()
    
    const [driverLoading, setDriverLoading] = useState<boolean>(false);
    const {
      handleSort,
      sortDetails,
      dataLoading:driversLoading,
      data,
      error,
      total_number_of_pages,
      total_items,
      handleSearch:handleDriversSearch,
      searchRef:driverSearchRef,
      status,
      isSearch,
      
    } = useGetTableData({table:TableType.DriversTable, page, initialColumn:"Full Name"});
    
    const drivers = data?.drivers

    const router = useRouter();

    const handleSelectedDriver = (driverId:string)=> {
      handleSelectedDriverId(driverId)
      setDriverLoading(true)
      handleSetDispatcherRole('Driver');
      router.push('/dashboard/dispatchers/dispatcher-details')
    }

    if (error) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!</p>
        
      </div>
    }

    return (
      <>
      <div className="w-full flex items-end justify-end">

      <SearchTable
        ref={driverSearchRef}
        handleSearch={handleDriversSearch}
        status={status}
      />
      </div>
        <div className="flex flex-col w-full   gap-2 p-4  rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
          <Table>
            <TableHeader>
              <TablesHeadings handleSort={handleSort} sortDetails={sortDetails} tableHeadings={tableHeadings} />
            </TableHeader>
            <TableBody>
              {driversLoading && <SkeletonTable rows={7} cells={8} />}
              {drivers && !driversLoading &&
                drivers.map((driver: Driver) => (
                  <>
                    {driverLoading && selectedDriverId === driver.driver_id && (
                      <DashboardTableItemLoader />
                    )}
                    <TableRow
                      key={driver.driver_id}
                      onClick={() => handleSelectedDriver(driver.driver_id)}
                      className={`cursor-pointer ${
                        driverLoading && selectedDriverId === driver.driver_id
                          ? "opacity-20"
                          : ""
                      } `}
                    >
                      <TableCell>{`${driver.first_name} ${driver.last_name}`}</TableCell>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.phone_number}</TableCell>
                      <TableCell>{driver.license_number} </TableCell>
                      <TableCell className="flex gap-1">
                        <Rating rating={driver.cumulative_rating} /> (
                        {driver.rating_count})
                      </TableCell>
                      <TableCell> {driver.vehicle_name}</TableCell>
                      <TableCell> {driver.plate_number}</TableCell>
                      <TableCell>
                        
                        {driver.available ? (
                          <LuCheckCircle2 className="text-green-500 text-2xl" />
                        ) : (
                          <LuXCircle className="text-red-500 text-2xl" />
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full justify-between gap-2 items-center">

        {drivers && (
          <ItemsCount
            currentItemsCount={drivers.length}
            item="Drivers"
            page={1}
            total_items={total_items}
            total_number_of_pages={total_number_of_pages}
          />
          
        )}
        <Pagination
        setPage={setPage}
        totalPages={total_number_of_pages}
        storageKey="AllDrivers"
        isSearch = {isSearch}
      />
        </div>
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
    "Available"  
  ];
  

  export interface Driver {
    rating_count: number;
    cumulative_rating: number;
    user_id: string;
    user_role: "Driver";
    driver_id: string;
    license_number?: string;
    available?: boolean;
    vehicle_id?: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    vehicle_name? : string;
    plate_number?: string;
  }