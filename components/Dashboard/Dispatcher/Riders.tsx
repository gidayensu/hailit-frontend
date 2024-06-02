'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { setAssignedDispatcher } from "@/lib/store/slice/dashboardSlice"
import {  useGetAllRidersQuery, useLazyUpdateTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Shared/Loader";


interface RiderToBeAssigned {
  id: string, 
  name: string, 
  vehicle: string,
  plate: string,
  phone: string,
}
export default function Riders () {
    const [riderToBeAssigned, setRiderToBeAssigned] = useState<RiderToBeAssigned>({
      id: '',
      name: '',
      vehicle: '',
      plate: '',
      phone: '',
    });
    
    const dispatch = useAppDispatch();
    const { assignedDispatcherId, selectedTripId } = useAppSelector(state=>state.dashboard);

    //fetching query based on trip medium
    
    const  {data, isLoading, error} = useGetAllRidersQuery('riders');
    const [updateTrip, {data:updateData, isLoading: updateLoading, error: updateError}] = useLazyUpdateTripQuery();
    
    const handleAssignedDispatcher = (dispatcherDetails: RiderToBeAssigned)=> {
      updateTrip({
          tripId: selectedTripId,
          tripDetails: {dispatcher_id: dispatcherDetails.id}
          
        })
      setRiderToBeAssigned(
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
        assignedDispatcherId: riderToBeAssigned.id,
        assignedDispatcherName: riderToBeAssigned.name,
        assignedDispatcherVehicle: riderToBeAssigned.vehicle,
        assignedDispatcherPlate: riderToBeAssigned.plate, 
        assignedDispatcherPhone: riderToBeAssigned.phone
      }))
    }
    let riders = [];
    if (data) {
      riders = data.riders;
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

        { data && riders &&
            <ScrollArea className="h-72 w-full rounded-md ">
              <span className="mb-4 text-lg font-bold leading-none fixed z-10 h-6 bg-white w-2/3">RIDERS</span>
            <div className="w-full p-4 mt-6">
              <div>

              </div>
              {riders.map((rider: any) => (
                
                <>
                  <div key={rider.rider_id} className="flex justify-between text-sm w-full" onClick={()=>handleAssignedDispatcher({
                    id: rider.rider_id,
                    name: `${rider.first_name} ${rider.last_name}`,
                    plate: rider.plate_number,
                    vehicle: rider.vehicle_name,
                    phone: rider.phone_number
                  })}>
                  <div className="flex gap-2 w-full">
                        <UserAvatar />
                        <div className="flex flex-col">
                        <p className="font-bold">{rider.first_name} {rider.last_name}</p>
                        <p className=" text-[12px]">{rider.vehicle_name}</p>
                        
                        </div>
                </div>
                {rider.rider_id !== assignedDispatcherId && rider.rider_id !== riderToBeAssigned.id &&
                <Button className="w-20">
                      Assign
                </Button>
                }
                {rider.rider_id !== assignedDispatcherId && rider.rider_id === riderToBeAssigned.id && updateLoading &&
                <Button className="w-20" disabled>
                      <Loader color="red"/>
                </Button>
                }

              {(rider.rider_id === assignedDispatcherId || (rider.rider_id === riderToBeAssigned.id && updateData) )&&
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