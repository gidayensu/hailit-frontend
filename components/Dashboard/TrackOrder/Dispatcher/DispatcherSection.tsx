"use client";
import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LiaUserSlashSolid } from "react-icons/lia";
import { useGetTrip } from "../StatusSection/hooks/useGetTrip";
import { useViewDispatcher } from "../StatusSection/hooks/useViewDispatcher";
import Drivers from "./AssignDrivers";
import Riders from "./AssignRiders";
export const DEFAULT_DISPATCHER_ID = "ff-12-53";

export default function DispatcherSection() {
  
  const { trip, dispatcher } = useGetTrip();
  const { handleViewDispatcher } = useViewDispatcher();

  

  return (
    <>
      <div className="flex justify-between">
        <div className="">
          <h3 className="font-bold">
            {trip?.trip_medium === "Motor" ? "RIDER" : "DRIVER"}
          </h3>
          <h3 className="text-[12px] text-slate-400 -mt-1">Details</h3>
        </div>

        <Modal
          className="w-full flex items-start justify-end"
          dialogTriggerElement={
            <Button
              variant={"empty"}
              className="space-x-1 bg-primary-color hover:bg-primary-medium text-white  hover:dark:bg-slate-100 dark:text-secondary-dark dark:bg-white"
            >
                <p>
                  {dispatcher?.dispatcher_id === DEFAULT_DISPATCHER_ID
                    ? "Assign"
                    : "Change"}
                </p>
              
            </Button>
          }
        >
          {trip?.trip_medium === "Motor" ? <Riders /> : <Drivers />}
        </Modal>
      </div>
      {dispatcher?.dispatcher_id === DEFAULT_DISPATCHER_ID ||
        (!dispatcher?.dispatcher_id && (
          <div className="flex flex-col gap-1 items-center justify-center font-medium">
            <LiaUserSlashSolid className="text-4xl opacity-40" />
            <p className="text-md">
              No {trip?.trip_medium === "Motor" ? "Rider" : "Driver"} assigned
            </p>
          </div>
        ))}
      {dispatcher?.dispatcher_id &&
        dispatcher?.dispatcher_id !== DEFAULT_DISPATCHER_ID && (
          <div className="w-full flex flex-col items-start justify-between h-screen rounded-md bg-[#f7f7f7] dark:bg-secondary-dark p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="space-y-1">
                <ul>Name</ul>
                <ul>Phone</ul>
                <ul>{trip?.trip_medium === "Motor" ? "Motor" : "Car"}</ul>
                <ul>Number Plate</ul>
              </div>
              <div className="space-y-1 text-right font-semibold">
                <ul onClick={handleViewDispatcher}>
                  <span className="underline hover:text-primary-color cursor-pointer">
                    
                    {dispatcher?.first_name} {dispatcher?.last_name}
                  </span>
                </ul>

                <ul>
                  <span>
                    
                    <Link
                      className="underline hover:text-primary-color cursor-pointer"
                      href="tel:{selectedUser?.phone_number}"
                    >
                      
                      {dispatcher?.phone_number}
                    </Link>
                  </span>
                </ul>
                <ul className="line-clamp-1">
                  {dispatcher?.vehicle?.vehicle_name}
                </ul>
                <ul className="line-clamp-1">
                  {dispatcher?.vehicle?.plate_number}
                </ul>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
