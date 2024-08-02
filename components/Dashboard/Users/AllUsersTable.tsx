'use client'
import ItemsCount from "@/components/Shared/Pagination/ItemsCount";
import Pagination from "@/components/Shared/Pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAppSelector } from "@/lib/store/hooks";
import { extractShortDate } from "@/lib/utils";
import { LuCheckCircle2, LuXCircle } from "react-icons/lu";
import DashboardTableItemLoader from "../DashboardTableItemLoader";
import { TableType, useGetTableData } from "../hooks/useGetTableData";
import SkeletonTable from "../SkeletonTable";
import SearchTable from "../TableComponents/SearchTable";
import TablesHeadings from "../TableComponents/TablesHeadings";
import { User, useUsersTable } from "./hooks/useUsersTable";

export default function AllUsersTable() {
  const {handleUserDetails,
    page,
    setPage,
    userLoading} = useUsersTable();

  
  const {selectedUserId} = useAppSelector(state=>state.dashboard)
  const {
    handleSort,
    sortDetails,
    dataLoading:usersLoading,
    data,
    error,
    total_number_of_pages,
    total_items,
    handleSearch:handleUserSearch,
    searchRef:userSearchRef,
    status,
    isSearch
    
  } = useGetTableData({table:TableType.UsersTable, page, initialColumn:"First Name"});
  
  const users = data?.users;
  

  return (
    <>
    <div className="w-full flex items-end justify-end">

      <SearchTable
        ref={userSearchRef}
        handleSearch={handleUserSearch}
        status={status}
      />
    </div>
      
      <div className="flex flex-col w-full mb-4  gap-2 p-4 rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
        <Table className="w-full">
          <TableHeader>
          <TablesHeadings handleSort={handleSort} sortDetails={sortDetails} tableHeadings={tableHeadings} />
            
          </TableHeader>
          <TableBody>
            {usersLoading && <SkeletonTable rows={7} cells={7} />}
            {error && (
              <div>
                <p className="text-3xl font-bold flex flex-col items-center justify-center">
                  Error occurred!
                </p>
              </div>
            )}
            {
              users?.length &&
              users && !usersLoading && !error &&
              users.map((user: User) => (
                <>
                  {userLoading && selectedUserId === user.user_id && (
                    <DashboardTableItemLoader />
                  )}
                  <TableRow
                    key={user.user_id}
                    onClick={() => handleUserDetails(user.user_id)}
                    className={`cursor-pointer ${
                      userLoading && selectedUserId === user.user_id
                        ? "opacity-20"
                        : ""
                    } `}
                  >
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>

                    <TableCell>{user.phone_number}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell>{user.user_role}</TableCell>
                    <TableCell className="flex items-center justify-center ">
                      <div className={` text-white text-[12px] rounded-full`}>
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
 
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </div>
      {users && (
        <ItemsCount
          currentItemsCount={users.length}
          item="Users"
          page={page}
          total_items={total_items}
          total_number_of_pages={total_number_of_pages}
        />
      )}
      <Pagination
        setPage={setPage}
        totalPages={total_number_of_pages}
        storageKey="AllUsers"
        isSearch = {isSearch}
      />
    </>
  );
}

const tableHeadings = [
  "First Name",
  "Last Name",
  "Phone Number",
  "Email",
  "User Role",
  "Onboard Status",
  "Date Joined",
];

