"use client";
import { VehicleType } from "./useEditVehicle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { RiMotorbikeFill } from "react-icons/ri";
import DeleteModalCard from "@/components/Dashboard/TrackOrder/DeleteModalCard";
import { Modal } from "@/components/Shared/Modal";
import Container from "@/components/ui/container";
import noImage from '../../public/images/no-image.jpg';
import { useDeleteVehicle } from "./useDeleteVehicle";

export interface Vehicles {
  vehicle_id: string,
  vehicle_name: string, 
  vehicle_model: string, 
  plate_number: string,
  vehicle_type: VehicleType,
  insurance_details: string,
  road_worthy: string,
  available: boolean
}


export default function Vehicle() {

  return (
    <Container className="flex items-start justify-start p-4  rounded-xl w-full max-w-lg h-72">
      {/* TITLE SECTION */}
      <div className="flex flex-col items-start justify-start w-1/2">
        <div className="text-secondary-color flex items-center gap-2">
            <RiMotorbikeFill className="text-xl"/>
          <p className="font-bold ">
                Motor
          </p>

        </div>
          <p className="font-bold text-xl">
                Rashboard Vehicle
          </p>
            <Separator className="text-secondary-dark dark:text-slate-50 dark:opacity-20 my-3"/>
            <div className="flex flex-col gap-2">

          <div>
            <p className="font-bold text-[14px]">Model</p>
            <p className="text-[12px]">Model AxY</p>
          </div>
          <div>
            <p className="font-bold text-[14px]">Insurance Number</p>
            <p className="text-[12px]">Model AxY</p>
          </div>
          <div>
            <p className="font-bold text-[14px]">Available</p>
            <p className="text-[12px]">Yes</p>
          </div>
          <div>
            <p className="font-bold text-[14px]">Assigned To</p>
            <p className="text-[12px]">Yaw Asamoah

            </p>
          </div>
            </div>
      </div>
      <div className="w-1/2 rounded-xl p-4 flex flex-col gap-1">
          <Image src={noImage} alt="no image" className="rounded-xl"/>
            <div className="flex items-center justify-center">

          <Modal
            dialogTriggerElement={
              <Button
                variant={"empty"}
                className="text-red-500  hover:text-red-700"
              >
                Delete Vehicle
              </Button>
            }

          >
            <DeleteModalCard
              itemId="{Motor}"
              item="Vehicle"
              deleteFn={()=>useDeleteVehicle()}
              error={''}
              isSuccess={false}
              loading={false}
            />
          </Modal>          
          <p>|</p>
          <Button
                variant={"empty"}
                className="dark:text-slate-50    hover:text-gray-700 dark:hover-text-gray-400"
              >
                Edit Vehicle
              </Button>
            </div>
      </div>
    
    </Container>
  );
}
