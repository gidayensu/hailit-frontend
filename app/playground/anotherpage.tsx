"use client";
import FormField from "@/components/Form/FormField";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { GoCheck } from "react-icons/go";
import DashboardModal from "@/components/Dashboard/DashboardModal";
import { Vehicles } from "./page";
import { useEditVehicle, VehicleType } from "./useEditVehicle";

export default function EditUser({vehicle, handleGoBack}:{vehicle:Vehicles, handleGoBack: ()=>void}) {
  
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
          id="edit user"
          onSubmit={handleSubmit(onCustomerFormSubmit)}
        >
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>First Name</h3>
            <FormField
              type="text"
              placeholder="First Name"
              className="h-14 "
              name="first_name"
              defaultValue={""}
            />
          </div>
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>Last Name</h3>
            <FormField
              type="text"
              placeholder="Last Name"
              className="h-14"
              name="last_name"
              defaultValue={""}
            />
          </div>

          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>Email</h3>
            <FormField
              type="email"
              placeholder="email@example.com"
              className="h-14"
              name="email"
              defaultValue={"em"}
            />
          </div>
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>Phone Number</h3>
            <FormField
              type="text"
              placeholder="0240 000 000"
              className="h-14"
              name="phone_number"
              defaultValue={""}
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
                  option="Car"
                  vehicleType={vehicleType}
                />
                <SelectVehicleType
                  handleVehicleSelection={handleSelectingUserRole}
                  option="Motor"
                  vehicleType={vehicleType}
                />
                <SelectVehicleType
                  handleVehicleSelection={handleSelectingUserRole}
                  option="Truck"
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
            form="edit user"
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
        info={error ? "User not updated" : "User details saved"}
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