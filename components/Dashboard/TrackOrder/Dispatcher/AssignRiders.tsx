"use client";
import Loader from "@/components/Shared/Loader";
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
    updateData,
    updateLoading,
    dispatcherToBeAssigned,
    assignedDispatcherId,
    driversError,
    ridersError,
    handleAssignedDispatcher,
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
        <ScrollArea className="h-72 w-full rounded-md ">
          <span className="mb-4 text-lg font-bold leading-none z-10 h-6  w-2/3">
            RIDERS
          </span>
          <div className="w-full p-4 mt-6">
            <div></div>
            {riders.map((rider: any) => (
              <>
                <div
                  key={rider.rider_id}
                  className="flex justify-between text-sm w-full"
                  onClick={() =>
                    handleAssignedDispatcher({
                      id: rider.rider_id,
                      name: `${rider.first_name} ${rider.last_name}`,
                      plate: rider.plate_number,
                      vehicle: rider.vehicle_name,
                      phone: rider.phone_number,
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
                  {rider.rider_id !== assignedDispatcherId &&
                    rider.rider_id !== dispatcherToBeAssigned.id && (
                      <Button className="w-20">Assign</Button>
                    )}
                  {rider.rider_id !== assignedDispatcherId &&
                    rider.rider_id === dispatcherToBeAssigned.id &&
                    updateLoading && (
                      <Button className="w-20" disabled>
                        <Loader />
                      </Button>
                    )}

                  {(rider.rider_id === assignedDispatcherId ||
                    (rider.rider_id === dispatcherToBeAssigned.id &&
                      updateData)) && (
                    <Button className="w-20 bg-black" disabled>
                      Assigned
                    </Button>
                  )}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
}
