'use client'
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LuCheckCircle2, LuXCircle } from "react-icons/lu";
import SkeletonTable from "../SkeletonTable";
import OrdersCard from "./OrdersCard";
import { Modal } from "@/components/Shared/Modal";
import { extractShortDate, extractBeforeComma } from "@/lib/utils";


import { useGetAllUsers } from "./hooks/useGetAllUsers";
import Pagination from "@/components/Shared/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { RiSteering2Line } from "react-icons/ri";
import { useUserProfile } from "./hooks/useUserProfile";

export default function AllUsersTable() {
  
  const [page, setPage] = useState<number> (1);

  

  const { data, usersData, isLoading, error, total_number_of_pages, handleSetSelectedUser, handleRidersSection, handleDriversSection } = useGetAllUsers(page);

  if (error) {
    return (
      <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center">
          
          Error occurred!
        </p>
      </div>
    );
  }

  return (
    <>
    <section className="lg:hidden flex gap-2">
                <Button
                  variant={"empty"}
                  className="space-x-1 bg-black hover:bg-secondary-dark hover:dark:bg-white text-white  dark:border  dark:text-primary-dark dark:bg-slate-50 mb-5"
                  onClick={handleRidersSection}
                >
                  <MdOutlineSportsMotorsports className="text-xl -scale-x-100" />
                  <p>Riders</p>
                </Button>

                <Button
                  variant={"empty"}
                  className="space-x-1 bg-black hover:bg-secondary-dark hover:dark:bg-white text-white  dark:border  dark:text-primary-dark dark:bg-slate-50"
                  onClick={handleDriversSection}
                >
                  <RiSteering2Line className="text-xl " />
                  <p>Drivers</p>
                </Button>
              </section>
    <div className="flex flex-col w-full mb-4  gap-2 p-4 rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {
              tableHeadings.map((tableHead, index)=> 
                <TableHead 
                  key={index}
                  className={tableHead === "Onboard Status" || tableHead === "Trips" ? "flex items-center justify-center": ''}
                
                >
                  {tableHead}
                  </TableHead>
              
              )
            }
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <SkeletonTable rows={7} cells={8} />}
          {data && usersData?.length && usersData &&
            usersData.map((user: any) => (
              <TableRow key={user.user_id} 
              onClick={()=>handleSetSelectedUser(user.user_id)}
              >
                <TableCell>
                  
                    {user.first_name}
                </TableCell>
                <TableCell>{user.last_name}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.user_role}</TableCell>
                <TableCell className="flex items-center justify-center">
                  <div className={` text-white text-[12px]  rounded-full`}>
                    {user.onboard ? (
                      <LuCheckCircle2 className="text-green-500 text-2xl" />
                    ) : (
                      <LuXCircle className="text-red-500 text-2xl" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="w-[100px]">
                  {extractShortDate(user.date_created)}
                </TableCell>

                {/* <TableCell className="flex items-center justify-center">
                  {user.user_role != "Admin" && (
                    <Modal
                      className=""
                      dialogTriggerElement={
                        <span className="text-decoration: underline">view</span>
                      }
                    >
                      <OrdersCard userId={user.user_id} />
                    </Modal>
                  )}
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
      <Pagination setPage={setPage} totalPages={total_number_of_pages} storageKey="AllUsers"/>
    </>
  );
}

const tableHeadings = [
  "First Name",
  "Last Name",
  "Email",
  "Phone Number",
  "User Role",
  "Onboard Status",
  "Date Joined",
  
];
