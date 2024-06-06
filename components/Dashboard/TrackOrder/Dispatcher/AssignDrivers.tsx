'use client'
import Loader from "@/components/Shared/Loader";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";


interface DriverToBeAssigned {
  id: string, 
  name: string, 
  vehicle: string,
  plate: string,
  phone: string,
}

import { useAssignDispatchers } from "./hooks/useAssignDispatchers";
export default function Drivers () {
  const {
    drivers,
    driversLoading,
    assignedDispatcherId,
    updateLoading,
    updateData,
    dispatcherToBeAssigned,
    driversError,
    ridersError,
    handleAssignedDispatcher,
  } = useAssignDispatchers("drivers");
    
    return (<>
    {
        (driversLoading) && 
        <div className="flex gap-2">
          <Skeleton className="h-14 w-14 rounded-full"/>
          <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-20 "/>
          <Skeleton className="h-6 w-20 "/>
          </div>
        </div>
    } 

        { drivers &&
            <ScrollArea className="h-72 w-full rounded-md ">
              <span className="mb-4 text-lg font-bold leading-none  z-10 h-6  w-2/3">DRIVERS</span>
            <div className="w-full p-4 mt-6">
              <div>

              </div>
              {drivers.map((driver: any) => (
                
                <>
                  <div key={driver.driver_id} className="flex justify-between text-sm w-full" onClick={()=>handleAssignedDispatcher({
                    id: driver.driver_id,
                    name: `${driver.first_name} ${driver.last_name}`,
                    plate: driver.plate_number,
                    vehicle: driver.vehicle_name,
                    phone: driver.phone_number
                  })}>
                  <div className="flex gap-2 w-full">
                        <UserAvatar />
                        <div className="flex flex-col">
                        <p className="font-bold">{driver.first_name} {driver.last_name}</p>
                        <p className=" text-[12px]">{driver.vehicle_name}</p>
                        
                        </div>
                </div>
                {driver.driver_id !== assignedDispatcherId && driver.driver_id !== dispatcherToBeAssigned.id &&
                <Button className="w-20">
                      Assign
                </Button>
                }
                {driver.driver_id !== assignedDispatcherId && driver.driver_id === dispatcherToBeAssigned.id && updateLoading &&
                <Button className="w-20" disabled>
                      <Loader color="red"/>
                </Button>
                }

              {(driver.driver_id === assignedDispatcherId || (driver.driver_id === dispatcherToBeAssigned.id && updateData) )&&
                <Button className="w-20 bg-black" disabled>
                  Assigned
                </Button>
                }
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
        }
        </>
        )
}