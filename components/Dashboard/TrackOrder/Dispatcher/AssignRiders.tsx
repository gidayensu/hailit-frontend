"use client";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useAssignDispatchers } from "./hooks/useAssignDispatchers";

export default function Riders() {
  const {
    riders,
    ridersLoading,
    dispatcher,
    handleAssignedDispatcher,
    handleNextPage, 
    handlePreviousPage,
    dispatcherContainerRef,
    page, ridersTotalPages,
  } = useAssignDispatchers("riders");

  
  return (
    <>
      {ridersLoading && (
        <>
          <div className="flex gap-2 w-full">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-32 " />
              <Skeleton className="h-6 w-32 " />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-32 " />
              <Skeleton className="h-6 w-32 " />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-32 " />
              <Skeleton className="h-6 w-32 " />
            </div>
          </div>
        </>
      )}

      {riders && (
        <ScrollArea className="h-[600px] w-full rounded-md " ref={dispatcherContainerRef}>
          <span className="mb-4 text-lg font-bold leading-none z-10 h-6  w-2/3">
            RIDERS
          </span>
          <div className="w-full p-4 mt-6" ref={dispatcherContainerRef}>
            
            {riders.map((rider: any) => (
              <>
                <div
                  key={rider.rider_id}
                  className="flex justify-between text-sm w-full"
                  onClick={() =>
                    handleAssignedDispatcher({
                      dispatcher_id: rider.rider_id,
                      first_name: rider.first_name,
                      last_name: rider.last_name,
                      phone_number: rider.phone_number,
                      vehicle: {
                        plate_number: rider.plate_number,
                        vehicle_name: rider.vehicle_name,
                      },
                    })
                  }
                >
                  <div className="flex gap-2 w-full">
                    <UserAvatar />
                    <div className="flex flex-col">
                      <p className="font-bold">
                        {rider.first_name} {rider.last_name}
                      </p>
                      <p className=" text-[12px]">{rider.vehicle_name}</p>
                    </div>
                  </div>
                  {rider.rider_id !== dispatcher.dispatcher_id && (
                    <Button className="w-20">Assign</Button>
                  )}

                  {rider.rider_id === dispatcher.dispatcher_id && (
                    <Button className="w-20 bg-black" disabled>
                      Assigned
                    </Button>
                  )}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
          <p className="text-[12px]">Page {page} of {ridersTotalPages} </p>
          <div className="flex justify-end items-center mr-4 gap-2">
            
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => handlePreviousPage("riders")}
              disabled={page===1}
            >
              Previous
            </Button>
            <p>|</p>
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => handleNextPage("riders")}
              disabled={page===ridersTotalPages}
            >
              Next
            </Button>
          </div>
        </ScrollArea>
      )}
    </>
  );
}
