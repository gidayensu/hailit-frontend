'use client'
import { Button } from "@/components/ui/button";
import Loader from "@/components/Shared/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { extractShortDate } from "@/lib/utils";
import { useGetUser } from "../Users/hook/useGetUser";
export default function CustomerSection ({customerId}: {customerId:string}) {
    const {user, isLoading, error, handleSelectUser} = useGetUser(customerId)
    
    
    return(
        <>
        <div className="flex justify-between">
            <div className="">
              <h3 className="font-bold">CLIENT</h3>
              <h3 className="text-[12px] text-slate-400 -mt-1">
                Details
              </h3>
            </div>
            <Button
              variant={"empty"}
              className="space-x-1 bg-primary-color hover:bg-primary-medium text-white  hover:dark:bg-slate-100 dark:text-secondary-dark dark:bg-white"
              onClick={handleSelectUser}
            >
              
              <p>View</p>
            </Button>
          </div>
          {
            isLoading && <div className="space-y-1">
              <Loader color="primary"/>
                
            </div>
          } {
           user &&  
          <div className="w-full flex flex-col items-start justify-between h-screen rounded-md bg-[#f7f7f7] dark:bg-secondary-dark p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="space-y-1">
                <ul>First Name</ul>
                <ul>Last Name</ul>
                <ul>Email</ul>
                <ul>Phone</ul>
                <ul>Date Joined</ul>
                
                
              </div>
              <div className="space-y-1 text-right font-semibold">
                <ul>{user.first_name}</ul>
                <ul>{user.last_name}</ul>
                <ul>{user.email}</ul>
                <ul>{user.phone_number}</ul>
                <ul>{extractShortDate(user.date_created)}</ul>
                
                
              </div>
            </div>
          </div>
          }
          </>
    )
}