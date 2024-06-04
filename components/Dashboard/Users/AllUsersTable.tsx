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

export function AllUsers() {
  const { users, isLoading, error } = useGetAllUsers();

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
    <div className="flex flex-col w-full   gap-2 p-4 h-full rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark dark:hover:border-slate-100 dark:text-slate-100  cursor-pointer">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Phone Number</TableHead>
            <TableHead>User Role</TableHead>

            <TableHead className="flex items-center justify-center">
              Onboard Status
            </TableHead>
            <TableHead className="w-[150px]">Date Joined</TableHead>
            <TableHead className="flex items-center justify-center">
              Trips
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <SkeletonTable rows={7} cells={8} />}
          {users &&
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
  );
}
