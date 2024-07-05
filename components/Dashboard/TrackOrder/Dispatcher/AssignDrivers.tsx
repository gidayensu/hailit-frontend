"use client";
import Loader from "@/components/Shared/Loader";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useAssignDispatchers } from "./hooks/useAssignDispatchers";

export default function Drivers() {
  const {
    drivers,
    driversLoading,
    updateData,
    updateLoading,
    dispatcher,
    assignedDispatcherId,
    driversError,
    page,
    driversTotalPages,
    handleAssignedDispatcher,
    handleNextPage,
    handlePreviousPage
  } = useAssignDispatchers("drivers");

  
  return (
    <>
      {driversLoading && (
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

      {drivers && (
        <ScrollArea className="h-[600px] w-full rounded-md ">
          <span className="mb-4 text-lg font-bold leading-none z-10 h-6  w-2/3">
            DRIVERS
          </span>
          <div className="w-full p-4 mt-6">
            <div></div>
            {drivers.map((driver: any) => (
              <>
                <div
                  key={driver.driver_id}
                  className="flex justify-between text-sm w-full"
                  onClick={() =>
                    handleAssignedDispatcher({
                      dispatcher_id: driver.driver_id,
                      first_name: driver.first_name,
                      last_name: driver.last_name,
                      phone_number: driver.phone_number,
                      vehicle: {
                      plate_number: driver.plate_number,
                      vehicle_name: driver.vehicle_name,
                    },
                    })
                  }
                >
                  <div className="flex gap-2 w-full">
                    <UserAvatar />
                    <div className="flex flex-col">
                      <p className="font-bold">
                        {driver.first_name} {driver.last_name}
                      </p>
                      <p className=" text-[12px]">{driver.vehicle_name}</p>
                    </div>
                  </div>
                  {driver.driver_id !== dispatcher.dispatcher_id && (
                      <Button className="w-20">Assign</Button>
                    )}
                  

                  {(driver.driver_id  === dispatcher.dispatcher_id) && (
                    <Button className="w-20 bg-black" disabled>
                      Assigned
                    </Button>
                  )}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
          <p className="text-[12px]">Page {page} of {driversTotalPages} </p>
          <div className="flex justify-end items-center mr-4 gap-2">
            
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => handlePreviousPage("drivers")}
              disabled={page===1}
            >
              Previous
            </Button>
            <p>|</p>
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => handleNextPage("drivers")}
              disabled={page===driversTotalPages}
            >
              Next
            </Button>
          </div>
        </ScrollArea>
      )}
    </>
  );
}
