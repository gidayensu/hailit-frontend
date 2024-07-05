"use client";
import FormField from "@/components/Form/FormField";
import MapModal from "@/components/Maps/MapModal";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormProvider } from "react-hook-form";
import { useEditDispatcher } from "./hooks/useEditDispatcher";

import DashboardModal from "../../DashboardModal";

export default function EditDispatcher({dispatcher, handleGoBack}:{dispatcher:any, handleGoBack: ()=>void}) {
  
  const {
    formMethods,
    handleSubmit,
    onCustomerFormSubmit,
    isLoading,
    isSuccess,
    error,
    handleAvailable,
    modalRef,
    available,
    setAvailable,
    closeModal,
  } = useEditDispatcher(dispatcher);
  
  
  

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
            defaultValue={dispatcher?.first_name || ""}
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Last Name</h3>
          <FormField
            type="text"
            placeholder="Last Name"
            className="h-14"
            name="last_name"
            defaultValue={dispatcher?.last_name || ''}
          />
        </div>

        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Email</h3>
          <FormField
            type="email"
            placeholder="email@example.com"
            className="h-14"
            // defaultValue={email}
            name="email"
            defaultValue={dispatcher?.email}
            disabled={dispatcher?.email }
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Phone Number</h3>
          <FormField
            type="text"
            placeholder="0240 000 000"
            className="h-14"
            name="phone_number"
            defaultValue={dispatcher?.phone_number || ""}
          />
        </div>
          <div className="flex gap-3 text-sm font-semibold mt-3 w-full max-w-sm justify-between border rounded-xl h-14 items-center p-2 border-slate-400 dark:border-opacity-20">
            <p>Available</p>
          <Switch checked={available} onCheckedChange={handleAvailable}  />
          </div>
        {dispatcher?.user_role === "rider" || dispatcher?.user_role === "driver" && (
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>License Number</h3>
            <FormField
              type="text"
              placeholder="License Number"
              className="h-14"
              name="license_number"
              />
          </div>
        )}
        {/* If "'data' in error " is not used, there would be a Type Error. Same with use just "error" and not "error as any" */}
              {error && ('data' in error) && (
         <p className="text-red-500">{`${JSON.stringify((error as any).data.error)}`}</p>
      )}

      <Button className="max-w-sm w-full" type="submit" form="edit user" disabled={isLoading}> {isLoading ? <Loader/> : 'Save'} </Button>
      
      </form>
      <Button className="max-w-sm w-full" variant={'empty'} onClick={handleGoBack} disabled={isLoading}  > Cancel </Button>
    </FormProvider>
    <DashboardModal closeModal={closeModal}  isSuccess={isSuccess} error = {error} modalRef={modalRef} info={error ? 'User not updated': 'User details saved'}/>
    </>
  );
}
