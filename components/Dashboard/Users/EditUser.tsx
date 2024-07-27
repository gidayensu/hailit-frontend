"use client";
import FormField from "@/components/Form/FormField";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UserRole } from "@/lib/store/slice/userSlice";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { GoCheck } from "react-icons/go";
import SecondaryModal from "../../Shared/SecondaryModal";
import { useEditUser } from "./hooks/useEditUser";
import { User } from "./hooks/useUsersTable";

export default function EditUser({selectedUser, handleGoBack}:{selectedUser:User, handleGoBack: ()=>void}) {
  
  const {
    formMethods,
    handleSubmit,
    onCustomerFormSubmit,
    isLoading,
    isSuccess,
    error,
    onboard,
    handleOnboard,
    edituserModalRef,
    closeUserModal,
    handleUserRoleSelection,
    userRole
  } = useEditUser(selectedUser);
  
  const [selectingUserRole, setSelectingUserRole] = useState<boolean>(false);
  
  const handleSelectingUserRole = (userRole?:UserRole)=> {
    setSelectingUserRole(()=>!selectingUserRole)
    userRole? handleUserRoleSelection(userRole): ''
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
            defaultValue={selectedUser?.first_name || ""}
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Last Name</h3>
          <FormField
            type="text"
            placeholder="Last Name"
            className="h-14"
            name="last_name"
            defaultValue={selectedUser?.last_name || ''}
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
            defaultValue={selectedUser?.email}
            disabled={selectedUser?.email }
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Phone Number</h3>
          <FormField
            type="text"
            placeholder="0240 000 000"
            className="h-14"
            name="phone_number"
            defaultValue={selectedUser?.phone_number || ""}
          />
        </div>
        <div className={`${inputAndLabeClass} relative`}>
          <h3 className={labelClass}>User Role</h3>
          <div className="flex flex-col justify-center text-sm font-semibold mt-3 w-full max-w-sm  border rounded-xl h-14 p-2  border-slate-400 dark:border-opacity-20 relative" onClick={()=>handleSelectingUserRole()}>
          <p>{userRole}</p>
          
          </div>
          {selectingUserRole &&
              <div className="flex flex-col gap-2 items-start justify-start absolute max-w-sm w-40 border rounded-xl max-h-24 text-sm p-2 border-slate-400 dark:border-opacity-20 z-10 bg-white mt-1 dark:bg-primary-dark cursor-pointer ">
              <SelectUser handleUserRoleSelection={handleSelectingUserRole} option="Customer" userRole={userRole}/>
              <SelectUser handleUserRoleSelection={handleSelectingUserRole} option="Rider" userRole={userRole}/>
              <SelectUser handleUserRoleSelection={handleSelectingUserRole} option="Driver" userRole={userRole}/>
              <SelectUser handleUserRoleSelection={handleSelectingUserRole} option="Customer" userRole={userRole}/>
                  
              </div>
          }
        </div>
          <div className="flex gap-3 text-sm font-semibold mt-3 w-full max-w-sm justify-between border rounded-xl h-14 items-center p-2 border-slate-400 dark:border-opacity-20">
            <p>Onboard</p>
          <Switch checked={onboard} onCheckedChange={handleOnboard} />
          </div>
          
        {selectedUser?.user_role === "Rider" || selectedUser?.user_role === "Driver" && (
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
    <SecondaryModal closeModal={closeUserModal}  isSuccess={isSuccess} error = {error} modalRef={edituserModalRef} info={error ? 'User not updated': 'User details saved'}/>
    </>
  );
}

const SelectUser = ({handleUserRoleSelection, userRole, option}:{handleUserRoleSelection: (userRole:UserRole)=>void, userRole:UserRole, option:UserRole})=> {
  return (
              <div onClick={()=>handleUserRoleSelection(option)} className="flex justify-between items-center gap-2">
               <p className="hover:text-primary-color"> {option} </p>  {userRole === option && <GoCheck />}
                </div>                 
    
  )
}