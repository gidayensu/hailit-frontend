'use client'
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { extractShortDate } from "@/lib/utils";
import { useGetUser } from "../Users/hooks/useGetUser";
export default function CustomerSection ({customerId}: {customerId:string}) {
    const {user, isLoading, error, handleSelectUser} = useGetUser(customerId)
    
    
    return (
      <>
        <div className="flex justify-between">
          <div className="">
            <h3 className="font-bold">CLIENT</h3>
            <h3 className="text-[12px] text-slate-400 -mt-1">Details</h3>
          </div>
          <Button
            variant={"empty"}
            className="space-x-1 bg-primary-color hover:bg-primary-medium text-white  hover:dark:bg-slate-100 dark:text-secondary-dark dark:bg-white"
            onClick={handleSelectUser}
          >
            <p>View</p>
          </Button>
        </div>
        {isLoading && (
          <div className="space-y-1">
            <Loader color="text-primary-color" />
          </div>
        )}
        {error && (
          <div className="space-y-1">
            <div>
              <p>Error Occurred</p>
            </div>
          </div>
        )}

        {user && (
          <div className="w-full flex flex-col items-start justify-between h-full rounded-md bg-[#f7f7f7] dark:bg-secondary-dark p-3 ">
            <div className="flex w-full items-start justify-between text-sm ">
              <div className="space-y-1 w-full">
                <ul className="w-full flex justify-between  ">
                  <p> First Name </p>
                  <p className="font-bold"> {user.first_name} </p>
                </ul>
                <ul className="w-full flex justify-between ">
                  <p> Last Name </p>
                  <p className="font-bold"> {user.last_name} </p>
                </ul>

                <ul className="w-full flex justify-between gap-2 ">
                  <p> Email </p>
                  <p className="font-bold truncate "> {user.email} </p>
                </ul>
                <ul className="w-full flex justify-between ">
                  <p> Phone </p>
                  <p className="font-bold"> {user.phone_number} </p>
                </ul>
                <ul className="w-full flex justify-between ">
                  <p> Date Joined </p>
                  <p className="font-bold">
                    
                    {extractShortDate(user.date_created)}
                  </p>
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
}