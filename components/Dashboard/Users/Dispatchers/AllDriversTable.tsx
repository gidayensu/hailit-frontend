import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDriversQuery } from "@/lib/store/apiSlice/hailitApi";
import { LuCheckCircle2, LuXCircle } from "react-icons/lu";
import SkeletonTable from "../../SkeletonTable";
import { Rating } from "./AllRidersTable";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";
import ItemsCount from "@/components/Shared/Pagination/ItemsCount";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardTableItemLoader from "../../DashboardTableItemLoader";

export function AllDrivers() {
    const {data:driversData, isLoading:loadingDrivers, error:errorDrivers} = useGetAllDriversQuery(`drivers`);
    const drivers = driversData?.drivers;
    const {handleSelectedDriverId, handleSetDispatcherRole, selectedDriverId,} = useDispatcherProfile()
    
    const [driverLoading, setDriverLoading] = useState<boolean>(false);
    

    const router = useRouter();

    const handleSelectedDriver = (driverId:string)=> {
      handleSelectedDriverId(driverId)
      setDriverLoading(true)
      handleSetDispatcherRole('Driver');
      router.push('/dashboard/dispatchers/dispatcher-details')

    }

    if (errorDrivers) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!</p>
        
      </div>
    }
    return (
      <>
        <div className="flex flex-col w-full   gap-2 p-4  rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeadings.map((tableHeading) => (
                  <TableHead key={tableHeading}>{tableHeading}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingDrivers && <SkeletonTable rows={7} cells={8} />}
              {driversData &&
                drivers.map((driver: any) => (
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
        {drivers && (
          <ItemsCount
            currentItemsCount={drivers.length}
            item="Drivers"
            page={1}
            total_items={drivers.length}
            total_number_of_pages={1}
          />
        )}
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
  