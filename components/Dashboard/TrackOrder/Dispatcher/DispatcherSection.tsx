'use client'
import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import { TbArrowsExchange } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { LiaUserSlashSolid } from "react-icons/lia";
import Riders from "./Riders";
import Drivers from "./Drivers";
import { useAppSelector } from "@/lib/store/hooks";

export const DEFAULT_DISPATCHER_ID= "ff-12-53"

export default function DispatcherSection({
  dispatcher,
  tripMedium,
}: {
  dispatcher: any;
  tripMedium: string;
}) {

  const { assignedDispatcherId, assignedDispatcherName, assignedDispatcherPlate, assignedDispatcherVehicle} = useAppSelector(state=>state.dashboard)
  return (
    <>
      <div className="flex justify-between">
        <div className="">
          <h3 className="font-bold">
            {tripMedium === "Motor" ? "RIDER" : "DRIVER"}
          </h3>
          <h3 className="text-[12px] text-slate-400 -mt-1">
            Details
          </h3>
        </div>

        <Modal
          className="w-full flex items-start justify-end"
          dialogTriggerElement={
            <Button
              variant={"empty"}
              className="space-x-1 bg-primary-color hover:bg-primary-medium text-white  hover:dark:bg-slate-100 dark:text-secondary-dark dark:bg-white"
            >
              <>
                <TbArrowsExchange className="text-xl " /> <p>{assignedDispatcherId === DEFAULT_DISPATCHER_ID ? 'Assign': 'Change' }</p>
              </>
            </Button>
          }
        >
          {
            tripMedium === "Motor" ? 
            <Riders/> : <Drivers/>
          }
        </Modal>
      </div>
      {assignedDispatcherId === DEFAULT_DISPATCHER_ID && 
      <div className="flex flex-col gap-1 items-center justify-center font-medium">
        <LiaUserSlashSolid className="text-4xl opacity-40"/>
        <p className="text-md">No {tripMedium === "Motor"? 'rider': 'driver'} assigned</p>
      </div>
      }
     {assignedDispatcherId !== "ff-12-53"  && 
      <div className="w-full flex flex-col items-start justify-between h-screen rounded-md bg-[#f7f7f7] dark:bg-secondary-dark p-3">
        <div className="flex w-full items-start justify-between text-sm">
          <div className="space-y-1">
            <ul>Name</ul>
            <ul>Phone</ul>
            <ul>{tripMedium === "Motor" ? "Motor" : "Car"}</ul>
            <ul>Number Plate</ul>
          </div>
          <div className="space-y-1 text-right font-semibold">
            <ul>
              {assignedDispatcherName}
            </ul>
            <ul>{dispatcher.phone_number}</ul>
            <ul className="line-clamp-1">{assignedDispatcherVehicle}</ul>
            <ul className="line-clamp-1">{assignedDispatcherPlate}</ul>
          </div>
        </div>
      </div>
}    </>
  );
}
