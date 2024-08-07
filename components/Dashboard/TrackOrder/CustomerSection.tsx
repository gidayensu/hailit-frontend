'use client'
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { extractShortDate } from "@/lib/utils";
import { useGetUser } from "../Users/hooks/useGetUser";
import { useGetTrip } from "./StatusSection/hooks/useGetTrip";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CustomerSection () {
    
  const { trip, } = useGetTrip();
    const {user, isLoading, error, handleSelectUser} = useGetUser(trip?.customer_id)
    
    
    return (
      <>
        <div className="flex justify-between">
          <div className="">
            <h3 className="font-medium">CUSTOMER</h3>
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
                  <p className="font-medium"> {user.first_name} </p>
                </ul>
                <ul className="w-full flex justify-between ">
                  <p> Last Name </p>
                  <p className="font-medium"> {user.last_name} </p>
                </ul>

                <ul className="w-full flex justify-between gap-2 ">
                  <p> Email </p>
                  <Link href={`mailto:${user.email}`} className="font-medium truncate underline hover:text-primary-color"> {user.email} </Link>
                </ul>
                <ul className="w-full flex justify-between ">
                  <p> Phone </p>
                  <Link href={`tel:${user.phone_number}`} className="font-medium truncate underline hover:text-primary-color"> {user.phone_number} </Link>
                </ul>
                <ul className="w-full flex justify-between mb-2 ">
                  <p> Date Joined </p>
                  <p className="font-medium">
                    
                    {extractShortDate(user.date_created)}
                  </p>
                </ul>
                <Separator />
                <ul className="w-full flex justify-between ">
                  <p className="font-bold"> Sender Contact </p>
                  <Link href={`tel:${trip?.sender_number}`} className="underline font-medium hover:text-primary-color">
                    
                    {trip?.sender_number}
                  </Link>
                </ul>
                <ul className="w-full flex justify-between ">
                <p className="font-bold "> Recipient Contact </p>
                  <Link href={`tel:${trip?.recipient_number}`} className="underline font-medium hover:text-primary-color">
                    
                    {trip?.recipient_number}
                  </Link>
                </ul>
                </div>
            </div>
          </div>
        )}
      </>
    );
}