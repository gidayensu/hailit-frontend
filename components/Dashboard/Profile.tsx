"use client";
import EditCustomerProfile from "@/components/Form/EditCustomerProfile";
import { useCustomerProfile } from "@/components/Form/hooks/useCustomerProfile";
import { useLogout } from "@/components/Shared/hooks/useLogout";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";

export default function  DashboardProfile () {
  const {
    isSuccess,
    isLoading: formLoading,
    
  } = useCustomerProfile();

  const { handleLogOut } = useLogout();
  return (
    <section className="flex flex-col justify-center items-center lg:items-start lg:justify-start  gap-4">
      <div className="max-w-sm w-full">
        <EditCustomerProfile />
      </div>
      <Button
        type="submit"
        className="max-w-sm w-full h-14"
        form="customerProfileUpdate"
        variant={"outline"}
      >
        {formLoading ? <Loader /> : isSuccess ? "Saved" : "Save"}
      </Button>
      <span className="max-w-sm w-full lg:hidden flex items-center justify-center  ">
        <p>OR</p>
      </span>
      <Button
        className="max-w-sm w-full h-14 lg:hidden"
        onClick={handleLogOut}
      >
        Logout
      </Button>
      <div className="flex flex-col gap-2 w-full items-start justify-start"></div>
      {/* Form submit button placed here because the form is used at different places with different button position */}
    </section>
  );
};

