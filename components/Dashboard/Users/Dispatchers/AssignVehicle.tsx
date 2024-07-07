"use client";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAssignVehicle } from "./hooks/useAssignVehicle";
import Loader from "@/components/Shared/Loader";

export default function AssignVehicle({dispatcher}:{dispatcher:any}) {
  
  const {
    vehicles,
    page,
    dispatcherContainerRef,
    assignedVehicle,
    vehiclesLoading,
    assignVehicleLoading,
    assignVehicleError,
    vehiclesError,
    totalPages,
    handleAssignVehicle,
    handleNextPage,
    handlePreviousPage,
  } = useAssignVehicle(dispatcher);
  //matching vehicle - car = driver and motor = rider
  
  return (
    <>
      {vehiclesLoading && (
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

      {vehicles && (
        <ScrollArea className="h-[600px] w-full rounded-md " ref={dispatcherContainerRef}>
          <span className="mb-4 text-lg font-bold leading-none z-10 h-6  w-2/3">
            {dispatcher.user_role === "Driver" ? "CARS": "MOTORS"}
          </span>
          <div className="w-full p-4 mt-6" ref={dispatcherContainerRef}>
            
            {vehicles.map((vehicle: any) => (
              <>
                <div
                  key={vehicle.vehicle_id}
                  className="flex justify-between text-sm w-full"
                  
                >
                  <div className="flex gap-2 w-full">
                    <UserAvatar />
                    <div className="flex flex-col">
                      <p className="font-bold">
                        {vehicle.vehicle_name}
                      </p>
                      <p className=" text-[12px]">{vehicle.plate_number}</p>
                    </div>
                  </div>
                  
                  {vehicle.vehicle_id !== dispatcher.vehicle_id &&
                  <Button className="w-20" 
                  disabled = {vehicle.vehicle_id === dispatcher.vehicle_id}
                  onClick={() =>
                    handleAssignVehicle({
                      plate_number: vehicle?.plate_number,
                      vehicle_id: vehicle?.vehicle_id,
                      vehicle_name: vehicle?.vehicle_name
                    })
                  }> {
                     vehicle.vehicle_id === assignedVehicle.vehicle_id && assignVehicleLoading
                    ? <Loader/> :
                  'Assign'
                  
                  }
                  </Button>
                  }
                  {vehicle.vehicle_id === dispatcher.vehicle_id && (
                    <Button className="w-20 bg-black" disabled>
                      Assigned
                    </Button>
                  )}
                
                  
                  
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
          <p className="text-[12px]">Page {page} of {totalPages} </p>
          <div className="flex justify-end items-center mr-4 gap-2">
            
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => handlePreviousPage()}
              disabled={page===1}
            >
              Previous
            </Button>
            <p>|</p>
            <Button
              variant={"empty"}
              className="w-20 hover:text-primary-color"
              onClick={() => handleNextPage()}
              disabled={page===totalPages}
            >
              Next
            </Button>
          </div>
        </ScrollArea>
      )}
    </>
  );
}
