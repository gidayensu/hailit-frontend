import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";
import SkeletonTable from "../SkeletonTable";
import OrdersCard from "./OrdersCard";
import { IoEyeOutline } from "react-icons/io5";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { extractDateWithDayFromDate } from "@/lib/utils";
import { Modal } from "@/components/Shared/Modal";


export function AllUsers() {

    const {data, isLoading, error} = useGetAllUsersQuery(`users?limit=7`);
    
    let users = [];
    if (data) {
      users = data.users;
    }

    if (error) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!...Our Fault</p>
        <p>We are fixing it</p>
      </div>
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
            <TableHead >User Role</TableHead>
            
            <TableHead >Onboard Status</TableHead>
            <TableHead className="w-[150px]">Date Joined</TableHead>
            <TableHead >Trips</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            isLoading && <SkeletonTable rows={7} cells={8}/>
          }
          {data && users.map((user:any) => (
            
            <TableRow key={user.user_id} >
              
              
              <TableCell>
                <Modal dialogTriggerElement={user.first_name} className=''>

                {user.first_name}
                </Modal>
                </TableCell>
              <TableCell>{user.last_name}</TableCell>
              
              <TableCell>{user.email}</TableCell>
              
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>{user.user_role}</TableCell>
              <TableCell className="flex items-center justify-center" >
                <div className={` h-4 w-4 text-white text-[12px] ${user.onboard ? 'bg-green-600 ': 'bg-red-500 '} rounded-full`}>
                    
                </div>
                </TableCell>
              <TableCell className="w-[100px]">{extractDateWithDayFromDate(user.date_created)} </TableCell>
              
              
                <TableCell className="flex items-center justify-center">
                  
                  {user.user_role != 'admin' &&
                    <Modal className=""  dialogTriggerElement={<IoEyeOutline className="text-xl"/>} >
                  <OrdersCard userData={user}/>
                  </Modal>

                  }
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  
  