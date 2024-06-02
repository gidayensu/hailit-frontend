'use client'
import DispatcherScroll from "./DispatcherScroll";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { setAssignedDispatcherId } from "@/lib/store/slice/dashboardSlice"
import { useGetAllDriversQuery, useGetAllRidersQuery } from "@/lib/store/apiSlice/hailitApi";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Drivers () {
    const dispatch = useAppDispatch();
    const { assignedDispatcherId } = useAppSelector(state=>state.dashboard);

    //fetching query based on trip medium
    
    let dispatchersData = [];
    const  {data, isLoading, error } = useGetAllDriversQuery('drivers');
    
    const handleAssignedDispatcher = (dispatcherId: string)=> {
        dispatch(setAssignedDispatcherId(dispatcherId))
    }

    let drivers = [];
    if (data) {
        drivers = data.drivers;
    }

    return (<>
    {
        (isLoading) && 
        <p>Loading....</p>
    } 

        { data && drivers &&
            <ScrollArea className="h-72 w-full rounded-md ">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
              {drivers.map((driver: any) => (
                <>
                  <div key={'s'} className="text-sm">
                    <p>1234</p>
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