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
import { extractDateWithDayFromDate } from "@/lib/utils";

import { useGetAllUsers } from "./hook/useGetAllUsers";
import Pagination from "@/components/Shared/Pagination/Pagination";

export function AllUsers() {
  const limit = 7;
  const [offset, setOffset] = useState<number> (limit);
  const { data, users, isLoading, error, total_number_of_pages } = useGetAllUsers({limit, offset});

  if (error) {
    return (
      <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center">
          
          Error occurred!...Our Fault
        </p>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col w-full mb-4  gap-2 p-4 rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
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
          {data && users.length && users &&
            users.map((user: any) => (
              <TableRow key={user.user_id}>
                <TableCell>
                  <Modal dialogTriggerElement={user.first_name} className="">
                    {user.first_name}
                  </Modal>
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
                  {extractDateWithDayFromDate(user.date_created)}
                </TableCell>

                <TableCell className="flex items-center justify-center">
                  {user.user_role != "admin" && (
                    <Modal
                      className=""
                      dialogTriggerElement={
                        <span className="text-decoration: underline">view</span>
                      }
                    >
                      <OrdersCard userData={user} />
                    </Modal>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
      <Pagination limit={limit} offset={offset} setOffset={setOffset} totalPages={total_number_of_pages}/>
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
  "Trips"
];
