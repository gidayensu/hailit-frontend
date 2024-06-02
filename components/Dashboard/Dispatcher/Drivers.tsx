'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { setAssignedDispatcher } from "@/lib/store/slice/dashboardSlice"
import {  useGetAllDriversQuery, useLazyUpdateTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Shared/Loader";


interface DriverToBeAssigned {
  id: string, 
  name: string, 
  vehicle: string,
  plate: string,
  phone: string,
}
export default function Drivers () {
    const [driverToBeAssigned, setDriverToBeAssigned] = useState<DriverToBeAssigned>({
      id: '',
      name: '',
      vehicle: '',
      plate: '',
      phone: '',
    });
    
    const dispatch = useAppDispatch();
    const { assignedDispatcherId, selectedTripId } = useAppSelector(state=>state.dashboard);

    //fetching query based on trip medium
    
    const  {data, isLoading, error} = useGetAllDriversQuery('drivers');
    const [updateTrip, {data:updateData, isLoading: updateLoading, error: updateError}] = useLazyUpdateTripQuery();
    
    const handleAssignedDispatcher = (dispatcherDetails: DriverToBeAssigned)=> {
      updateTrip({
          tripId: selectedTripId,
          tripDetails: {dispatcher_id: dispatcherDetails.id}
          
        })
      setDriverToBeAssigned(
        {
          id: dispatcherDetails.id,
          name: dispatcherDetails.name,
          vehicle: dispatcherDetails.vehicle,
          plate: dispatcherDetails.vehicle,
          phone: dispatcherDetails.phone
        }
      )  
        
    }
    if (updateData) {
      dispatch(setAssignedDispatcher({
        assignedDispatcherId: driverToBeAssigned.id,
        assignedDispatcherName: driverToBeAssigned.name,
        assignedDispatcherVehicle: driverToBeAssigned.vehicle,
        assignedDispatcherPlate: driverToBeAssigned.plate, 
        assignedDispatcherPhone: driverToBeAssigned.phone
      }))
    }
    let drivers = [];
    if (data) {
      drivers = data.drivers;
      }

    return (<>
    {
        (isLoading) && 
        <div className="flex gap-2">
          <Skeleton className="h-14 w-14 rounded-full"/>
          <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-20 "/>
          <Skeleton className="h-6 w-20 "/>
          </div>
        </div>
    } 

        { data && drivers &&
            <ScrollArea className="h-72 w-full rounded-md ">
              <span className="mb-4 text-lg font-bold leading-none fixed z-10 h-6 bg-white w-2/3">RIDERS</span>
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
                {driver.driver_id !== assignedDispatcherId && driver.driver_id !== driverToBeAssigned.id &&
                <Button className="w-20">
                      Assign
                </Button>
                }
                {driver.driver_id !== assignedDispatcherId && driver.driver_id === driverToBeAssigned.id && updateLoading &&
                <Button className="w-20" disabled>
                      <Loader color="red"/>
                </Button>
                }

              {(driver.driver_id === assignedDispatcherId || (driver.driver_id === driverToBeAssigned.id && updateData) )&&
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