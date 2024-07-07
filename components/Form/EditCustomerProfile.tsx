"use client";
import { FormProvider } from "react-hook-form";
import FormField from "./FormField";
import { useCustomerProfile } from "./hooks/useCustomerProfile";

export default function EditCustomerProfile() {
  const {
    formMethods,
    handleSubmit,
    onCustomerFormSubmit,
    email,
    isError,
    chosenRole,
    first_name,
    last_name,
    phone_number,
    error
  } = useCustomerProfile();

   
  

  const inputAndLabeClass = "w-full max-w-sm items-center";
  const labelClass = "text-sm font-medium mb-1";

  return (
    <FormProvider {...formMethods}>
      <form
        className="w-full flex flex-col items-center justify-center gap-3 "
        id="customerProfileUpdate"
        onSubmit={handleSubmit(onCustomerFormSubmit)}
      >
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>First Name</h3>
          <FormField
            type="text"
            placeholder="First Name"
            className="h-14 "
            name="first_name"
            defaultValue={first_name || ""}
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Last Name</h3>
          <FormField
            type="text"
            placeholder="Last Name"
            className="h-14"
            name="last_name"
            defaultValue={last_name || ''}
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
            defaultValue={email}
            disabled={email }
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Phone Number</h3>
          <FormField
            type="text"
            placeholder="0240 000 000"
            className="h-14"
            name="phone_number"
            defaultValue={phone_number || ""}
          />
        </div>


        {chosenRole === "Rider" && (
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
      </form>
    </FormProvider>
  );
}
