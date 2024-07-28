"use client";
import DeleteModalCard from "@/components/Dashboard/TrackOrder/DeleteModalCard";
import ErrorComponent from "@/components/Shared/ErrorComponent";
import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import EditVehicle from "./EditVehicle";
import Image from "next/image";
import noImage from "../../../public/images/no-image.jpg";
import { useDeleteVehicle } from "./hooks/useDeleteVehicle";
import { VehicleType } from "./AllVehiclesTable";
import { useGetVehicle } from "./hooks/useGetVehicle";
import { useState } from "react";

export interface Vehicles {
  vehicle_id: string;
  vehicle_name: string;
  vehicle_model: string;
  plate_number: string;
  vehicle_type: VehicleType;
  insurance_details: string;
  road_worthy: string;
  available: boolean;
}

export default function Vehicle() {
  const {
    vehicle,
    error: vehicleError,
    isLoading: vehicleLoading,
  } = useGetVehicle();
  const { isLoading, error, isSuccess, handleDeleteVehicle } =
    useDeleteVehicle();


    const [editingVehicle, setEditingVehicle] = useState<boolean>(false);

  if (vehicleLoading ) {
    return (
      <Container className="flex items-start justify-start p-4  rounded-xl w-full max-w-lg h-80">
        {/* TITLE SECTION */}
        <div className="flex flex-col items-start justify-start w-full p-2 gap-2">
          <Skeleton className="rounded-lg h-8 w-full" />
          <Skeleton className="rounded-lg  h-8 w-56" />
          <Skeleton className="rounded-xl  h-52 w-full" />
        </div>
      </Container>
    );
  }
  if (!vehicleLoading && vehicleError) {
    return (
      <div className="flex items-center justify-center p-4  rounded-xl w-full max-w-lg h-80">
        <ErrorComponent
          errorCode={404}
          errorMessage="Vehicle details was not found"
          url="/dashboard"
        />
      </div>
    );
  }
  if(!editingVehicle) {

    return (
      <Container className="flex items-start justify-start p-4  rounded-xl w-full max-w-lg h-96">
        {/* TITLE SECTION */}
        <div className="flex flex-col items-start justify-evenly w-1/2  h-full ">
          <div className="text-secondary-color flex items-center gap-2">
            
            <p className="font-bold ">{vehicle?.vehicle_type.toUpperCase()}</p>
          </div>
          <p className="font-bold text-xl">{vehicle?.vehicle_name}</p>
          <Separator className="text-secondary-dark dark:text-slate-50 dark:opacity-20" />
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-bold text-sm">Model</p>
              <p className="text-sm">{vehicle?.vehicle_model}</p>
            </div>
            <div>
              <p className="font-bold text-sm">Number Plate</p>
              <p className="text-sm">{vehicle?.plate_number}</p>
            </div>
            <div>
              <p className="font-bold text-sm">Insurance Number</p>
              <p className="text-sm">{vehicle?.insurance_details}</p>
            </div>
            <div>
              <p className="font-bold text-sm">Available</p>
              <p className="text-sm">{vehicle?.available ? 'Yes': 'No'}</p>
            </div>
            
          </div>
        </div>
        <div className="w-1/2 rounded-xl p-4 flex flex-col gap-1">
          <Image src={noImage} alt="no image" className="rounded-xl" />
          <div className="flex flex-col md:items-center justify-center md:flex-row items-start">
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
                itemId={vehicle?.vehicle_name}
                item="Vehicle"
                deleteFn={() => handleDeleteVehicle(vehicle?.vehicle_id)}
                error={error}
                isSuccess={isSuccess}
                loading={isLoading}
              />
            </Modal>
            <p className="hidden md:block">|</p>
            <Button
              variant={"empty"}
              className="dark:text-slate-50  -mt-3 md:-mt-0  hover:text-primary-color dark:hover:text-primary-color "
              onClick={()=>setEditingVehicle(true)}
            >
              Edit Vehicle
            </Button>
          </div>
        </div>
      </Container>
    );
  }
  if(editingVehicle) {
    return (
      <EditVehicle handleGoBack= {()=>setEditingVehicle(false)}/>
    )
  }
}
