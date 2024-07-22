"use client";
import FormField from "@/components/Form/FormField";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { GoCheck } from "react-icons/go";
import DashboardModal from "@/components/Dashboard/DashboardModal";
import { VehicleType } from "./hooks/useGetVehicles";
import { Vehicle } from "./hooks/useGetVehicles";
import { useEditVehicle,  } from "./hooks/useEditVehicle";

export default function EditVehicle({vehicle, handleGoBack}:{vehicle:Vehicle, handleGoBack: ()=>void}) {
  
  const {
    formMethods,
    handleSubmit,
    onCustomerFormSubmit,
    isLoading,
    isSuccess,
    error,
    available,
    handleAvailable,
    modalRef,
    closeModal,
    handleVehicleTypeSelection,
    vehicleType
  } = useEditVehicle(vehicle);
  
  const [selectingUserRole, setSelectingUserRole] = useState<boolean>(false);
  
  const handleSelectingUserRole = (vehicleType?:VehicleType)=> {
    setSelectingUserRole(()=>!selectingUserRole)
    vehicleType? handleVehicleTypeSelection(vehicleType): ''
  }

  const inputAndLabeClass = "w-full max-w-sm items-center";
  const labelClass = "text-sm font-medium mb-1";

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          className="w-full flex flex-col items-start justify-start gap-3 "
          id="edit vehicle"
          onSubmit={handleSubmit(onCustomerFormSubmit)}
        >
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>Vehicle Name</h3>
            <FormField
              type="text"
              placeholder="Vehicle Name"
              className="h-14 "
              name="vehicle_name"
              defaultValue={vehicle?.vehicle_name}
            />
          </div>
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>Vehicle Model</h3>
            <FormField
              type="text"
              placeholder="Last Name"
              className="h-14"
              name="vehicle_model"
              defaultValue={vehicle.vehicle_model}
            />
          </div>

          
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>Insurance Number</h3>
            <FormField
              type="text"
              placeholder="Plate Number"
              className="h-14"
              name="insurance_details"
              defaultValue={vehicle?.insurance_details}
            />
          </div>
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>Plate Number</h3>
            <FormField
              type="text"
              placeholder="Plate Number"
              className="h-14"
              name="plate_number"
              defaultValue={vehicle?.plate_number}
            />
          </div>
          <div className={`${inputAndLabeClass} relative`}>
            <h3 className={labelClass}>Vehicle Type</h3>
            <div
              className="flex flex-col justify-center text-sm font-semibold mt-3 w-full max-w-sm  border rounded-xl h-14 p-2  border-slate-400 dark:border-opacity-20 relative"
              onClick={() => handleSelectingUserRole()}
            >
              <p>{vehicleType}</p>
            </div>
            {selectingUserRole && (
              <div className="flex flex-col gap-2 items-start justify-start absolute max-w-sm w-40 border rounded-xl max-h-24 text-sm p-2 border-slate-400 dark:border-opacity-20 z-10 bg-white mt-1 dark:bg-primary-dark cursor-pointer ">
                <SelectVehicleType
                  handleVehicleSelection={handleSelectingUserRole}
                  option="car"
                  vehicleType={vehicleType}
                />
                <SelectVehicleType
                  handleVehicleSelection={handleSelectingUserRole}
                  option="motor"
                  vehicleType={vehicleType}
                />
                <SelectVehicleType
                  handleVehicleSelection={handleSelectingUserRole}
                  option="truck"
                  vehicleType={vehicleType}
                />
                
              </div>
            )}
          </div>
          <div className="flex gap-3 text-sm font-semibold mt-3 w-full max-w-sm justify-between border rounded-xl h-14 items-center p-2 border-slate-400 dark:border-opacity-20">
            <p>Available</p>
            <Switch checked={available} onCheckedChange={handleAvailable} />
          </div>

          {/* If "'data' in error " is not used, there would be a Type Error. Same with use just "error" and not "error as any" */}
          {error && "data" in error && (
            <p className="text-red-500">{`${JSON.stringify(
              (error as any).data.error
            )}`}</p>
          )}

          <Button
            className="max-w-sm w-full"
            type="submit"
            form="edit vehicle"
            disabled={isLoading}
          >
            
            {isLoading ? <Loader /> : "Save"}
          </Button>
        </form>
        <Button
          className="max-w-sm w-full"
          variant={"empty"}
          onClick={handleGoBack}
          disabled={isLoading}
        >
          
          Cancel
        </Button>
      </FormProvider>
      <DashboardModal
        closeModal={closeModal}
        isSuccess={isSuccess}
        error={error}
        modalRef={modalRef}
        info={error ? "Vehicle not updated" : "Vehicle details saved"}
      />
    </>
  );
}

const SelectVehicleType = ({handleVehicleSelection, vehicleType, option}:{handleVehicleSelection: (vehicleType:VehicleType)=>void, vehicleType:VehicleType, option:VehicleType})=> {
  return (
              <div onClick={()=>handleVehicleSelection(option)} className="flex justify-between items-center gap-2">
               <p className="hover:text-primary-color"> {option} </p>  {vehicleType === option && <GoCheck />}
                </div>                 
    
  )
}