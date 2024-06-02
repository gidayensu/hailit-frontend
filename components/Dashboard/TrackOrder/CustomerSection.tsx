'use client'
import { Button } from "@/components/ui/button"
import { LuUser } from "react-icons/lu"
import { useGetUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { Skeleton } from "@/components/ui/skeleton";
export default function CustomerSection ({customerId}: {customerId:string}) {
    const {data, isLoading, error} = useGetUserQuery(`${customerId}`);
    let user =[];
    if(data) {
        user = data.user;
    }
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
            >
              <LuUser className="text-xl " />
              <p>View</p>
            </Button>
          </div>
          {
            isLoading && <div className="space-y-1">
                <Skeleton className="w-32"/>
                <Skeleton className="w-32"/>
                <Skeleton className="w-32"/>
            </div>
          } {
          data && user &&  
          <div className="w-full flex flex-col items-start justify-between h-screen rounded-md bg-[#f7f7f7] dark:bg-secondary-dark p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="space-y-1">
                <ul>Name</ul>
                <ul>Email</ul>
                <ul>Phone</ul>
                
                
              </div>
              <div className="space-y-1 text-right font-semibold">
                <ul>{user.first_name} {user.last_name}</ul>
                <ul>{user.email}</ul>
                <ul>{user.phone_number}</ul>
                
                
              </div>
            </div>
          </div>
          }
          </>
    )
}