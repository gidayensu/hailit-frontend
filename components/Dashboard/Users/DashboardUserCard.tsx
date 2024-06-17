import { Modal } from "@/components/Shared/Modal";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import DeleteModalCard from "../TrackOrder/DeleteModalCard";
import { User } from "./hook/useGetAllUsers";
export default function DashboardUserCard ({selectedUser}: {selectedUser:User}) {
    return (
        <Container className="flex gap-2 h-80 w-full rounded-xl flex-col items-center justify-start">
          <div className=" flex font-bold text-xl items-center justify-center text-white dark:text-secondary-dark rounded-full h-24 w-24 bg-primary-color dark:bg-white mt-4">
            <p>
              {selectedUser?.first_name[0]}
              {selectedUser?.last_name[0]}
            </p>
          </div>
          <div
            className={`w-1/3 rounded-xl bg-green-200 border border-green-500 text-green-700 h-6 flex items-center justify-center text-[13px]`}
          > {
            
                    <p>{selectedUser?.user_role}</p> 
          }
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p className="font-semibold">
              {selectedUser?.first_name} {selectedUser?.last_name}
            </p>
            {/* <div className="flex gap-1 items-center justify-center text-sm text-slate-500 -mt-1">
              <RiMapPinLine className="text-md" />
              <p>Bantama Ahenebronum</p>
            </div> */}
            
            <div className="flex flex-col w-full text-secondary-dark dark:text-white h-14 gap-1 items-center justify-center text-sm">
              
              <p>{selectedUser?.email}</p> <p>{selectedUser?.phone_number}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button> Edit User</Button>
            <Modal 
                dialogTriggerElement={
                    <Button
                    variant={"empty"}
                    className="text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
                    
                  >
                    
                    Delete User
                  </Button>
                }
              >
               <DeleteModalCard itemId={`${selectedUser?.first_name} ${selectedUser?.last_name}`} item="User"/> 
              </Modal>
            
          </div>
          
        </Container>
    )
}